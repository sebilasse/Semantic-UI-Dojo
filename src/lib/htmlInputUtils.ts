export const htmlInputAttrs = [
  // CUSTOM
  'selected', 'defaultValue', 'defaultChecked',
  // LIMITED HTML PROPS
  'autoCapitalize', 'autoComplete', 'autoCorrect', 'autoFocus', 'checked',
  'disabled', 'form', 'id', 'max', 'maxLength', 'min', 'multiple', 'name',
  'pattern', 'placeholder', 'readOnly', 'required', 'step', 'type', 'value'
]

export const htmlInputEvents = [
  // EVENTS
  // keyboard
  'onKeyDown', 'onKeyPress', 'onKeyUp',
  // focus
  'onFocus', 'onBlur',
  // form
  'onChange', 'onInput',
  // mouse
  'onClick', 'onContextMenu',
  'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave',
  'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter',
  'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp',
  // selection
  'onSelect',
  // touch
  'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart',
]

export const htmlInputProps = [...htmlInputAttrs, ...htmlInputEvents]

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @param {object} props A dojo widget properties object
 * @param {array} [htmlProps] An array of html input props
 * @returns {[{}, {}]} An array of objects
 */
export default function partitionHTMLInputProps (props: any, htmlProps = htmlInputProps) {
  const inputProps: any = {};
  const rest: any = {};
  props.forEach((val: any, prop: any) => {
    (htmlProps.indexOf(prop) > -1) ? (inputProps[prop] = val) : (rest[prop] = val);
  });
  return [inputProps, rest]
}
