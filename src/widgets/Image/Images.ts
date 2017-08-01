import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Image, { ImageProps } from './Image';
import * as CSS from './styles/image.min.css';

/**
 * Images can be grouped.
 */
export interface ImagesProps extends Properties {
  /** Shorthand array of props for Image. */
  items?: (string | ImageProps)[];
  /** A group of images can be formatted to have the same size. */
  size?: keyof typeof SIZE.ALL;
}

@theme(CSS)
export default class Images extends Base<ImagesProps> {
  static meta = {
    title:  'Images',
    collection: 'Image',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const { size, items = [], className = null, ...rest } = this.properties;
		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {size}),
  			CSS.images
      ).fixed(...this.fixed)
		}
    if (!!children.length) { return v(ElementType, props, children) }
    const content = mapItems(items, Image);
		return v(ElementType, props, content);
	}
}
