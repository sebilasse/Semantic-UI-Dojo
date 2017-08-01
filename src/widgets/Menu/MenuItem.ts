import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, POS } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import * as CSS from './styles/menu.min.CSS';
// TODO FIXME :
//import { startCase } from '../../../util/string/main';

/**
 * A menu can contain an item.
 */
export interface MenuItemProps extends Properties {
  /** A menu item can be active. */
  active?: boolean;
  /** Additional colors can be specified. */
  color?: keyof typeof COLOR;
  /** A menu item can be disabled. */
  disabled?: boolean;
  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted?: boolean | keyof typeof POS.HV;
  /** A menu item may include a header or may itself be a header. */
  header?: boolean;
  /** MenuItem can be only icon. */
  icon?: boolean | string | IconProps;
  /** MenuItem index inside Menu. */
  index?: number;
  /** A menu item can be link. */
  link?: boolean;
  /** Internal name of the MenuItem. */
  name?: string;
  /** A menu item can take right position. */
  position?: 'right';
  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: MenuItemProps) => void;
}

@theme(CSS)
export default class MenuItem extends Base<MenuItemProps> {
  static meta = {
    title:  'MenuItem',
    parent: 'Menu',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      color, position,
      active, disabled, icon, header, link,
      fitted,
	    onClick, content = null, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const children = [...this.children];

    const props = {
			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, position}),
        ...classy.keys(CSS, {
          active, disabled,
          icon: (icon === true || icon && !(name || content)) ? 'icon' : false,
          header, link
        }),
        ...classy.generic(CSS, {fitted}),
  			CSS.item
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props};
    if (!!children.length) { return v(ElementType, rootProps, children) }
    !!icon && children.push(Icon.create(icon));
    // TODO FIXME :
    children.push(content /*|| startCase(name)*/);

		return v(ElementType, rootProps, children);
	}
}
