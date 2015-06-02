'use strict';

describe("TombRaider", function() {

	var renderer;
	var camera;
	var scene;
	var clock;

	beforeEach(function(){
		window.THREE = {};
		clock = {};
		window.THREE.Clock = jasmine.createSpy('Clock').and.callFake(function(){
			return clock;
		});
		clock.getDelta = jasmine.createSpy('getDelta');
		scene = {};
		scene.add = jasmine.createSpy('add');
		window.THREE.Scene = jasmine.createSpy('Scene').and.callFake(function(){
			return scene;
		});
		camera = {};
		window.THREE.PerspectiveCamera = jasmine.createSpy('PerspectiveCamera').and.callFake(function(){
			return camera;
		});
		camera.position = jasmine.createSpy('position');
		camera.lookAt = jasmine.createSpy('position');
		renderer = {};
		renderer.setSize = jasmine.createSpy('setSize');
		renderer.render = jasmine.createSpy('render');
		window.THREE.WebGLRenderer = jasmine.createSpy('WebGLRenderer').and.callFake(function(){
			return renderer;
		});
		var container = {'offsetWidth' : 100, offsetHeight: 100};
		container.appendChild = jasmine.createSpy('appendChild');
		document.getElementById = jasmine.createSpy('getContainer').and.callFake(function(){
			return container;
		});
		window.THREE.AmbientLight = jasmine.createSpy('AmbientLight');
		var directionalLight = {
			position : {}
		};
		var vector = {};
		vector.normalize = jasmine.createSpy('normalize');
		directionalLight.position.set = jasmine.createSpy('setPosition').and.callFake(function(){
			return vector;
		});
		window.THREE.DirectionalLight = jasmine.createSpy('DirectionalLight').and.callFake(function(){
			return directionalLight;
		});
		window.Detector = {};
		window.Detector.webgl = false;
		window.Detector.addGetWebGLMessage = jasmine.createSpy('WebGLMessage');
	});

	it("Test the constructor", function() {

		spyOn(TombRaiderMenu.prototype,'addModel');
		spyOn(TombRaiderMenu.prototype,'setRadius');
		spyOn(TombRaiderMenu.prototype,'setCameraDistance');
		spyOn(TombRaiderMenu.prototype,'setCameraHeight');
		spyOn(TombRaiderMenu.prototype,'update');

		var tombraider = new tombraidermenu('containerId');

		expect(tombraider.objects).toEqual([]);
		expect(tombraider.selected).toEqual(0);
		expect(window.Detector.addGetWebGLMessage).toHaveBeenCalled();
		expect(document.getElementById).toHaveBeenCalled();
		expect(window.THREE.Clock).toHaveBeenCalled();
		expect(window.THREE.Scene).toHaveBeenCalled();
		expect(window.THREE.PerspectiveCamera).toHaveBeenCalled();
		expect(window.THREE.WebGLRenderer).toHaveBeenCalled();
		expect(renderer.setSize).toHaveBeenCalled();
		expect(window.THREE.AmbientLight).toHaveBeenCalled();
		expect(window.THREE.DirectionalLight).toHaveBeenCalled();
		expect(scene.add).toHaveBeenCalled();
		expect(TombRaiderMenu.prototype.setRadius).toHaveBeenCalledWith(6000);
		expect(TombRaiderMenu.prototype.setCameraDistance).toHaveBeenCalledWith(12000);
		expect(TombRaiderMenu.prototype.setCameraHeight).toHaveBeenCalledWith(3000);
		expect(TombRaiderMenu.prototype.update).toHaveBeenCalled();
	});

	/*
	To be implemented
	http://stackoverflow.com/questions/4792281/mocking-window-location-href-in-javascript
	it("Test the goToLink function", function(){
		var url = 'foo';
		TombRaiderMenu.prototype.goToLink('foo');
		expect(window.location.href).toEqual('foo');
	});
	*/

	it("Test the render function", function(){
		TombRaiderMenu.prototype.renderer = renderer;
		TombRaiderMenu.prototype.render();
		expect(renderer.render).toHaveBeenCalledWith(
			TombRaiderMenu.prototype.scene,
			TombRaiderMenu.prototype.camera
		);
	});

	it("Test the addModel function", function(){
		var newModel = {
			name : 'foo',
			model: 'bar',
			action: 'baz',
			params: 'quix'
		}
		spyOn(TombRaiderMenu.prototype,'loadModel');
		TombRaiderMenu.prototype.addModel(
			newModel.name,
			newModel.model,
			newModel.action,
			newModel.params
		);
		expect(TombRaiderMenu.prototype.loadModel).toHaveBeenCalledWith(
			newModel,
			TombRaiderMenu.scene,
			TombRaiderMenu.objects
		);
	});

	it("Test the update function", function(){
		TombRaiderMenu.prototype.selected = 0;
		TombRaiderMenu.prototype.objects = [
			{'name':'foo','position':{'x':1,'y':1,'z':1},'rotation':{'x':1,'y':1,'z':1}},
			{'name':'bar','position':{'x':1,'y':1,'z':1},'rotation':{'x':1,'y':1,'z':1}}
		];
		window.requestAnimationFrame = jasmine.createSpy('requestAnimationFrame');
		TombRaiderMenu.prototype.clock = clock;
		TombRaiderMenu.prototype.camera = camera;
		window.THREE.Vector3 = jasmine.createSpy('vector3');
		TombRaiderMenu.prototype.render = jasmine.createSpy('render');
		TombRaiderMenu.prototype.update();
		expect(window.requestAnimationFrame).toHaveBeenCalled();
		//expect(clock.getDelta).toHaveBeenCalled();
		expect(window.THREE.Vector3).toHaveBeenCalled();
		expect(camera.lookAt).toHaveBeenCalled();
		expect(TombRaiderMenu.prototype.objects[TombRaiderMenu.prototype.selected].rotation.y).toEqual(1.01);
		expect(TombRaiderMenu.prototype.render).toHaveBeenCalled();
	});


	it("Test the action function", function(){
		TombRaiderMenu.prototype.selected = 0;
		TombRaiderMenu.prototype.objects = [
			{action : 'link', params: 'http://www.google.com'},
			{action : 'foo', params: 'bar'}
		];
		spyOn(TombRaiderMenu.prototype,'goToLink');
		TombRaiderMenu.prototype.action();
		expect(TombRaiderMenu.prototype.goToLink).toHaveBeenCalledWith(
			TombRaiderMenu.prototype.objects[0].params
		);
		TombRaiderMenu.prototype.selected = 1;
		spyOn(console,'error');
		TombRaiderMenu.prototype.action();
		expect(console.error).toHaveBeenCalledWith(
			'Unknown action'
		);
	});

	it("Test the loadModel function", function(){
		var model = {};
		var three = {};
		var objects = [];
		var loader = {};
		loader.load = jasmine.createSpy('load');
		window.THREE.JSONLoader = jasmine.createSpy('JSONLoader').and.callFake(function(){
			return loader;
		});
		TombRaiderMenu.prototype.loadModel(model,scene,objects);
		expect(window.THREE.JSONLoader).toHaveBeenCalled();
		//TODO:
		//This test coverage can be extendend with the callback functionality (and.callThrough)
	});

	it("Test the deleteSelected function", function(){
		TombRaiderMenu.prototype.selected = 0;
		TombRaiderMenu.prototype.objects = ['foo','bar'];
		scene.remove = jasmine.createSpy('remove');
		TombRaiderMenu.prototype.scene = scene;
		TombRaiderMenu.prototype.deleteSelected();
		expect(scene.remove).toHaveBeenCalled();
	});

	it("Test the deletion of all objects", function(){
		TombRaiderMenu.prototype.objects = ['foo','bar'];
		spyOn(TombRaiderMenu.prototype,'deleteSelected').and.callFake(function(){
			TombRaiderMenu.prototype.objects.splice(TombRaiderMenu.prototype.selected,1);
		});
		TombRaiderMenu.prototype.deleteAllObjects();
		expect(TombRaiderMenu.prototype.deleteSelected.calls.count()).toEqual(2);
	});

	it("Test creating a new scene", function(){
		TombRaiderMenu.prototype.objects = [ 'foo' ];
		TombRaiderMenu.prototype.cameraAngle = 1238;
		TombRaiderMenu.prototype.angleStep = 33;
		TombRaiderMenu.prototype.setRadius(128);
		TombRaiderMenu.prototype.setCameraHeight(512);
		TombRaiderMenu.prototype.setCameraDistance(8);
		TombRaiderMenu.prototype.selected = 4;
		TombRaiderMenu.prototype.selectedRotate = 2;
		spyOn(TombRaiderMenu.prototype,'deleteAllObjects');
		TombRaiderMenu.prototype.newScene();
		expect(TombRaiderMenu.prototype.cameraAngle).toEqual(0);
		expect(TombRaiderMenu.prototype.angleStep).toEqual(0);
		expect(TombRaiderMenu.prototype.getRadius()).toEqual(6000);
		expect(TombRaiderMenu.prototype.getCameraHeight()).toEqual(3000);
		expect(TombRaiderMenu.prototype.getCameraDistance()).toEqual(12000);
		expect(TombRaiderMenu.prototype.selected).toEqual(0);
		expect(TombRaiderMenu.prototype.selectedRotate).toEqual(0);
		expect(TombRaiderMenu.prototype.deleteAllObjects).toHaveBeenCalled();
	});

	it("Test the mod aux function", function(){
		var a = 5;
		var b = 6;
		expect(TombRaiderMenu.prototype.mod(a,b)).toEqual(5);
		expect(TombRaiderMenu.prototype.mod(b,a)).toEqual(1);
	});

	describe("Testing the pointer", function() {

		beforeEach(function() {
			TombRaiderMenu.prototype.objects = ['foo','bar'];
		});

		it("Test moving left", function(){
			TombRaiderMenu.prototype.selected = 0;
			TombRaiderMenu.prototype.moveLeft();
			expect(TombRaiderMenu.prototype.selected).toEqual(1);
			TombRaiderMenu.prototype.moveLeft();
			expect(TombRaiderMenu.prototype.selected).toEqual(0);
		});

		it("Test moving right", function(){
			TombRaiderMenu.prototype.selected = 0;
			TombRaiderMenu.prototype.moveRight();
			expect(TombRaiderMenu.prototype.selected).toEqual(1);
			TombRaiderMenu.prototype.moveRight();
			expect(TombRaiderMenu.prototype.selected).toEqual(0);
		});
	});

	describe("Testing setters", function() {

		it("Test setting the camera height", function(){
			TombRaiderMenu.prototype.camera = {'position' : {'y' : 0}}
			TombRaiderMenu.prototype.setCameraHeight(9999);
			var result = TombRaiderMenu.prototype.getCameraHeight();
			expect(result).toEqual(9999);
		});

		it("Test setting the camera distance", function(){
			TombRaiderMenu.prototype.setCameraDistance(9999);
			var result = TombRaiderMenu.prototype.getCameraDistance();
			expect(result).toEqual(9999);
		});

		it("Test setting the radius", function(){
			TombRaiderMenu.prototype.setRadius(9999);
			var result = TombRaiderMenu.prototype.getRadius();
			expect(result).toEqual(9999);
		});

		it("Test setting a configuration", function(){
			var newConfig = "{\"objects\":[{\"name\":\"asdfasdf\",\"action\":\"link\",\"params\":\"asdfasdf\",\"model\":\"models/chest/chest.json\"},{\"name\":\"asdfasdfasdf\",\"action\":\"link\",\"params\":\"asdfasdfsadf\",\"model\":\"models/chest/chest.json\"},{\"name\":\"asdfasdf\",\"action\":\"link\",\"params\":\"asdfasdf\",\"model\":\"models/chest/chest.json\"}],\"distance\":\"17800\",\"height\":\"2600\",\"radius\":\"10600\"}";
			spyOn(TombRaiderMenu.prototype,'addModel');
			spyOn(TombRaiderMenu.prototype,'newScene');
			TombRaiderMenu.prototype.setConfig(newConfig);
			expect(TombRaiderMenu.prototype.getCameraDistance()).toEqual(17800);
			expect(TombRaiderMenu.prototype.newScene).toHaveBeenCalled();
			expect(TombRaiderMenu.prototype.addModel.calls.count()).toEqual(3);
			//TODO: Finish this with more expectations
		});
	});

	describe("Testing getters", function() {

		beforeEach(function() {
			TombRaiderMenu.prototype.objects = [
				{'name':'foo','model':'fooModel','action':'fooAction','params':'fooParams'},
				{'name':'bar','model':'barModel','action':'barAction','params':'barParams'}
			];
			TombRaiderMenu.prototype.radius = 9999;
			TombRaiderMenu.prototype.cameraDistance = 8888;
			TombRaiderMenu.prototype.camera = {'position' : {'y' : 7777}};
		});

		it("Test getting the selected name", function(){
			TombRaiderMenu.prototype.selected = 0;
			var result = TombRaiderMenu.prototype.getSelectedName();
			expect(result).toEqual('foo');
			TombRaiderMenu.prototype.selected = 1;
			var result = TombRaiderMenu.prototype.getSelectedName();
			expect(result).toEqual('bar');
		});

		it("Test getting the radius", function(){
			var result = TombRaiderMenu.prototype.getRadius();
			expect(result).toEqual(9999);
		});

		it("Test getting the camera distance", function(){
			var result = TombRaiderMenu.prototype.getCameraDistance();
			expect(result).toEqual(8888);
		});

		it("Test getting the camera height", function(){
			var result = TombRaiderMenu.prototype.getCameraHeight();
			expect(result).toEqual(7777);
		});

		it("Test getting a JSON config", function(){
			var config = JSON.parse(TombRaiderMenu.prototype.getConfig());
			expect(config.objects).toEqual(TombRaiderMenu.prototype.objects);
			expect(config.radius).toEqual(TombRaiderMenu.prototype.getRadius());
			expect(config.distance).toEqual(TombRaiderMenu.prototype.getCameraDistance());
			expect(config.height).toEqual(TombRaiderMenu.prototype.getCameraHeight());
		});

	});

});
