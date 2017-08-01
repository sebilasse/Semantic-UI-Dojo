import { Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, COLOR } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Image, { ImageProps } from '../Image/Image';
import CardContent, { CardContentProps } from './CardContent';
import CardDescription from './CardDescription';
import CardHeader from './CardHeader';
import CardMeta from './CardMeta';
import Cards from './Cards';
import * as CSS from './styles/card.min.css';
/* TODO FIXME -
better isSmall : redaktor-default
.cardExtra .meta {
	display: inline-block;
	min-width: 52px;
}
meta : array (autospaced...)
*/

/**
 * A card displays site content in a manner similar to a playing card.
 */
export interface CardProps extends Properties {
  /** A Card can center itself inside its container. */
  centered?: boolean;
  /** A Card can be formatted to display different colors. */
  color?: keyof typeof COLOR;
  /** Shorthand for CardDescription. */
  description?: string | Properties;
  /** Shorthand for primary content of CardContent. */
  extra?: string | CardContentProps;
  /** A Card can be formatted to take up the width of its container. */
  fluid?: boolean;
  /** Shorthand for CardHeader. */
  header?: string | Properties;
  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href?: string;
  /** A card can contain an Image component. */
  image?: string | ImageProps;
  /** A card can be formatted to link to other content. */
  link?: boolean;
  /** Shorthand for CardMeta. */
  meta?: string | Properties;
  /** A Card can be formatted to raise above the page. */
  raised?: boolean;
  /** A Card can be inline to maintain the typographic rythm the page (not in all themes). */
  inline?: boolean;
  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: CardProps) => void;
};

@theme(CSS)
export default class Card extends Base<CardProps> {
  static meta = {
    title: 'Card',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
  static Group = Cards; /* TODO FIXME */
  static Content = CardContent;
  static Description = CardDescription;
  static Header = CardHeader;
  static Meta = CardMeta;

	render() {
    console.log('SCHEMA', Card.schema)
    console.log('META', Card.meta)
    console.log('fixed', this.fixed)
		const {
      header, meta, description, extra,
      color, centered, fluid, link, inline, raised,
	    href, image, onClick, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
		if (!!image) { children.unshift(Image.create(image)) }
    if (!!description || !!header || !!meta) {
			children.push(CardContent.create({description, header, meta}))
		}
    if (!!extra) {
      children.push(CardContent.create({extra}, [extra]))
    }

    const ElementType = getElementType(this, this.properties);
    const props = {
			href: href,
			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color}),
        ...classy.keys(CSS, {centered, fluid, link, inline, raised}),
  			CSS.card
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

		return v(ElementType, props, children);
	}
}
