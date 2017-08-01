import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, SIZE, POS } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/loader.min.css';

/**
 * A loader alerts a user to wait for an activity to complete.
 * @see Dimmer
 */
export interface LoaderProps extends Properties {
  /** A loader can be active or visible. */
  active?: boolean;
  /** A loader can be disabled or hidden. */
  disabled?: boolean;
  /** A loader can show it's unsure of how long a task will take. */
  indeterminate?: boolean;
  /** Loaders can appear inline with content. */
  inline?: boolean | keyof typeof POS.CENTERED;
  /** Loaders can have their colors inverted. */
  inverted?: boolean;
  /** Loaders can have different sizes. */
  size?: keyof typeof SIZE.ALL;
}

@theme(CSS)
export default class Loader extends Base<LoaderProps> {
  static meta = {
    title:  'Loader',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      active, disabled, indeterminate, inverted,
      inline, size, content = null, className = null, ...rest
		} = this.properties;
    const ElementType = getElementType(this, this.properties);

    const rootProps = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.values(CSS, {size}),
      ...classy.keys(CSS, {active, disabled, indeterminate, inverted}),
      (this.children || content) ? CSS.text : null,
      ...classy.generic(CSS, {inline}),
      CSS.loader
    ).fixed(...this.fixed)}

    const children = !this.children.length ? [content] : this.children;
		return v(ElementType, rootProps, children);
	}
}
