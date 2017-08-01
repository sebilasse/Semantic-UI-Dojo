import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, NUMBER } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Card, { CardProps } from './Card';
import * as CSS from './styles/card.min.css';

/**
 * A group of cards.
 */
export interface CardsProps extends Properties {
  /** A group of cards can double its column width for mobile. */
  doubling?: boolean;
  /** Shorthand array of props for Card. */
  items?: (string | CardProps)[];
  /** A group of cards can set how many cards should exist in a row. */
  itemsPerRow?: NUMBER | keyof typeof NUMBER;
  /** A group of cards can automatically stack rows to a single columns on mobile devices. */
  stackable?: boolean;
}

@theme(CSS)
export default class Cards extends Base<CardsProps> {
  static meta = {
    title:  'Cards',
    collection: 'Card',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      doubling, stackable,
      itemsPerRow,
	    items = [], className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {doubling, stackable}),
        ...classy.width(CSS, itemsPerRow),
  			CSS.cards
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }
    const content = mapItems(items, Card);
		return v(ElementType, rootProps, content);
	}
}
