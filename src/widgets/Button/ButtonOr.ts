import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/button.min.css';

/**
 * Button groups can contain conditionals.
 */
export interface ButtonOrProps extends Properties {
  /** "Or buttons" can have their text localized,
   * or adjusted by using the text prop.
  */
  text?: number | string;
}

@theme(CSS)
export default class ButtonOr extends Base<ButtonOrProps> {
  static meta = {
    title: 'ButtonOr',
    parent: 'ButtonContent',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const { text = null, className = null, ...rest } = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props: any = {
      ...rest,
      classes: this.classes(CSS.or).fixed(...this.fixed)
    };
    if (!!text) { props.dataText = ''+text }
		return v(ElementType, props, this.children);
	}
}
