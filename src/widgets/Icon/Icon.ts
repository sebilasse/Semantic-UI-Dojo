import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, SIZE, POS, ROTATE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Image, { ImageProps } from '../Image/Image';
import Icons from './Icons';
import * as CSS from './styles/icon.min.css';

/**
 * An icon is a glyph used to represent something else.
 * @see Image
 */
export interface IconProps extends Properties {
  /** Formatted to appear bordered. */
  bordered?: boolean;
  /** Icon can formatted to appear circular. */
  circular?: boolean;
  /** Color of the label. */
  color?: keyof typeof COLOR;
  /** A label can position itself in the corner of an element. */
  corner?: boolean;
  /** Indicate that the icon is inactive. */
  disabled?: boolean;
  /** Fitted, without space to left or right of Icon. */
  fitted?: boolean;
  /** Icon can appear flipped. */
  flipped?: keyof typeof POS.HV;
  /** Formatted to have its colors inverted for contrast. */
  inverted?: boolean;
  /** Icon can be formatted as a link. */
  link?: boolean;
  /** Icon can be used as a simple loader. */
  loading?: boolean;
  /** Name of the icon. */
  name?: string; // TODO customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),
  /** Icon can appear rotated. */
  rotated?: keyof typeof ROTATE;
  /** Size of the icon. */
  size?: keyof typeof SIZE.NO_MEDIUM;
}

@theme(CSS)
export default class Icon extends Base<IconProps> {
  static meta = {
    title: 'Icon',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ATOM
  };
  static mapPrimitiveValue(value: any): any {
    return { name: value }
  }
  static Group = Icons;

	render() {
		const {
      bordered, circular, corner, disabled, fitted, inverted, link, loading,
      color, flipped, name, rotated, size,
      className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, {as: 'i', ...this.properties});

    const classes = this.classes(
      ...classy.values(CSS, {color, name, size}),
      ...classy.keys(CSS, {bordered,circular,corner,disabled,fitted,inverted,link,loading}),
      ...classy.valueKeys(CSS, {flipped, rotated}),
      CSS.icon
    ).fixed(...this.fixed);

    const rootProps = {...rest, classes, ariaHidden: 'true'}
    return v(ElementType, rootProps)
  }
}
