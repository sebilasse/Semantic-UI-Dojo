import { Properties, Base, theme } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import Image, { ImageProps } from '../Image/Image';
import * as CSS from './styles/item.min.css';

/**
 * An item can contain an image.
 */
export interface ItemImageProps extends Properties {
  /** An image may appear at different sizes. */
  size?: keyof typeof SIZE.ALL;
}

@theme(CSS)
export default class ItemImage extends Base<ItemImageProps> {
  static meta = {
    title:  'ItemImage',
    parent: 'ItemContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM
  };
  render() {
		const { size, className = null, ...rest } = this.properties;
    return Image.create({...rest, size, ui: !!size, wrapped: true});
  }
}
