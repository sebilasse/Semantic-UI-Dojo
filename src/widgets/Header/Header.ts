import { Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, COLOR, POS, ALIGN, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import Image, { ImageProps } from '../Image/Image';
import HeaderContent from './HeaderContent';
import HeaderSubheader from './HeaderSubheader';
import * as CSS from './styles/header.min.css';

/**
 * A header provides a short summary of content.
 */
export interface HeaderProps extends Properties {
  /** Attach header  to other content, like a segment. */
  attached?: boolean | keyof typeof POS.TB;
  /** Format header to appear inside a content block. */
  block?: boolean;
  /** Color of the header. */
  color?: keyof typeof COLOR;
  /** Show that the header is inactive. */
  disabled?: boolean;
  /** Divide header from the content below it. */
  dividing?: boolean;
  /** Header can sit to the left or right of other content. */
  floated?: keyof typeof POS.LR;
  /** Add an icon by icon name or pass an Icon. */
  icon?: string | IconProps;
  /** Add an image by img src or pass an Image. */
  image?: string | ImageProps;
  /** Inverts the color of the header for dark backgrounds. */
  inverted?: boolean;
  /** Content headings are sized with em and are based on the font-size of their container. */
  size?: keyof typeof SIZE.NO_BIG_MASSIVE;
  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub?: boolean;
  /** Shorthand for Header.Subheader. */
  subheader?: string | Properties;
  /** Align header text. */
  textAlign?: keyof typeof ALIGN.TEXT;
}

@theme(CSS)
export default class Header extends Base<HeaderProps> {
  static meta = {
    title: 'Header',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  static Content = HeaderContent;
  static Subheader = HeaderSubheader;

	render() {
		const {
      block, disabled, dividing, inverted, sub,
      floated, color, size, attached, textAlign,
	    icon, image, subheader, content = null, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {block, disabled, dividing}),
        ...classy.valueKeys(CSS, {floated}),
        ...classy.generic(CSS, {icon, image}),
        ...classy.keys(CSS, {inverted, sub}),
        ...classy.generic(CSS, {attached}),
        ...classy.textAlign(CSS, {textAlign}),
  			CSS.header
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

    const iconElement = Icon.create(icon);
    const imageElement = Image.create(image);
    const subheaderElement = HeaderSubheader.create(subheader);

    if (iconElement || imageElement) {
      children.push(iconElement || imageElement);
      if (content || subheaderElement) {
        children.push(w(HeaderContent, {}, [content, subheaderElement]))
      }
      return v(ElementType, rootProps, children);
    }
    content && children.push(content);
    subheaderElement && children.push(subheaderElement);

		return v(ElementType, rootProps, children);
	}
}
