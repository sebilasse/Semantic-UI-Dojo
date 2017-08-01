import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/dimmer.min.css';

export interface DimmerDimmableProps extends Properties {
  /** A dimmable element can blur its contents. */
  blurring: boolean;
  /** Controls whether or not the dim is displayed. */
  dimmed: boolean;
}

@theme(CSS)
/**
 * A dimmable sub-component for Dimmer.
 */
export default class DimmerDimmable extends Base<DimmerDimmableProps> {
  static meta = {
    title:  'DimmerDimmable',
    parent: 'Dimmer',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const { blurring, dimmed, className = null, ...rest } = this.properties;
		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.keys(CSS, {blurring, dimmed}),
  			CSS.dimmable
      ).fixed(...this.fixed)
		}
    return v(ElementType, props, children);
  }
}
