import { META, Properties, Base, theme, classy, v, w } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import Image, { ImageProps } from '../Image/Image';
import ItemContent, { ItemContentProps } from './ItemContent';
import ItemDescription from './ItemDescription';
import ItemExtra from './ItemExtra';
import ItemHeader from './ItemHeader';
import ItemImage from './ItemImage';
import ItemMeta from './ItemMeta';
import Items from './Items';
import * as CSS from './styles/item.min.css';

/**
 * An item view presents large collections of site content for display.
 */
export interface ItemProps extends Properties {
  /** Shorthand for ItemDescription. */
  description?: string | Properties;
  /** Shorthand for primary content of ItemContent. */
  extra?: string | Properties;
  /** Shorthand for ItemHeader. */
  header?: string | Properties;
  /** Shorthand for ItemImage component. */
  image?: string | ImageProps;
  /** Shorthand for ItemMeta. */
  meta?: string | Properties;
  /** A Item can be inline to maintain the typographic rythm the page. */
  inline?: boolean;
}

@theme(CSS)
export default class Item extends Base<ItemProps> {
  static meta = {
    title: 'Item',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
  static Group = Items;
  static Content = ItemContent;
  static Description = ItemDescription;
  static Extra = ItemExtra;
  static Header = ItemHeader;
  static Image = ItemImage;
  static Meta = ItemMeta;

	render() {
		const {
      header, meta, description, extra, content = null,
	    image, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const rootProps = {...rest, classes: this.classes(CSS.item).fixed(...this.fixed)}
    if (!!children.length) { return v(ElementType, rootProps, children) }
		if (!!image) {
			children.unshift(Image.create(image));
		}
    if (!!content || !!description || !!header || !!meta) {
			children.push(w(ItemContent, {content, description, header, meta}));
		}

		return v(ElementType, rootProps, children);
	}
}
