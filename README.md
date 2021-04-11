tombraider.js
================
[![Build Status](https://github.com/namelivia/tombraider.js/actions/workflows/build.yml/badge.svg)](https://github.com/namelivia/tombraider.js/actions/workflows/build.yml)
[![Code Climate](https://codeclimate.com/github/namelivia/tomb-raider-menu/badges/gpa.svg)](https://codeclimate.com/github/namelivia/tomb-raider-menu)
[![codecov](https://codecov.io/gh/namelivia/tombraider.js/branch/master/graph/badge.svg)](https://codecov.io/gh/namelivia/tombraider.js)

![tombraiderjs result example](http://tombraiderjs.namelivia.com/img/capture.png)

__tombraider.js__ is a Javascript library for generating 3D spinning menus like the ones in the early Tomb Raider
games. It is built on top of three.js. You can see it in action in [this demos page](http://tombraiderjs.namelivia.com#demo).

### Usage ###

[Get the latest minified version of tombraider.js here](http://tombraiderjs.namelivia.com/tombraider.js-v0.0.1.min.js).

After doing that you can include tombraider.js in your webpage.

```html
<script src="js/tombraider.js-v0.0.1.min.js"></script>
```

Then the following code will initate a new 3D Menu inside a div container with the attribute ```id``` set to containerId: 

```javascript
var menu = TombRaiderMenu("your-container-id");
```

Now that the menu has been initialized you can call methods on it to add objects, define it's
settings or bind functions. For example:

```javascript
menu.setRadius(5)
menu.setCameraDistance(10)
menu.setCameraHeight(2)
menu.addModel('New Model','models/newModel.gltf','link','http://www.google.com')
menu.animate()
```

In the example above some general options are set, and a new object is inserted.
Alternatively, those paremeters could have been defined in a JSON string and loaded using the `setConfig` function. For more information check the following section.

### Reference ###

```javascript
TombRaiderMenu("your-container-id")
```
This is the constructor of the class, is used to initiate a new menu on the page placed inside the div defined by the id passed as a parameter (See Usage for an example).

```javascript
addModel(name,model,action,params)
```
Adds a new object to the scene, the objects have a name, a model url pointing to a JSON 3D model object, an action keyword, and a parameter for using with that action.

```javascript
deleteSelected()
```
Deletes the currently selected object from the scene.

```javascript
newScene()
```
Clears the scene and reset the config values to their defaults.

```javascript
moveLeft()
```
Selects the previous object rotating the menu to the left.

```javascript
moveRight()
```
Selects the next object rotating the menu to the right.

```javascript
action()
```
Triggers the action associated to the currently selected object (see Action keywords).

```javascript
getSelectedName()
```
Returns the name of the object currently selected.

```javascript
getRadius()
```
Returns the radius of the circle where the objects are placed in 3D space.

```javascript
getCameraDistance()
```
Returns the distance of the camera.

```javascript
getCameraHeight()
```
Returns the height of the camera.

```javascript
getConfig()
```
Returns the current configuration of the menu as a valid JSON string (see JSON config structure).

```javascript
setRadius(value)
```
Sets the radius of the circle where the objects are placed in 3D space.

```javascript
setCameraHeight(value)
```
Sets the height of the camera.

```javascript
setCameraDistance(value)
```
Sets the distance of the camera.

```javascript
setConfig(config)
```
Clears the current scene and sets a new menu defined by the JSON string passed as parameter (see JSON config structure).

#### Action keywords

Currently there are the following actions available:

```link```: Makes the browser going to the URL defined by ```params```.

```alert```: Displays a Javascript alert defined by ```params```.

An empty string means "Don't do anything" but it does not rise an error.

Any other words as an action keyword will be reported as an error in the browser console.

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
"{"objects":[{"name":"go to google","action":"link","params":"http://www.google.com","model":"models/chest/chest.gltf"},{"name":"go to facebook","action":"link","params":"http://www.facebook.com","model":"models/chest/chest.gltf"}],"distance":12000,"height":3000,"radius":6000}"
```

At root level there is an array called ```objects```, it contains a collection of JSON objects with four defined parameters, ```name``` which is the object's name, ```model``` that is the path where the browser
can find the JSON 3D model for the object, ```action``` is the keyword that defines the action to be executed when the action function is triggered and the object is selected and ```params```, containing the
parameters pased to the corresponding action function. In this case the keyword ```link``` will make the browser go to the URL address defined by the ```params``` attribute. 
Also at root level are defined the three general settings for the menu, ```distance``` that sets the distance of the camera, ```height``` that will set the height of the camera and finally ```radius``` which will define the radius of the circle where the objects are placed in 3D space.

### Changelog ###

[02-06-2015] 0.0.1: First alpha version.

[11-04-2021] 0.0.2: Complete code revamp.

### ToDo and ideas ###

Adding a lot more keyword actions.

Adding different selection effects.

Adding different transitions.

Adding 3D background scenarios.

### License ###

The code is licensed under the GPLv2 license, and brought to you by namelivia. Feel free to use it, modify or contribute to it and share your impressions with me on [Twitter](http://wwww.twitter.com) or [my personal blog](http://www.namelivia.com).
