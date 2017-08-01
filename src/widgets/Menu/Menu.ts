import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, ALIGN, POS, SIZE, NUMBER, LABELED } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import MenuItem, { MenuItemProps } from './MenuItem';
import MenuHeader from './MenuHeader';
import MenuMenu from './MenuMenu';
import * as CSS from './styles/menu.min.css';

/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */
export interface MenuProps extends Properties {
  /** Index of the currently active item. */
  activeIndex?: number;
  /** A menu may be attached to other content segments. */
  attached?: boolean | keyof typeof POS.TB;
  /** A menu item or menu can have no borders. */
  borderless?: boolean;
  /** Additional colors can be specified. */
  color?: keyof typeof COLOR;
  /** A menu can take up only the space necessary to fit its content. */
  compact?: boolean;
  /** Initial activeIndex value. */
  defaultActiveIndex?: number;
  /** A menu can be fixed to a side of its context. */
  fixed?: keyof typeof ALIGN.ALL;
  /** A menu can be floated. */
  floated?: boolean | keyof typeof POS.LR;
  /** A vertical menu may take the size of its container. */
  fluid?: boolean;
  /** A menu may have just icons (bool) or labeled icons. */
  icon?: boolean | keyof typeof LABELED;
  /** Internal index */
  index?: number;
  /** A menu may have its colors inverted to show greater contrast. */
  inverted?: boolean;
  /** Shorthand array of props for Menu. */
  items?: (string | MenuItemProps)[];
  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination?: boolean;
  /** A menu can point to show its relationship to nearby content. */
  pointing?: boolean;
  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary?: boolean;
  /** A menu can vary in size. */
  size?: keyof typeof SIZE.NO_MEDIUM_BIG;
  /** A menu can stack at mobile resolutions. */
  stackable?: boolean;
  /** A menu can be formatted to show tabs of information. */
  tabular?: boolean | 'right';
  /** A menu can be formatted for text content. */
  text?: boolean;
  /** A vertical menu displays elements vertically. */
  vertical?: boolean;
  /** A menu can have its items divided evenly. */
  widths?: keyof typeof NUMBER;
  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All item props.
   */
  onItemClick?: (event: MouseEvent & TouchEvent, data: MenuItemProps) => void;
}

@theme(CSS)
export default class Menu extends Base<MenuProps> {
  static meta = {
    title: 'Menu',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  state: any = {};

  /* TODO FIXME */
  static autoControlledProps = [ 'activeIndex' ];

  static Header = MenuHeader;
  static Item = MenuItem;
  static Menu = MenuMenu;

  handleItemOverrides(predefinedProps: MenuProps) {
    return {
      onClick: (e: Event, itemProps: MenuProps) => {
        const { index } = itemProps;
        // TODO FIXME :
        /*
        this.trySetState({ activeIndex: index });
        _.invoke(predefinedProps, 'onClick', e, itemProps)
        _.invoke(this.properties, 'onItemClick', e, itemProps)
        */
      }
    }
  }

  renderItems() {
    const { items = [] } = this.properties;
    const { activeIndex } = this.state; // TODO FIXME <

    return items.map((item, index) => MenuItem.create(item, {
      defaultProps: {
        active: activeIndex === index,
        index,
      },
      overrideProps: this.handleItemOverrides,
    }))
  }

	render() {
		const {
      color, size,
      borderless, compact, fluid, inverted, pagination, pointing, secondary,
      stackable, text, vertical,
      attached, floated, icon, tabular, fixed, widths,
	    onItemClick, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props = {
//			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {
          borderless, compact, fluid, inverted, pagination,
          pointing, secondary, stackable, text, vertical
        }),
        ...classy.generic(CSS, {attached, floated, icon, tabular}),
        ...classy.valueKeys(CSS, {fixed}),
        classy.width(CSS, widths, 'item'),
  			CSS.menu
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    const children = (!!this.children.length) ?
      [...this.children] : this.renderItems();

		return v(ElementType, rootProps, children);
	}
}
