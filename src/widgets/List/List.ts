import { Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, POS, SIZE, VERY } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Image, { ImageProps } from '../Image/Image';
import ListContent from './ListContent';
import ListDescription from './ListDescription';
import ListHeader from './ListHeader';
import ListIcon from './ListIcon';
import ListItem, { ListItemProps } from './ListItem';
import ListList from './ListList';
import * as CSS from './styles/list.min.css';

/**
 * A list groups related content.
 */
export interface ListProps extends Properties {
  /** A list can animate to set the current item apart from the list. */
  animated?: boolean;
  /** A list can mark items with a bullet. */
  bulleted?: boolean;
  /** A list can divide its items into cells. */
  celled?: boolean;
  /** A list can show divisions between content. */
  divided?: boolean;
  /** An list can be floated left or right. */
  floated?: keyof typeof POS.LR;
  /** A list can be formatted to have items appear horizontally. */
  horizontal?: boolean;
  /** A list can be inverted to appear on a dark background. */
  inverted?: boolean;
  /** Shorthand array of props for ListItem. */
  items?: (string | ListItemProps)[];
  /** A list can be specially formatted for navigation links. */
  link?: boolean;
  /** A list can be ordered numerically. */
  ordered?: boolean;
  /** A list can relax its padding to provide more negative space. */
  relaxed?: boolean | keyof typeof VERY;
  /** A selection list formats list items as possible choices. */
  selection?: boolean;
  /** A list can vary in size. */
  size?: keyof typeof SIZE;
  /** An element inside a list can be vertically aligned. */
  verticalAlign?: keyof typeof POS.TB;
  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onItemClick?: (event: MouseEvent & TouchEvent, data: ListProps) => void;
}

@theme(CSS)
export default class List extends Base<ListProps> {
  static meta = {
    title:  'List',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ORGANISM
  };
  static Content = ListContent;
  static Description = ListDescription;
  static Header = ListHeader;
  static Icon = ListIcon;
  static Item = ListItem;
  static List = ListList;

  handleItemOverrides(predefinedProps: any) {
    return {
      onClick: (e: Event, itemProps: any) => {
        /* TODO FIXME
        var result = _.invoke(items, fn, extraArgs)

        var result = [];
        for (var i=0; i<items.length; i++) {
          result.push( fn.apply(items[i], extraArgs) );
        }

        _.invoke(predefinedProps, 'onClick', e, itemProps)
        _.invoke(this.properties, 'onItemClick', e, itemProps)
        */
      }
    }
  }

	render() {
		const {
      animated, bulleted, celled, divided, horizontal, inverted, link, ordered, selection,
      size, relaxed, floated,
      verticalAlign, onClick, items = [], className = null, ...rest
		} = this.properties;

		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
      role: 'list',
			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {size}),
        ...classy.keys(CSS, {
          animated, bulleted, celled, divided, horizontal, inverted, link, ordered, selection
        }),
        ...classy.generic(CSS, {relaxed}),
        ...classy.valueKeys(CSS, {floated}),
        ...classy.verticalAlign(CSS, {verticalAlign}),
  			CSS.list
      ).fixed(...this.fixed)
		}
    if (!!children.length) { return v(ElementType, props, children) }
    items.map((item) => {
      children.push(ListItem.create(item, { overrideProps: this.handleItemOverrides }))
    });
		return v(ElementType, props, children);
	}
}
