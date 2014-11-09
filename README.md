Angular Properties Widget directive
=============================

A properties widget Angular directive that wraps [jdorn's json-editor](https://github.com/jdorn/json-editor).

Inspired by and take advance of [rodikh's angular-json-editor](https://github.com/rodikh/angular-json-editor)

Properties Widget support two way data binding of schema and value compare to [rodikh's angular-json-editor](https://github.com/rodikh/angular-json-editor). 

For further information about supported schema properties and usage, check out the original [json-editor](https://github.com/jdorn/json-editor).

Requirements
----------------

The module doesn't include the original json-editor code, but it is included in it's bower dependencies.

Installation
------------

Install via bower

    bower install angular-props-widget --save
    
Then include the directive and json-editor in your html
    
```html
<script src="bower_components/json-editor/dist/jsoneditor.js"></script>
<script src="bower_components/angular-props-widget/dist/angular-props-widget.min.js"></script>
```

Usage
-----

The usage of this directive is quite straightforward: you create a schema in angularjs scope like so:

```javascript
$scope.keyPropsSch = {
	title: 'House Properties',
	type: 'object',
	properties: {
		'name': {
			type: 'string',
			required: true,
			minLength: 1
		},
		'years': {
			type: 'integer',
			required: true,
			min: 0
		},
		'facilities': {
			type: 'array',
			uniqueItems: true,
			format: 'checkbox',
			items: {
				type: 'string',
				'enum': ['Air Condition', 'Hot Water', 'TV', 'Washing Machine']
			}
		}
	}
};
```
and an empty value to hold the value of props-widget:

```javascript
$scope.myKeyProps = {};
```

Then you declare a props-widget component to bind the schema and value like so:

```html
<props-widget schema="keyPropsSch" ng-model="myKeyProps"/>
```

That's it, you now have a widget that can edit the value of type of the schema!

Building
---------

Clone the project, install bower and npm dependencies by running

    bower install && npm install

If you dont have grunt-cli installed globally run `npm install -g grunt-cli`

Then run `grunt` and look in the `dist` folder.
