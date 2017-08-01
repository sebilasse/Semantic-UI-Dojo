import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, SIZE, POS, ALIGN, SHAPE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Dimmer from '../Dimmer/Dimmer';
import Label from '../Label/Label';
import Images from './Images';
import * as CSS from './styles/image.min.css';

/**
 * An image is a graphic representation of something.
 * @see Icon
 */
export interface ImageProps extends Properties {
  /** Alternate text for the image specified. */
  alt?: string;
  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean;
  /** An image may include a border to emphasize the edges of white or
   * transparent content.
  */
  bordered?: boolean;
  /** An image can appear centered in a content block. */
  centered?: boolean;
  /** An image can show that it is disabled and cannot be selected. */
  disabled?: boolean;
  /** Shorthand for Dimmer. */
  dimmer?: any;
  /** An image can sit to the left or right of other content. */
  floated?: keyof typeof POS.LR;
  /** An image can take up the width of its container. */
  fluid?: boolean;
  /** The img element height attribute. */
  height?: string | number;
  /** An image can be hidden. */
  hidden?: boolean;
  /** Renders the Image as an <a> tag with this href. */
  href?: string;
  /** An image may appear inline. */
  inline?: boolean;
  /** Shorthand for Label. */
  label?: any;
  /** An image may appear rounded or circular. */
  shape?: keyof typeof SHAPE;
  /** An image may appear at different sizes. */
  size?: keyof typeof SIZE.ALL;
  /** An image can specify that it needs an additional spacing to separate it
   * from nearby content.
  */
  spaced?: boolean | keyof typeof POS.LR;
  /** Specifies the URL of the image. */
  src?: string;
  // TODO srcset etc.
  /** Whether or not to add the `ui` className. */
  ui?: boolean;
  /** An image can specify its vertical alignment. */
  verticalAlign?: keyof typeof ALIGN.V;
  /** The img element width attribute. */
  width?: string;
  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped?: boolean;
}


@theme(CSS)
export default class Image extends Base<ImageProps> {
  static meta = {
    title: 'Image',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ATOM
  };
  static Group = Images;
  static mapPrimitiveValue(value: any) { return { src: value } }

	handleClick(e: MouseEvent & TouchEvent) {
    const { onClick } = this.properties
    if (onClick) { onClick(e, this.properties) }
  }

	render() {
		const {
      alt, avatar, bordered, centered, disabled, fluid, hidden, inline, ui = true,
      floated, spaced, verticalAlign,
      dimmer, label, wrapped,
      href, src, height, width, shape, size, onClick, className = null,
      ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties, () => {
      if (!!dimmer || !!label || !!wrapped || !!this.children.length) { return 'div' }
      if (!this.properties.as) { return 'img' }
    });

    const classes = this.classes(
      (!!ui) ? CSS.ui : null,
      ...classy.values(CSS, {size, shape}),
      ...classy.keys(CSS, {avatar,bordered,centered,disabled,fluid,hidden,inline}),
      ...classy.generic(CSS, {spaced}),
      ...classy.valueKeys(CSS, {floated: floated, aligned: verticalAlign}),
      CSS.image
    ).fixed(...this.fixed);

    const rootProps = {...rest, classes}
    const imgTagProps = {alt, src, height, width};
		const children = [...this.children];
    if (!!children.length) { return v(ElementType, rootProps, children) }
    if (ElementType === 'img') {
      return v(ElementType, {...rootProps, ...imgTagProps}, children)
    }
    if (!!dimmer) { children.push(Dimmer.create(dimmer)) }
    if (!!label) { children.push(Label.create(label)) }
    children.push(v('img', imgTagProps))

    return v(ElementType, {...rootProps, href, onclick: this.handleClick}, children)
	}
}
