import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Step, { StepProps } from './Step';
import * as CSS from './styles/step.min.css';

/**
 * A set of steps.
 */
export interface StepsProps extends Properties {
  /** A fluid step takes up the width of its container. */
  fluid?: boolean;
  /** Shorthand array of props for Step. */
  items?: (string | StepProps)[];
  /** A step can show a ordered sequence of steps. */
  ordered?: boolean;
  /** Steps can have different sizes. */
  size?: keyof typeof SIZE.BASIC;
  /** A step can stack vertically only on smaller screens. */
  stackable?: boolean | 'tablet';
  /** A step can be displayed stacked vertically. */
  vertical?: boolean;
}

@theme(CSS)
export default class Steps extends Base<StepsProps> {
  static meta = {
    title: 'Steps',
    collection: 'Step',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      fluid, ordered, vertical,
      size, items = [],
	    className = null, ...rest
		} = this.properties;
    let { stackable } = this.properties;
    if (stackable === true) { stackable = 'tablet'}

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {size}),
        ...classy.keys(CSS, {fluid, ordered, vertical}),
        ...classy.valueKeys(CSS, {stackable}),
  			CSS.steps
      ).fixed(...this.fixed)
		}
    if (!!children.length) { return v(ElementType, props, children) }
    const content = mapItems(items, Step);
		return v(ElementType, props, content);
	}
}
