import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/modal.min.css';

/**
 * A modal can contain content.
 */
export interface ModalContentProps extends Properties {
  /** A modal can contain image content.', T.B]  */
  image: boolean; /* TODO FIXME RNode ? */
}

@theme(CSS)
export default class ModalContent extends Base<ModalContentProps> {
  static meta = {
    title:  'ModalContent',
    parent: 'Modal',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM
  };
	render() {
		const {
      image,
      content = null, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const children = [...this.children];
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.keys(CSS, {image}),
  			CSS.content
      ).fixed(...this.fixed)
		}
		return v(ElementType, props, !!children.length ? [content] : children);
	}
}
