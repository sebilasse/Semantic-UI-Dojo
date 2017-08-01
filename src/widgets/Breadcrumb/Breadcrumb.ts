import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import BreadcrumbDivider, { BreadcrumbDividerProps } from './BreadcrumbDivider';
import BreadcrumbSection, { BreadcrumbSectionProps } from './BreadcrumbSection';
import * as CSS from './styles/breadcrumb.min.css';

/**
 * A breadcrumb is used to show hierarchy between content.
 */
export interface BreadcrumbProps extends Properties {
  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider?: string | BreadcrumbDividerProps;
  /** For use with the sections prop. Render as an `Icon` component with
   * `divider` class instead of a `div` in Breadcrumb.Divider.
  */
  icon?: string | IconProps;
  /** Shorthand array of props for Breadcrumb.Section. */
  sections?: (string | BreadcrumbSectionProps)[];
  /** Size of Breadcrumb. */
  size?: keyof typeof SIZE;
}

@theme(CSS)
export default class Breadcrumb extends Base<BreadcrumbProps> {
  static meta = {
    title: 'Breadcrumb',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  static Divider = BreadcrumbDivider;
  static Section = BreadcrumbSection;

	render() {
		const {
      divider, sections = [], icon, size,
      className = null, ...rest
		} = this.properties;

		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {size}),
  			CSS.breadcrumb
      ).fixed(...this.fixed)
		}

    if (!!children.length) { return v(ElementType, props, children) }
    sections.forEach((section: any, index: number) => {
      // section
      const breadcrumbElement: any = BreadcrumbSection.create(section);
      children.push(breadcrumbElement);
      // divider
      if (index !== sections.length - 1) {
        const key = `${breadcrumbElement.key}_divider` || JSON.stringify(section)
        children.push(BreadcrumbDivider.create({ content: divider, icon, key }))
      }
    });
		return v(ElementType, props, children);
	}
}
