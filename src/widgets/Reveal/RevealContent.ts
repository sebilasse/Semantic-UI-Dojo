import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/reveal.min.css';

/**
 * The content sub-component for the Reveal.
 */
export interface RevealContentProps extends Properties {
  /** A reveal may contain content that is hidden before user interaction. */
  hidden?: boolean;
  /** A reveal may contain content that is visible before user interaction. */
  visible?: boolean;
}

@theme(CSS)
export default class RevealContent extends Base<RevealContentProps> {
  static meta = {
    title:  'RevealContent',
    parent: 'Reveal',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      hidden, visible, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.keys(CSS, {hidden, visible}),
      CSS.content
    ).fixed(...this.fixed)};

		return v(ElementType, props, this.children);
	}
}
