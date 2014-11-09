'use strict';

angular.module('demoApp', ['angular-props-widget']).config(function(PropsWidgetConfig) {
	// angular-props-widget configuration
	PropsWidgetConfig.iconlib = 'bootstrap3';
	PropsWidgetConfig.theme = 'bootstrap3';
	//PropsWidgetConfig.language = 'zh';
}).controller('AppController', function($scope) {

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

	$scope.myKeyProps = {};

	$scope.skuPropsSch = {
		title: 'Product SKU',
		type: 'object',
		properties: {
			'color': {
				type: 'array',
				uniqueItems: true,
				format: 'checkbox',
				items: {
					type: 'string',
					'enum': ['red', 'blue', 'yellow', 'grey', 'light green', 'orange', 'light yellow']
				}
			},
			'size': {
				type: 'array',
				uniqueItems: true,
				format: 'checkbox',
				items: {
					type: 'string',
					'enum': ['S', 'M', 'L', 'XL', 'XXL']
				}
			}
		}
	};

	$scope.mySkuProps = {};

	$scope.skuTableSch = {
		type: 'array',
		title: 'SKU Table',
		format: 'table',
		uniqueItems: true,
		items: {
			type: 'object',
			properties: {
				'color': {
					type: 'string',
					required: true,
					readonly: true
				},
				'size': {
					type: 'string',
					required: true,
					readonly: true
				},
				price: {
					type: 'number',
					required: true
				},
				stock: {
					type: 'integer',
					required: true
				},
				image: {
					type: 'string',
					media: {
						binaryEncoding: 'base64',
						mediaType: 'image/png'
					},
					required: true
				}
			}
		}
	};

	$scope.mySkuTable = [];

	$scope.logPrint = function() {
		console.log('myKeyProps: ' + JSON.stringify($scope.myKeyProps));
		console.log('mySkuProps: ' + JSON.stringify($scope.mySkuProps));
		console.log('mySkuTable: ' + JSON.stringify($scope.mySkuTable));
	};

	var state = -1;
	$scope.changeSchema = function() {
		var keyPropsSchList = [{
			title: 'Service Properties',
			type: 'object',
			properties: {
				'Living Environment': {
					type: 'string',
					required: true,
					'enum': ['simple decoration','decoration','luxury decoration']
				},
				'Room Configuration': {
					type: 'array',
					uniqueItems: true,
					format: 'checkbox',
					items: {
						type: 'string',
						'enum':  ['bed','cabinet','table','chair','sofa','24 hours hot water']
					}
				},
				'facilities': {
					type: 'array',
					uniqueItems: true,
					format: 'checkbox',
					items: {
						type: 'string',
						'enum':  ['Gym','chess room','library', 'activity room']
					}
				}
			}
		}, {
			title: 'Service Properties',
			type: 'object',
			properties: {
				'name': {
					type: 'string',
					required: true,
					minLength: 1
				},
				'address': {
					type: 'string',
					required: true,
					minLength: 1
				},
				'expire': {
					type: 'string',
					required: true,
					minLength: 1
				},
				'open': {
					type: 'string',
					required: true,
					minLength: 1
				},
				'fees': {
					type: 'string',
					required: true,
					minLength: 1
				}
			}
		}, {
			title: 'Service Properties',
			type: 'object',
			properties: {
				'insurance companies': {
					type: 'string',
					required: true,
					minLength: 1
				},
				'trip purpose': {
					type: 'string',
					required: true,
					minLength: 1
				},
				'travel area': {
					type: 'array',
					uniqueItems: true,
					format: 'checkbox',
					items: {
						type: 'string',
						'enum': ['domestic', 'abroad']
					}
				}
			}
		}];
		state = (state + 1) % keyPropsSchList.length;
		$scope.keyPropsSch = keyPropsSchList[state];
	};


});
