var camera, scene, renderer, keyboard, objects;
var models = ['obj/Saturn/Saturn.obj','obj/Megadrive/Megadrive.obj','obj/Mastersystem/Mastersystem.obj','obj/Dreamcast/Dreamcast.obj'];
var materials = ['obj/Saturn/Saturn.mtl','obj/Megadrive/Megadrive.mtl','obj/Mastersystem/Mastersystem.mtl','obj/Dreamcast/Dreamcast.mtl'];
var names = ['Saturn','Megadrive','Mastersystem','Dreamcast'];
var selected = 2;
var angleStep = (360/(models.length)) * (Math.PI / 180);
var cameraAngle = angleStep*selected;
var radius = 600;
var cameraDistance = 1200;
var size = 100;
var loader = new THREE.OBJMTLLoader();

function tombraidermenu(divId) {
	objects = new Array(models.length);
	$(document).ready(function() {
		$('#'+divId).on('swipeleft', function(e) {
			selected--;
		})
		$('#'+divId).on('swiperight', function(e) {
			selected++;
		})
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		scene = new THREE.Scene();
		camera.position.y = 100;
		var objectsIndex = models.length - 1;
		loadModels(models.length-1);
		var ambientLight = new THREE.AmbientLight(0xffffff);
		scene.add(ambientLight);
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, 100, 30).normalize();
		scene.add(directionalLight);
		//renderer = new THREE.CanvasRenderer();
		renderer = new THREE.WebGLRenderer();
		//TODO:Set size to container div size
		renderer.setSize( window.innerWidth-25, window.innerHeight-25);
		document.getElementById(divId).appendChild( renderer.domElement );
		animate();
	});
}

function animate() {
	requestAnimationFrame( animate );
	if (objects[mod(selected,models.length)] != null){
		objects[mod(selected,models.length)].rotation.y += 0.01;
	}
	if (cameraAngle != angleStep*selected){
		if (cameraAngle < angleStep*selected){
			cameraAngle = cameraAngle+(angleStep*selected-cameraAngle)/10;
		}
		else cameraAngle = cameraAngle-(cameraAngle-angleStep*selected)/10;
	}
	camera.position.x=Math.cos(cameraAngle)*cameraDistance;
	camera.position.z=Math.sin(cameraAngle)*cameraDistance;
	camera.lookAt(new THREE.Vector3(0,0,0));
	renderer.render( scene, camera );
}

function loadModels(index){
	if (index > -1){
		loader.load(models[index],materials[index], function ( object) {
			object.position.x=Math.cos(angleStep*index)*radius;
			object.position.z=Math.sin(angleStep*index)*radius;
			object.scale.set(50,50,50)
			scene.add(object);
			objects[index] = object;
		})
		loadModels(index-1);
	}
}

function mod (a,b){
	return(a%b+b)%b;
}

function GetChar (event){
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (keyCode==37){
		selected++;
	}
	else if (keyCode==39){
		selected --;
	}
	$('#option').text(names[mod(selected,models.length)]);
}
