'use strict';

/*jslint sub: true*/
var isArray = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

var mergeProps = function (dest, src) {
	for (var i in src) {
		if (src.hasOwnProperty(i)) {
			dest[i] = src[i];
		}
	}
};

angular.module('ng').constant('PropsWidgetConfig', {
	iconlib: 'bootstrap3',
	theme: 'bootstrap3',
	'disable_collapse': true,
	'disable_edit_json': true,
	'disable_properties': true,
	'disable_array_add': true,
	'disable_array_delete': true,
	'disable_array_reorder': true,
	'required_by_default': true,
	'sku_table_label_title': 'SKU Table',
	'sku_table_label_price': 'Price',
	'sku_table_label_stock': 'Stock',
	'sku_table_label_image': 'Image'
}).directive('propsWidget', ['$q', 'PropsWidgetConfig',
	function ($q, PropsWidgetConfig) {

		return {
			restrict: 'E',
			transclude: false,
			require: 'ngModel',
			scope: {
				title: '@',
				schema: '=schema',
				value: '=ngModel',
				readonly: '=readonly',
				onChanged: '&ngChange'
			},
			link: function (scope, element, attrs, controller, transclude) {

				if (!angular.isString(attrs.schema)) {
					throw new Error('props-widget: schema attribute has to be defined.');
				}

				var setupEditor = function () {

					var valueToResolve,
						startValPromise = $q.when({}),
						schemaPromise = $q.when(null);

					scope.isValid = false;
					scope.isReady = false;

					if (angular.isObject(scope.schema)) {
						schemaPromise = $q.when(scope.schema);
					}
					if (angular.isObject(scope.value)) {
						// Support both $http (i.e. $q) and $resource promises, and also normal object.
						valueToResolve = scope.value;
						if (angular.isDefined(valueToResolve.$promise)) {
							startValPromise = $q.when(valueToResolve.$promise);

						} else {
							startValPromise = $q.when(valueToResolve);
						}
					}

					// Wait for the start value and schema to resolve before building the editor.
					$q.all([schemaPromise, startValPromise]).then(function (result) {

						// Support $http promise response with the 'data' property.
						var schema = result[0].data || result[0],
							startVal = result[1];
						if (schema === null) {
							throw new Error('props-widget: could not resolve schema data.');
						}
						if (scope.title) {
							schema.title = scope.title;
						}

						angular.extend(PropsWidgetConfig, {
							startval: startVal,
							schema: schema
						});
						if (PropsWidgetConfig.language) {
							JSONEditor.defaults.language = PropsWidgetConfig.language;
						}
						scope.editor = new JSONEditor(element[0], PropsWidgetConfig);

						var editor = scope.editor;

						editor.on('ready', function () {
							scope.isValid = (editor.validate().length === 0);
							scope.isReady = true;

							if (attrs.readonly) {
								editor.disable();
							}

							if (scope.unbindSchemaWatcher) {
								scope.unbindSchemaWatcher();
							}
							scope.unbindSchemaWatcher = scope.$watch('schema', function () {
								if (scope.isReady && schema !== scope.schema) {
									scope.editor.destroy();
									// reset value
									if (isArray(scope.value)) {
										scope.value.length = 0;
									} else {
										scope.value = {};
									}
									setupEditor();
								}
							}, true);

							if (scope.unbindValueWatcher) {
								scope.unbindValueWatcher();
							}
							scope.unbindValueWatcher = scope.$watch('value', function () {
								if (scope.isReady) {
									scope.editor.setValue(scope.value);
								}
							}, true);
						});

						editor.on('change', function () {
							scope.$apply(function () {
								scope.isValid = (editor.validate().length === 0);
								if (scope.isValid) {
									var value = editor.getValue();
									mergeProps(scope.value, value);
									if (scope.onChanged) {
										scope.onChanged();
									}
								}
							});
						});

					});
				};

				setupEditor();
			}
		};

	}
])
	.directive('skuTable', ['$q', 'PropsWidgetConfig',
		function ($q, PropsWidgetConfig) {

			var cartesianProductOf = function (array) {
				return array.reduce(function (a, b) {
					var ret = [];
					a.forEach(function (a) {
						b.forEach(function (b) {
							ret.push(a.concat([b]));
						});
					});
					return ret;
				}, [
					[]
				]);
			};

			var skuProps2schema = function (title, skuPropsSchema) {
				var defaultTitle = PropsWidgetConfig['sku_table_label_title'];
				var schema = {
					type: 'array',
					title: title || defaultTitle,
					format: 'table',
					uniqueItems: true,
					items: {
						type: 'object',
						properties: {}
					}
				};
				for (var prop in skuPropsSchema.properties) {
					if (skuPropsSchema.properties.hasOwnProperty(prop)) {
						var skuType = skuPropsSchema.properties[prop].items.type;
						var skuTitle = skuPropsSchema.properties[prop].title;
						schema.items.properties[prop] = {
							type: skuType,
							title: skuTitle,
							required: true,
							readonly: true
						};
					}
				}
				schema.items.properties.price = {
					type: 'number',
					title: PropsWidgetConfig['sku_table_label_price'],
					required: true
				};
				schema.items.properties.stock = {
					type: 'number',
					title: PropsWidgetConfig['sku_table_label_stock'],
					required: true
				};
				schema.items.properties.image = {
					type: 'string',
					title: PropsWidgetConfig['sku_table_label_image'],
					media: {
						binaryEncoding: 'base64',
						mediaType: 'image/png'
					},
					required: true
				};
				return schema;
			};

			var ext2innProps = function (extSkuTable) {
				return extSkuTable.map(function (extSku) {
					extSku.skuProps = extSku.skuProps || {};
					var keys = Object.keys(extSku.skuProps);
					var innSku = {
						price: extSku.price,
						stock: extSku.stock,
						image: extSku.image
					};
					for (var i = 0; i < keys.length; i += 1) {
						var key = keys[i];
						innSku[key] = extSku.skuProps[key];
					}
					return innSku;
				});
			};

			var inn2extProps = function (innSkuTable) {
				return innSkuTable.map(function (innSku) {
					var keys = Object.keys(innSku);
					var extSku = {
						skuProps: {},
						price: innSku.price,
						stock: innSku.stock,
						image: innSku.image
					};
					for (var i = 0; i < keys.length; i += 1) {
						var key = keys[i];
						if (key !== 'price' && key !== 'stock' && key !== 'image') {
							extSku.skuProps[key] = innSku[key];
						}
					}
					return extSku;
				});
			};

			return {
				restrict: 'E',
				transclude: false,
				require: 'ngModel',
				scope: {
					title: '@',
					schema: '=schema',
					skuProps: '=skuProps',
					value: '=ngModel',
					onChanged: '&ngChange'
				},
				link: function (scope, element, attrs, controller, transclude) {

					if (!angular.isString(attrs.schema)) {
						throw new Error('props-widget: schema attribute has to be defined.');
					}

					var setupEditor = function () {
						var valueToResolve,
							startValPromise = $q.when({}),
							schemaPromise = $q.when(null);

						scope.isValid = false;
						scope.isReady = false;

						if (angular.isObject(scope.schema)) {
							schemaPromise = $q.when(scope.schema);
						}
						if (angular.isObject(scope.value)) {
							// Support both $http (i.e. $q) and $resource promises, and also normal object.
							valueToResolve = scope.value;
							if (angular.isDefined(valueToResolve.$promise)) {
								startValPromise = $q.when(valueToResolve.$promise);

							} else {
								startValPromise = $q.when(valueToResolve);
							}
						}

						// Wait for the start value and schema to resolve before building the editor.
						$q.all([schemaPromise, startValPromise]).then(function (result) {

							// Support $http promise response with the 'data' property.
							var skuPropsSchema = result[0].data || result[0],
								startVal = result[1];
							if (skuPropsSchema === null) {
								throw new Error('props-widget: could not resolve schema data.');
							}
							var skuTableSchema = skuProps2schema(scope.title, skuPropsSchema);
							var innerVal = ext2innProps(startVal);

							angular.extend(PropsWidgetConfig, {
								startval: innerVal,
								schema: skuTableSchema
							});
							if (PropsWidgetConfig.language) {
								JSONEditor.defaults.language = PropsWidgetConfig.language;
							}
							scope.editor = new JSONEditor(element[0], PropsWidgetConfig);

							var editor = scope.editor;

							editor.on('ready', function () {
								scope.isValid = (editor.validate().length === 0);
								scope.isReady = true;

								if (scope.unbindSchemaWatcher) {
									scope.unbindSchemaWatcher();
								}
								scope.unbindSchemaWatcher = scope.$watch('schema', function () {
									if (scope.isReady && skuPropsSchema !== scope.schema) {
										scope.editor.destroy();
										// reset value
										if (isArray(scope.value)) {
											scope.value.length = 0;
										} else {
											scope.value = {};
										}
										setupEditor();
									}
								});

								if (scope.unbindValueWatcher) {
									scope.unbindValueWatcher();
								}
								scope.unbindValueWatcher = scope.$watch('value', function () {
									if (scope.isReady) {
										var innValue = ext2innProps(scope.value);
										scope.editor.setValue(innValue);
									}
								}, true);

								if (scope.unbindSkuPropsWatcher) {
									scope.unbindSkuPropsWatcher();
								}
								scope.unbindSkuPropsWatcher = scope.$watch('skuProps', function (val) {
									if (scope.isReady) {
										var key, value;
										var keys = Object.keys(scope.skuProps);

										var arrays = [];
										for (var i = 0; i < keys.length; i += 1) {
											key = keys[i];
											var values = scope.skuProps[key];
											arrays.push(values);
										}
										var crossProducts = cartesianProductOf(arrays);

										scope.value.length = 0;
										crossProducts.forEach(function (crossProduct) {
											var extSku = {
												skuProps: {},
												price: 0,
												stock: 0,
												image: ''
											};
											for (var i = 0; i < keys.length; i += 1) {
												key = keys[i];
												value = crossProduct[i];
												extSku.skuProps[key] = value;
											}
											scope.value.push(extSku);
										});
									}
								}, true);
							});

							editor.on('change', function () {
								scope.$apply(function () {
									scope.isValid = (editor.validate().length === 0);
									if (scope.isValid) {
										var value = editor.getValue();
										var extValue = inn2extProps(value);
										mergeProps(scope.value, extValue);
										if (scope.onChanged) {
											scope.onChanged();
										}
									}
								});
							});
						});
					};
					setupEditor();
				}
			};

		}
	]);
