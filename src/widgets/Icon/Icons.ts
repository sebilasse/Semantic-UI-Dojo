import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from './Icon';
import * as CSS from './styles/icon.min.css';

/**
 * Icons can be grouped.
 */
export interface IconsProps extends Properties {
  /** Shorthand array of props for Icon. */
  items?: (string | IconProps)[];
  /** A group of icons can be formatted to have the same size. */
  size?: keyof typeof SIZE.NO_MEDIUM;
}

@theme(CSS)
export default class Icons extends Base<IconsProps> {
  static meta = {
    title:  'Icons',
    collection: 'Icon',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const { size, items = [], className = null, ...rest } = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, {as: 'i', ...this.properties});
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.values(CSS, {size}),
  			CSS.icons
      ).fixed(...this.fixed)
		}
    if (!!children.length) { return v(ElementType, props, children) }
    const content = mapItems(items, Icon);
		return v(ElementType, props, content);
	}
}
