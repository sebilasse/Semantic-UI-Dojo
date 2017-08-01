import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, ANIM } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import RevealContent from './RevealContent';
import * as CSS from './styles/reveal.min.css';

/**
 * A reveal displays additional content in place of previous content when activated.
 */
export interface RevealProps extends Properties {
  /** An active reveal displays its hidden content. */
  active?: boolean;
  /** An animation name that will be applied to Reveal. */
  animated?: keyof typeof ANIM.ALL;
  /** A disabled reveal will not animate when hovered. */
  disabled?: boolean;
  /** An element can show its content without delay. */
  instant?: boolean;
}

@theme(CSS)
export default class Reveal extends Base<RevealProps> {
  static meta = {
    title: 'Reveal',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  static Content = RevealContent;

	render() {
		const {
      active, disabled, instant,
      animated, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.values(CSS, {animated}),
      ...classy.keys(CSS, {active, disabled, instant}),
      CSS.reveal
    ).fixed(...this.fixed)};

		return v(ElementType, props, this.children);
	}
}
