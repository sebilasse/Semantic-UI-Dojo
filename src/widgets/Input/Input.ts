import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, POS, ALIGN, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import partitionHTMLInputProps from '../../lib/htmlInputUtils';
import Button from '../Button/Button';
import Label, { LabelProps } from '../Label/Label';
import Icon, { IconProps } from '../Icon/Icon';
import * as CSS from './styles/input.min.css';

/**
 * An Input is a field used to elicit a response from a user.
 * @see Button
 * @see Form
 * @see Icon
 * @see Label
 */
export interface InputProps extends Properties {
  /** A Input can center itself inside its container. */
  centered?: boolean;
  /** An Input can be formatted to alert the user to an action they may perform. */
  action?: boolean | string | Properties;
  /** An action can appear along side an Input on the left or right. */
  actionPosition?: keyof typeof POS.LR;
  /** An Input field can show that it is disabled. */
  disabled?: boolean;
  /** An Input field can show the data contains errors. */
  error?: boolean;
  /** Take on the size of it\'s container. */
  fluid?: boolean;
  /** An Input field can show a user is currently interacting with it. */
  focus?: boolean;
  /** Optional Icon to display inside the Input. */
  icon?: boolean | string | IconProps;
  /** An Icon can appear inside an Input on the left or right. */
  iconPosition?: keyof typeof POS.LR;
  /** Shorthand for creating the HTML Input. */
  input?: string | Properties;
  /** Format to appear on dark backgrounds. */
  inverted?: boolean;
  /** Optional Label to display along side the Input. */
  label?: string | LabelProps;
  /** A Label can appear outside an Input on the left or right. */
  labelPosition?: keyof typeof ALIGN.LRCORNER;
  /** An Icon Input field can show that it is currently loading data. */
  loading?: boolean;
  /** An Input can vary in size. */
  size?: keyof typeof SIZE.ALL;
  /** An Input can receive focus. */
  tabIndex?: number | string;
  /** Transparent Input has no background. */
  transparent?: boolean;
  /** The HTML input type. */
  type?: string;
  /**
   * Called on change.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props and proposed value.
   */
  onChange?: (e: Event, props?: any) => any;
}

@theme(CSS)
export default class Input extends Base<InputProps> {
  static meta = {
    title: 'Input',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  inputRef: any;

  private computeTabIndex() {
    let { disabled, tabIndex } = this.properties;
    if (typeof tabIndex === 'string') { tabIndex = parseInt(tabIndex) }
    if (!!tabIndex || tabIndex === 0) { return tabIndex }
    if (!!disabled) { return -1 }
  }

  private focus() { return this.inputRef.focus() }

  private handleChange(e: Event) {
    const { onChange } = this.properties;
    const value = (e && !!e.target && (<any>e.target).value); // TODO FIXME
    return (!onChange) ? {} : onChange(e, { ...this.properties, value })
  }

  private ref(child: any, c: any) {
    var result = [];
    for (var i=0; i<child.length; i++) {
      result.push( this.ref.apply(child[i], c) );
    }
    this.handleInputRef(c)
  }

  private handleChildOverrides(child: any, defaultProps: InputProps) {
    return {
      ...defaultProps,
      ...child.props,
      ref: (c: any) => this.ref(child, c)
    }
  }

  private handleInputRef(c: any) { this.inputRef = c }

  private partitionProps(unhandled: any) {
    const { disabled, onChange, type = 'text' } = this.properties;

    const tabIndex = this.computeTabIndex();
    const [htmlInputProps, rest] = partitionHTMLInputProps(unhandled);

    htmlInputProps.ref = this.handleInputRef;
    htmlInputProps.type = type;

    if (disabled) htmlInputProps.disabled = disabled;
    if (onChange) htmlInputProps.onChange = this.handleChange;
    if (tabIndex) htmlInputProps.tabIndex = tabIndex;

    return [htmlInputProps, rest]
  }

	render() {
		const {
      action,
      actionPosition,
      disabled,
      error,
      fluid,
      focus,
      icon,
      iconPosition,
      input,
      inverted,
      label,
      labelPosition,
      loading,
      size,
      transparent,
      type, onChange, className = null, ...pRest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, {type: 'text', ...this.properties});
    const actionFn = !!actionPosition ? classy.valueKeys : classy.keys;
    const iconFn = !!iconPosition ? classy.valueKeys : classy.keys;
    const labelFn = !!labelPosition ? classy.valueKeys : classy.keys;
    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {disabled,error,fluid,focus,inverted,loading,transparent}),
        ...actionFn(CSS, {action: (actionPosition||action)}),
        ...iconFn(CSS, {icon: (iconPosition||icon)}),
        ...labelFn(CSS, {labeled: (labelPosition||label)}),
  			CSS.input
      ).fixed(...this.fixed)
		}

    const [htmlInputProps, rest] = this.partitionProps(pRest);

    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

		return v(ElementType, props, children);
	}
}
