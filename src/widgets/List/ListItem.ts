import { META, Properties, Base, theme, classy, v, w } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import Image, { ImageProps } from '../Image/Image';
import ListContent, { ListContentProps } from './ListContent';
import ListDescription from './ListDescription';
import ListHeader from './ListHeader';
import ListIcon, { ListIconProps } from './ListIcon';
import * as CSS from './styles/list.min.css';

/**
* A list item can contain a set of items.
* CONTENT :
*
* Heads up!
*
* This is handled slightly differently than the typical `content` prop since
* the wrapping ListContent is not used when there's no icon or image.
*
* If you pass content as:
* - an element/literal, it's treated as the sibling node to
* header/description (whether wrapped in Item.Content or not).
* - a props object, it forces the presence of Item.Content and passes those
* props to it. If you pass a content prop within that props object, it
* will be treated as the sibling node to header/description.
*/
export interface ListItemProps extends Properties {
  /** A List Item can be active. */
  active?: boolean;
  /** Shorthand for ListDescription. */
  description?: string | Properties;
  /** A list item can disabled. */
  disabled?: boolean;
  /** Shorthand for ListHeader. */
  header?: string | Properties;
  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href?: string;
  /** Shorthand for ListIcon. */
  icon?: string | ListIconProps;
  /** Shorthand for Image. */
  image?: string | ImageProps;
  /** A value for an ordered list. */
  value?: string;
  /**
   * A ListItem can be clicked. Called on click.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: ListItemProps) => void;
}

@theme(CSS)
export default class ListItem extends Base<ListItemProps> {
  static meta = {
    title:  'ListItem',
    parent: 'ListContent',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      active, disabled,
      description, header, icon, image,
	    href, onClick, value, content = null, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			href: href,
			onclick: this.handleClick,
			classes: this.classes(
        ...classy.keys(CSS, {active, disabled}),
  			ElementType !== 'li' ? CSS.item : null
      ).fixed(...this.fixed)
		}
    const valueProp = ElementType === 'li' ? { value } : { 'data-value': value };
    const rootProps = {...rest, ...props, ...valueProp, role: 'listItem'};
    if (!!children.length) { return v(ElementType, rootProps, children) }
    const iconElement = ListIcon.create(icon);
    const imageElement = Image.create(image);
    // See description of `content` prop for explanation about why this is necessary.
    if (Base.isPropsObject(content)) {
      children.push(iconElement || imageElement);
      children.push(ListContent.create(content, { header, description }));
      return v(ElementType, rootProps, children);
    }
    const headerElement = ListHeader.create(header)
    const descriptionElement = ListDescription.create(description)
    if (iconElement || imageElement) {
      children.push(iconElement || imageElement);
      if (content || headerElement || descriptionElement) {
        children.push(w(ListContent, {}, [
          headerElement,
          descriptionElement,
          content
        ]))
      }
      return v(ElementType, rootProps, children);
    }
    children.push(w(ListContent, {}, [
      headerElement,
      descriptionElement,
      content
    ]));
		return v(ElementType, rootProps, children);
	}
}
