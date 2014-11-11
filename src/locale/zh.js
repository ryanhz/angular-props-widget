'use strict';

JSONEditor.defaults.languages.zh = {
  /**
   * When a property is not set
   */
  'error_notset': '属性必须设置',
  /**
   * When a string must not be empty
   */
  'error_notempty': '必须值',
  /**
   * When a value is not one of the enumerated values
   */
  'error_enum': '值必须是枚举值之一',
  /**
   * When a value doesn't validate any schema of a 'anyOf' combination
   */
  'error_anyOf': '值必须是通过提供的Schema之一的校验',
  /**
   * When a value doesn't validate
   * @variables This key takes one variable: The number of schemas the value does not validate
   */
  'error_oneOf': '值必须是仅通过提供的一个Schema之一的校验。它当前通过{{0}}个Schema的校验',
  /**
   * When a value does not validate a 'not' schema
   */
  'error_not': '值必须不能通过提供的Schema验证',
  /**
   * When a value does not match any of the provided types
   */
  'error_type_union': '值必须试提供的类型之一',
  /**
   * When a value does not match the given type
   * @variables This key takes one variable: The type the value should be of
   */
  'error_type': '值必须是{{0}}类型的',
  /**
   *  When the value validates one of the disallowed types
   */
  'error_disallow_union': '值必须不能是禁止类型之一',
  /**
   *  When the value validates a disallowed type
   * @variables This key takes one variable: The type the value should not be of
   */
  'error_disallow': '值必须不能是{{0}}类型的',
  /**
   * When a value is not a multiple of or divisible by a given number
   * @variables This key takes one variable: The number mentioned above
   */
  'error_multipleOf': '值必须是{{0}}类型数组',
  /**
   * When a value is greater than it's supposed to be (exclusive)
   * @variables This key takes one variable: The maximum
   */
  'error_maximum_excl': '值必须小于{{0}}',
  /**
   * When a value is greater than it's supposed to be (inclusive
   * @variables This key takes one variable: The maximum
   */
  'error_maximum_incl': '值最大为{{0}}',
  /**
   * When a value is lesser than it's supposed to be (exclusive)
   * @variables This key takes one variable: The minimum
   */
  'error_minimum_excl': '值必须大于{{0}}',
  /**
   * When a value is lesser than it's supposed to be (inclusive)
   * @variables This key takes one variable: The minimum
   */
  'error_minimum_incl': '值必须最小{{0}}',
  /**
   * When a value have too many characters
   * @variables This key takes one variable: The maximum character count
   */
  'error_maxLength': '值必须最多{{0}}个字符长',
  /**
   * When a value does not have enough characters
   * @variables This key takes one variable: The minimum character count
   */
  'error_minLength': '值必须最少{{0}}个字符长',
  /**
   * When a value does not match a given pattern
   */
  'error_pattern': '值必须匹配提供的模式',
  /**
   * When an array has additional items whereas it is not supposed to
   */
  'error_additionalItems': '这个数组不允许添加额外的元素',
  /**
   * When there are to many items in an array
   * @variables This key takes one variable: The maximum item count
   */
  'error_maxItems': '值必须最多{{0}}项',
  /**
   * When there are not enough items in an array
   * @variables This key takes one variable: The minimum item count
   */
  'error_minItems': '值必须最少{{0}}项',
  /**
   * When an array is supposed to have unique items but has duplicates
   */
  'error_uniqueItems': '数组元素必须唯一',
  /**
   * When there are too many properties in an object
   * @variables This key takes one variable: The maximum property count
   */
  'error_maxProperties': '对象必须最多{{0}}个属性',
  /**
   * When there are not enough properties in an object
   * @variables This key takes one variable: The minimum property count
   */
  'error_minProperties': '对象必须最少{{0}}个属性',
  /**
   * When a required property is not defined
   * @variables This key takes one variable: The name of the missing property
   */
  'error_required': '对象缺少必须属性{{0}}',
  /**
   * When there is an additional property is set whereas there should be none
   * @variables This key takes one variable: The name of the additional property
   */
  'error_additional_properties': '不允许额外属性，但属性{{0}}已经设置',
  /**
   * When a dependency is not resolved
   * @variables This key takes one variable: The name of the missing property for the dependency
   */
  'error_dependency': '必须有{{0}}属性'
};
