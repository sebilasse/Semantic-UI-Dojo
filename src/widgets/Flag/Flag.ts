import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/flag.min.css';

/**
 * A flag is is used to represent a political state.
 */
export interface FlagProps extends Properties {
  /** Flag name, can use the two digit country code, the full name, or a common alias. */
  name?: string;
}

// TODO Names / suggest

@theme(CSS)
export default class Flag extends Base<FlagProps> {
  static meta = {
    title: 'Flag',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  /* TODO - suggest names ... */

	render() {
		const { name, className = null, ...rest } = this.properties;

    const ElementType = getElementType(this, {as: 'i', ...this.properties});
    const props = {...rest, classes: this.classes(
      ...classy.values(CSS, {name}),
      CSS.flag
    ).fixed(...this.fixed)}

		return v(ElementType, props);
	}
}
