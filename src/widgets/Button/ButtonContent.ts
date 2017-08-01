import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/button.min.css';

/**
 * Used in some Button types, such as `animated`.
 */
export interface ButtonContentProps extends Properties {
  /** A button may contain content that is initially hidden / visible on hover. */
  hidden?: boolean;
  /** A reveal may contain content that is initially visible / hidden on hover. */
  visible?: boolean;
}

@theme(CSS)
export default class ButtonContent extends Base<ButtonContentProps> {
  static meta = {
    title: 'ButtonContent',
    parent: 'Button',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      hidden, visible, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props = {...rest, classes: this.classes(
      ...classy.keys(CSS, {hidden, visible}),
      CSS.content
    ).fixed(...this.fixed)};

		return v(ElementType, props, this.children);
	}
}
