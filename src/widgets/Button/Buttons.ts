import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, ALIGN, POS, SOCIALCOLOR, SIZE, NUMBER } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Button, { ButtonProps } from './Button';
import * as CSS from './styles/button.min.css';

/**
 * Buttons can be grouped.
 */
export interface ButtonsProps extends Properties {
  /** A button can be attached to the top or bottom of other content. */
  attached?: keyof typeof ALIGN.ALL;
  /** Groups can be less pronounced. */
  basic?: boolean;
  /** Groups can have a shared color. */
  color?: keyof typeof SOCIALCOLOR;
  /** Groups can reduce their padding to fit into tighter spaces. */
  compact?: boolean;
  /** Groups can be aligned to the left or right of its container. */
  floated?: keyof typeof POS.LR;
  /** Groups can take the width of their container. */
  fluid?: boolean;
  /** Groups can be formatted as icons. */
  icon?: boolean;
  /** Groups can be formatted to appear on dark backgrounds. */
  inverted?: boolean;
  /** Shorthand array of props for Button. */
  items?: (string | ButtonProps)[];
  /** Groups can be formatted as labeled icon buttons. */
  labeled?: boolean;
  /** Groups can hint towards a negative consequence. */
  negative?: boolean;
  /** Groups can hint towards a positive consequence. */
  positive?: boolean;
  /** Groups can be formatted to show different levels of emphasis. */
  primary?: boolean;
  /** Groups can be formatted to show different levels of emphasis. */
  secondary?: boolean;
  /** Groups can have different sizes. */
  size?: keyof typeof SIZE.ALL;
  /** Groups can be formatted to toggle on and off. */
  toggle?: boolean;
  /** Groups can be formatted to appear vertically. */
  vertical?: boolean;
  /** Groups can have their widths divided evenly. */
  widths?: keyof typeof NUMBER;
}

@theme(CSS)
export default class Buttons extends Base<ButtonsProps> {
  static meta = {
    title:  'Buttons',
    collection: 'Button',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      color, size,
      basic, compact, fluid, icon, inverted, labeled, negative, positive,
      primary, secondary, toggle, vertical,
      attached, floated,
      widths, items = [], className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {
          basic, compact, fluid, icon, inverted, labeled, negative, positive,
          primary, secondary, toggle, vertical
        }),
        ...classy.valueKeys(CSS, {attached, floated}),
        ...classy.width(CSS, widths),
  			CSS.buttons
      ).fixed(...this.fixed)
		}
    const content = mapItems(items, Button);
		return v(ElementType, props, content);
	}
}
