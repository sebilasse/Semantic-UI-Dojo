import { Properties, Base, META, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import * as CSS from './styles/breadcrumb.min.css';

/**
 * The divider sub-component for Breadcrumb component.
 */
export interface BreadcrumbDividerProps extends Properties {
  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon?: string | IconProps;
}

@theme(CSS)
export default class BreadcrumbDivider extends Base<BreadcrumbDividerProps> {
  static meta = {
    title: 'BreadcrumbDivider',
    parent: 'Breadcrumb',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const { icon, content = null, className = null, ...rest } = this.properties;
		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(CSS.divider).fixed(...this.fixed)
		}
    if (!!icon) { children.push(Icon.create(icon, { defaultProps: props })) }
    if (!!content) { return v(ElementType, props, [content]) }
    return v(ElementType, props, children)
	}
}
