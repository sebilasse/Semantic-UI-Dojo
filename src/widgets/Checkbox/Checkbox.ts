import { META, Properties, Base, theme, afterRender, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/checkbox.min.css';
// TODO FIXME AutoControlled see trySetState, setState
import Dimensions from '@dojo/widget-core/meta/Dimensions';

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 * @see Form
 * @see Radio
 */
export interface CheckboxProps extends Properties {
  /** Whether or not checkbox is checked. */
  checked?: boolean;
  /** The initial value of checked. */
  defaultChecked?: boolean;
  /** Whether or not checkbox is tba. */
  defaulttba?: boolean;
  /** A checkbox can appear disabled and be unable to change states */
  disabled?: boolean;
  /** Removes padding for a label. Auto applied when there is no label. */
  fitted?: boolean;
  /** Whether or not checkbox is tba. */
  tba?: boolean;
  /** The text of the associated label element. */
  label?: string;
  /** The HTML input name. */
  name?: string;
  /** Format as a radio element. This means it is an exclusive option. */
  radio?: boolean; //disallow(['slider', 'toggle'])
  /** A checkbox can be read-only and unable to change states. */
  readOnly?: boolean;
  /** Format to emphasize the current selection state.*/
  slider?: boolean; //disallow(['radio', 'toggle'])
  /** A checkbox can receive focus. */
  tabIndex?: number | string;
  /** Format to show an on or off choice. */
  toggle?: boolean; //disallow(['radio', 'slider'])
  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio';
  /** The HTML input value. */
  value?: string;
  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props and proposed checked/tba state.
   */
  onChange?: (event: Event, data: CheckboxProps) => void;
  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props and current checked/tba state.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: CheckboxProps) => void;
  /**
   * Called when the user presses down on the mouse.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props and current checked/tba state.
   */
  onMouseDown?: (event: MouseEvent & TouchEvent, data: CheckboxProps) => void;
  /** */
  focus?: (event: MouseEvent & TouchEvent, data: CheckboxProps) => void; /* TODO FIXME */
}

@theme(CSS)
export default class Checkbox extends Base<CheckboxProps> {
  /*
  static meta = {
    title: 'Checkbox',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };*/
  /* TODO */
  static autoControlledProps = [ 'rating' ];
  static defaultProps = { clearable: 'auto', maxCheckbox: 1 };

  inputRef: any;
  checked: boolean;
  tba = true;

  /* TODO : ... */
  componentDidMount() { this.setIndeterminate() }
  componentDidUpdate() { this.setIndeterminate() }

  canToggle() {
    const { disabled, radio, readOnly } = this.properties;
    return !disabled && !readOnly && !(radio && this.checked)
  }

  computeTabIndex() {
    const { disabled } = this.properties;
    const tabIndex = Number(this.properties.tabIndex);
    if (typeof tabIndex === 'number') { return tabIndex }
    return disabled ? -1 : 0
  }

  handleInputRef(c: any) { this.inputRef = c; return c; }

  _onClick(event: MouseEvent & TouchEvent) {
    //TODO debug('_onClick()')
    const { checked, tba } = this;
    if (this.canToggle()) {
      this.evt('click', { ...this.properties, checked, tba }, event.target);
      this.evt('change', { ...this.properties, checked: !checked }, event.target);
      this.checked = !checked;
      this.tba = false;
    }
  }

  _onMouseDown(event: MouseEvent & TouchEvent) {
    //TODO debug('_onMouseDown()')
    const { onMouseDown, focus } = this.properties;
    const { checked, tba } = this;
    (typeof focus === 'function') && focus(event, this.inputRef);
    this.evt('mouseDown', { ...this.properties, checked, tba }, event.target)
  }

  // Note: You can't directly set the tba prop on the input, so we
  // need to maintain a ref to the input and set it manually whenever the
  // component updates.
  setIndeterminate() {
    if (this.inputRef) { this.inputRef.tba = !!this.tba }
  }

	render() {
    console.log(this)
    //const dimensions = this.meta(Dimensions).get('root');
		const {
      disabled, label = null, name, radio, readOnly, slider, toggle,
      type = 'checkbox', value = 'checked',
      className = null, tabIndex, key, ...rest
		} = this.properties;
    const { checked, tba } = this;

    const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
      key: 'root',
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {checked, disabled, tba}),
        // auto apply fitted class to compact white space when there is no label
        // https://semantic-ui.com/modules/checkbox.html#fitted
        ...classy.keys(CSS, !label ? {fitted: 1} : {}),
        ...classy.keys(CSS, {radio, readOnly, slider, toggle}),
        CSS.checkbox
      ).fixed(...this.fixed),
      onclick: this._onClick,
      onmousedown: this._onMouseDown
		}
    if (!children.length) {
      children.push(v('input.hidden', {
        checked: checked,
        name: name,
        readOnly,
        ref: this.handleInputRef,
        tabIndex: this.computeTabIndex(),
        type: type,
        value: value
      }))
      /*
       Heads Up!
       Do not remove empty labels, they are required by SUI CSS
      */
      children.push(v('label', {}, [label]));
    }
		return v(ElementType, props, children);
	}
  @afterRender()
	myAfterRender(result: any): any {
    console.log(this.meta(Dimensions))
    if (this.meta(Dimensions).has('root')) {
      const dimensions = this.meta(Dimensions).get('root');
      console.log( dimensions );
    }
    console.log('b')
		// do something with the result
		return result;
	}
}
