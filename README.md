tombraider.js
================
[![Build Status](https://travis-ci.org/namelivia/tombraider.js.svg?branch=master)](https://travis-ci.org/namelivia/tombraider.js)
[![Code Climate](https://codeclimate.com/github/namelivia/tomb-raider-menu/badges/gpa.svg)](https://codeclimate.com/github/namelivia/tomb-raider-menu)
[![Test Coverage](https://codeclimate.com/github/namelivia/tomb-raider-menu/badges/coverage.svg)](https://codeclimate.com/github/namelivia/tomb-raider-menu/coverage)

![tombraiderjs result example](http://tombraiderjs.namelivia.com/img/capture.png)

__tombraider.js__ is a Javascript library for generating 3D spinning menus like the ones in the early Tomb Raider
games. It is built on top of three.js. You can see it in action in [this demos page](http://tombraiderjs.namelivia.com#demo).

### Dependencies ###

This library depends on three.js you can [get the minified version here](http://threejs.org/build/three.min.js).

### Usage ###

Once you have downloaded three.js from the previous link you have to also [get the latest minified version of tombraider.js here](http://tombraiderjs.namelivia.com/tombraider.js-v0.0.1.min.js).

After doing that you can include three.js and then tombraider.js in your webpage.

```html
<script src="js/three.min.js"></script>
<script src="js/tombraider.js-v0.0.1.min.js"></script>
```

Then the following code will initate a new 3D Menu inside a div container with the attribute ```id``` set to containerId: 

```javascript
var newMenu = tombraidermenu("containerId");
```

Now that the menu has been initialized you can call methods on it to add objects, define it's
settings or bind functions. For example:

```javascript
newMenu.setRadius(3000);
newMenu.setCameraDistance(4000);
newMenu.setCameraHeight(5000);
newMenu.addModel('New Model','models/newModel.json','link','http://www.google.com');
```

In the example above some general options are set, and a new object is inserted.
Alternatively, those paremeters could have been defined in a JSON string and loaded using the
```setConfig``` function. For more information check the following section.

### Reference ###

__tombraidermenu(divId):__
This is the constructor of the class, is used to initiate a new menu on the page placed inside the div defined by the id passed as a parameter (See Usage for an example).

__addModel(name,model,action,params):__
Adds a new object to the scene, the objects have a name, a model url pointing to a JSON 3D model object, an action keyword, and a parameter for using with that action.

__deleteSelected():__
Deletes the currently selected object from the scene.

__newScene():__
Clears the scene and reset the config values to their defaults.

__moveLeft():__
Selects the previous object rotating the menu to the left.

__moveRight():__
Selects the next object rotating the menu to the right.

__action():__
Triggers the action associated to the currently selected object (see Action keywords).

__getSelectedName():__
Returns the name of the object currently selected.

__getRaduis():__
Returns the radius of the circle where the objects are placed in 3D space.

__getCameraDistance():__
Returns the distance of the camera.

__getCameraHeight():__
Returns the height of the camera.

__getConfig():__
Returns the current configuration of the menu as a valid JSON string (see JSON config structure).

__setRadius(value):__
Sets the radius of the circle where the objects are placed in 3D space.

__setCameraHeight(value):__
Sets the height of the camera.

__setCameraDistance(value):__
Sets the distance of the camera.

__setConfig(config):__
Clears the current scene and sets a new menu defined by the JSON string passed as parameter (see JSON config structure).

#### Action keywords

Currently there are the following actions available:

```link```: Makes the browser going to the URL defined by ```params```.

```alert```: Displays a Javascript alert defined by ```params```.

### Events ###

When calling the action function, there is a CustomEvent risen called "action" and containing the selected item index number in the detail, so out of the library function you can capture this event and execute whatever you want. For example:
```javascript
document.addEventListener("action", function(e) {
	alert(e.detail.selected);
});

```

### JSON config structure ###

The format of the JSON string in order to load an already configured and populated menu is as follows:
```javascript
"{"objects":[{"name":"go to google","action":"link","params":"http://www.google.com","model":"models/chest/chest.json"},{"name":"go to facebook","action":"link","params":"http://www.facebook.com","model":"models/chest/chest.json"}],"distance":12000,"height":3000,"radius":6000}"
```

At root level there is an array called ```objects```, it contains a collection of JSON objects with four defined parameters, ```name``` which is the object's name, ```model``` that is the path where the browser
can find the JSON 3D model for the object, ```action``` is the keyword that defines the action to be executed when the action function is triggered and the object is selected and ```params```, containing the
parameters pased to the corresponding action function. In this case the keyword ```link``` will make the browser go to the URL address defined by the ```params``` attribute. 
Also at root level are defined the three general settings for the menu, ```distance``` that sets the distance of the camera, ```height``` that will set the height of the camera and finally ```radius``` which will define the radius of the circle where the objects are placed in 3D space.

### Testing and building from source ###

Make sure you have [grunt](http://gruntjs.com/) and [node](http://nodejs.org/download/) installed.
To install the development dependencies run ```npm install```.
To execute the tests run ```grunt test``` in the root directory, to build it run ```grunt``` in the root directory.

### Changelog ###

[02-06-2015] 0.0.1: First alpha version.

### ToDo and ideas ###

Adding a lot more keyword actions.

Adding different selection effects.

Adding different transitions.

Adding 3D background scenarios.

### License ###

The code is licensed under the GPLv2 license, and brought to you by namelivia. Feel free to use it, modify or contribute to it and share your impressions with me on [Twitter](http://wwww.twitter.com) or [my personal blog](http://www.namelivia.com).
