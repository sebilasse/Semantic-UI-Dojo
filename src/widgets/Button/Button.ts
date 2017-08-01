import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, ANIM, ALIGN, POS, SOCIALCOLOR, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import Label, { LabelProps } from '../Label/Label';
import ButtonContent from './ButtonContent';
import ButtonOr from './ButtonOr';
import Buttons from './Buttons';
import * as CSS from './styles/button.min.css';

/**
 * A Button indicates a possible user action.
 * @see Form
 * @see Icon
 * @see Label
 */
export interface ButtonProps extends Properties {
  /** A button can show it is currently the active user selection. */
  active?: boolean;
  /** A button can animate to show hidden content. */
  animated?: boolean | keyof typeof ANIM.MINI;
  /** A button can be attached to the top or bottom of other content. */
  attached?: keyof typeof ALIGN.ALL;
  /** A basic button is less pronounced. */
  basic?: boolean;
  /** Primary content. */
  /* TODO FIXME specific
  children: customPropTypes.every([
    PropTypes.node,
    customPropTypes.disallow(['label']),
    customPropTypes.givenProps(
      {
        icon?: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.object.isRequired,
          PropTypes.element.isRequired,
        ]),
      },
      customPropTypes.disallow(['icon']),
    ),
  ]),
  */
  /** A button can be circular. */
  circular?: boolean;
  /** A button can have different colors */
  color?: keyof typeof SOCIALCOLOR;
  /** A button can reduce its padding to fit into tighter spaces. */
  compact?: boolean;
  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean;
  /** A button can be aligned to the left or right of its container. */
  floated?: keyof typeof POS.LR;
  /** A button can take the width of its container. */
  fluid?: boolean;
  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon?: boolean | string | IconProps;
  /** A button can be formatted to appear on dark backgrounds. */
  inverted?: boolean;
  /** Add a Label by text, props object, or pass a <Label />. */
  label?: boolean | string | LabelProps;
  /** A labeled button can format a Label or Icon to appear on the left or right. */
  labelPosition?: keyof typeof POS.LR;
  /** A button can show a loading indicator. */
  loading?: boolean;
  /** A button can hint towards a negative consequence. */
  negative?: boolean;
  /** A button can hint towards a positive consequence. */
  positive?: boolean;
  /** A button can be formatted to show different levels of emphasis. */
  primary?: boolean;
  /** A button can be formatted to show different levels of emphasis. */
  secondary?: boolean;
    /** A button can have different sizes. */
  size?: keyof typeof SIZE.ALL;
  /** A button can receive focus. */
  tabIndex?: number | string;
  /** A button can be formatted to toggle on and off. */
  toggle?: boolean;
  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: ButtonProps) => void;
}

@theme(CSS)
export default class Button extends Base<ButtonProps> {
  static meta = {
    title: 'Button',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  static Group = Buttons;
  static Content = ButtonContent;
  static Or = ButtonOr;

  computeElementType() {
    const { attached, label } = this.properties;
    if (!!attached || !!label) return 'div';
  }

  computeTabIndex(ElementType: string) {
    const { disabled, tabIndex } = this.properties;
    if (!!tabIndex) return Number(tabIndex);
    if (disabled) return -1;
    if (ElementType === 'div') return 0;
  }

	render() {
		const {
      active, basic, circular, compact, fluid, icon, inverted, loading, negative,
      positive, primary, secondary, toggle,
      animated, attached, disabled, floated, label, size,
      color, labelPosition,
	    onClick, content = null, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const uiClass = this.classes(CSS.ui);
    const btnClass = this.classes(CSS.button);
    const baseClasses = this.classes(
      ...classy.values(CSS, {color, size}),
      ...classy.keys(CSS, {basic, circular, compact, fluid}),
      ...classy.valueKeys(CSS, {icon}), // TODO
      ...classy.keys(CSS, {inverted, loading, negative, positive, primary, secondary, toggle}),
      ...classy.generic(CSS, {animated, attached})
    );
    const wrapperClasses = this.classes(
      ...classy.keys(CSS, {disabled}),
      ...classy.valueKeys(CSS, {floated})
    );
    const labeledClasses = this.classes(
      ...classy.generic(CSS, {labeled: labelPosition || !!label}),
    );
    const ElementType = getElementType(Button, this.properties, this.computeElementType);
    const tabIndex = this.computeTabIndex(ElementType);

    if (!!children.length) {
      const classes = {...uiClass, ...baseClasses, ...wrapperClasses, ...labeledClasses, ...btnClass};
      return v(ElementType, {
        ...rest,
        classes: classes.fixed(...this.fixed),
        tabIndex: tabIndex,
        onClick: this.handleClick
      }, children)
    }
    const _children = [Icon.create(icon), content];
    if (!!label) {
      const labelElement = Label.create(label, {
        basic: true,
        pointing: labelPosition === 'left' ? 'right' : 'left'
      });
      if (labelElement) {
        const classes = {...uiClass, ...baseClasses, ...btnClass};
        const containerClasses = {...uiClass, ...labeledClasses, ...btnClass, ...wrapperClasses};
        children.push(
          v('button', {classes: classes.fixed(), tabIndex}, _children),
          (labelPosition === 'right' || !labelPosition) ? labelElement : null
        );
        return v(ElementType, {
          ...rest,
          tabIndex: 0,
          classes: containerClasses.fixed(...this.fixed),
          onClick: this.handleClick
        }, children)
      }
    }
    const classes = {...uiClass, ...labeledClasses, ...baseClasses, ...btnClass, ...wrapperClasses};
    return v(ElementType, {
      ...rest,
      classes: classes.fixed(...this.fixed),
      tabIndex,
      onClick: this.handleClick
    }, (!!icon) ? _children : [content])
	}
}
