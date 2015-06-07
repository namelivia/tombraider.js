	var TombRaiderMenu = function(containerId){
		this.objects = [];
		if (!window.Detector.webgl) {
			window.Detector.addGetWebGLMessage();
		}

		var container = document.getElementById(containerId);
		var ww = container.offsetWidth;
		var hh = container.offsetHeight;
		this.clock = new window.THREE.Clock();
		this.scene = new window.THREE.Scene();
		this.camera = new window.THREE.PerspectiveCamera(50,ww/hh,1,100000); 
		this.renderer = new window.THREE.WebGLRenderer({alpha:true}); 
		this.renderer.setSize( ww, hh);        
		container.appendChild(this.renderer.domElement);

		var ambientLight = new window.THREE.AmbientLight(0xfddf98);
		var directionalLight = new window.THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, 100, 30).normalize();
		this.scene.add(directionalLight,ambientLight);
		this.newScene();
		this.update();
	};

	TombRaiderMenu.prototype.goToLink = function (url){
		window.location.href = url;
	};

	TombRaiderMenu.prototype.newScene = function (){
		this.cameraAngle = 0;
		this.angleStep = 0;
		this.setRadius(6000);
		this.setCameraDistance(12000);
		this.setCameraHeight(3000);
		this.deleteAllObjects();
		this.selected = 0;
		this.selectedRotate = 0;
	};

	TombRaiderMenu.prototype.moveLeft = function (){
		this.move(1);
	};

	TombRaiderMenu.prototype.moveRight = function (){
		this.move(-1);
	};

	TombRaiderMenu.prototype.move = function (direction){
		if (this.objects.length){
			this.selected = this.mod(this.selected+direction,this.objects.length);
		}
		this.selectedRotate += direction;
	};

	TombRaiderMenu.prototype.addModel = function (name,url,action,params){
		var newModel = {name : name, model : url , action : action, params : params};
		this.loadModel(newModel,this.scene,this.objects);
	};

	TombRaiderMenu.prototype.getSelectedName = function (){
		if (this.objects[this.selected]){
			return this.objects[this.selected].name;
		}
	};

	TombRaiderMenu.prototype.action = function (){
		var event = new CustomEvent("action", { "detail": { "selected" : this.selected } });
		document.dispatchEvent(event);
		if (this.objects[this.selected]){
			switch(this.objects[this.selected].action) {
				case 'link':
					this.goToLink(this.objects[this.selected].params);
					break;
				case 'alert':
					alert(this.objects[this.selected].params);
					break;
				default:
					console.error('Unknown action');
			} 
		}
	};

	TombRaiderMenu.prototype.getRadius = function (){
		return this.radius;
	};

	TombRaiderMenu.prototype.getCameraDistance = function (){
		return this.cameraDistance;
	};

	TombRaiderMenu.prototype.getCameraHeight = function (){
		return this.camera.position.y;
	};

	TombRaiderMenu.prototype.setRadius = function (value){
		this.radius = value;
	};

	TombRaiderMenu.prototype.setCameraHeight = function (value){
		this.camera.position.y = value;
	};

	TombRaiderMenu.prototype.setCameraDistance = function (value){
		this.cameraDistance = value;
	};

	TombRaiderMenu.prototype.update = function (){
		requestAnimationFrame(TombRaiderMenu.prototype.update.bind(this));
		//TODO: apply delta
		//var delta = this.clock.getDelta();
		
		if (this.cameraAngle !== this.angleStep*this.selectedRotate){
			if (this.cameraAngle < this.angleStep*this.selectedRotate){
				this.cameraAngle =
					this.cameraAngle+(this.angleStep*this.selectedRotate-this.cameraAngle)/10;
			}
			else {
				this.cameraAngle = this.cameraAngle-(this.cameraAngle-this.angleStep*this.selectedRotate)/10;
			}
		}
		this.camera.position.x=Math.cos(this.cameraAngle)*this.cameraDistance;
		this.camera.position.z=Math.sin(this.cameraAngle)*this.cameraDistance;
		this.camera.lookAt(new window.THREE.Vector3(0,0,0));
		if (this.objects.length) {
			for (var i=0; i<this.objects.length;i++){
				if (i === this.selected){
					this.objects[i].rotation.y += 0.01;
				}
				this.objects[i].position.x=Math.cos(this.angleStep*i)*this.radius;
				this.objects[i].position.z=Math.sin(this.angleStep*i)*this.radius;
			}
		}
		this.render();
	};

	TombRaiderMenu.prototype.render = function (){
		this.renderer.render(this.scene,this.camera);
	};

	TombRaiderMenu.prototype.mod = function (a,b){
		return(a%b+b)%b;
	};

	TombRaiderMenu.prototype.deleteAllObjects = function(){
		while (this.objects.length > 0){
			this.deleteSelected();
		}
	};

	TombRaiderMenu.prototype.deleteSelected = function(){
		var selectedObject = this.objects[this.selected];
		this.scene.remove(selectedObject);
		this.objects.splice(this.selected,1);
		if (this.selected > 0){
			this.moveLeft();
		}
	};

	TombRaiderMenu.prototype.setConfig = function(config){
		this.newScene();
		try {
			config = JSON.parse(config);
		} catch(e){
			console.log("Error parsing the JSON configuration");
		}
		//TODO: Better to parseInt here or when exporting the json?
		this.setRadius(parseInt(config.radius));
		this.setCameraDistance(parseInt(config.distance));
		this.setCameraHeight(parseInt(config.height));
		var objectsLength = config.objects.length;
		for (var i = 0; i < objectsLength; i++) {
			this.addModel(
				config.objects[i].name,
				config.objects[i].model,
				config.objects[i].action,
				config.objects[i].params
			);
		}	

	};

	TombRaiderMenu.prototype.getConfig = function(){
		var config = {};
		var objects = this.objects.map(function(obj){ 
			return { 
				name : obj.name,
			   	action: obj.action,
			   	params : obj.params,
			   	model : obj.model
			};
		});
		config.objects = objects;
		config.distance = this.getCameraDistance();
		config.height = this.getCameraHeight();
		config.radius = this.getRadius();
		return JSON.stringify(config); 
	};

	TombRaiderMenu.prototype.loadModel = function (model,scene,objects){
		var loader = new window.THREE.JSONLoader();
		loader.load(model.model,function(geometry,materials){
			var material = new window.THREE.MeshFaceMaterial(materials);
			var object = new window.THREE.Mesh(geometry, material);
			scene.add(object);
			object.name = model.name;
			object.action = model.action;
			object.params = model.params;
			object.model = model.model;
			objects.push(object);
			this.angleStep = (360/objects.length)*(Math.PI/180);
			//TODO: Set the selected.
		}.bind(this));
	};

	var tombraidermenu = function (containerId){
			var tombraider = new TombRaiderMenu(containerId);
			return tombraider;
	};
