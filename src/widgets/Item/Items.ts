import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, VERY } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Item, { ItemProps } from './Item';
import * as CSS from './styles/item.min.css';

/**
 * Items can be grouped.
 */
export interface ItemsProps extends Properties {
  /** Items can be divided to better distinguish between grouped content. */
  divided?: boolean;
  /** Shorthand array of props for Item. */
  items?: (string | ItemProps)[];
  /** An item can be formatted so that the entire contents link to another page. */
  link?: boolean;
  /** A group of items can relax its padding to provide more negative space. */
  relaxed?: boolean | keyof typeof VERY;
  /** Prevent items from stacking on mobile. */
  unstackable: boolean;
}

@theme(CSS)
export default class Items extends Base<ItemsProps> {
  static meta = {
    title:  'Items',
    collection: 'Item',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      divided, link, unstackable,
      relaxed,
	    items = [], className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {divided, link, unstackable}),
        ...classy.generic(CSS, relaxed),
  			CSS.items
      ).fixed(...this.fixed)
		};
    const rootProps = {...rest, ...props};
    if (!!children.length) { return v(ElementType, rootProps, children) }
    const content = items.map((o: any) => {
      const { childKey, ...itemProps } = o;
      return Item.create({
        ...itemProps,
        key: (childKey || [
          itemProps.content, itemProps.description, itemProps.header, itemProps.meta
        ].join('-'))
      });
    });
		return v(ElementType, rootProps, content);
	}
}
