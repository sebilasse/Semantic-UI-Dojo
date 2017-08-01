import { Properties, Base, META, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/breadcrumb.min.CSS';

/**
 * The section sub-component for Breadcrumb component.
 */
export interface BreadcrumbSectionProps extends Properties {
  /** Style as the currently active section. */
  active?: boolean;
  /** Render as an `a` tag instead of a `div` and add the href attribute. */
  href?: string;
  /** Render as an `a` tag instead of a `div` */
  link?: boolean;
  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: BreadcrumbSectionProps) => void;
}

@theme(CSS)
export default class BreadcrumbSection extends Base<BreadcrumbSectionProps> {
  static meta = {
    title: 'BreadcrumbSection',
    parent: 'Breadcrumb',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      active, href = null, link = false, onClick = null,
      content = null, className = null, ...rest
    } = this.properties;
		const children = [...this.children];
    const ElementType = getElementType(this, this.properties, () => (link||onClick) ? 'a' : 'div');
    const props = {
      ...rest,
			href: href,
			onclick: this.handleClick,
			classes: this.classes(
        ...classy.keys(CSS, {active}),
        CSS.section
      ).fixed(...this.fixed)
		}
    return v(ElementType, props, (!!children.length) ? children : [content])
	}
}
