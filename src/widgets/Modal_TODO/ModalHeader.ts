import { META, Base, theme, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/modal.min.css';
@theme(CSS)
/**
 * A modal can contain a header.
 */
export default class ModalHeader extends Base {
  static meta = {
		title: 'ModalHeader',
    parent: 'ModalContent',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM,
		description: 'A modal can contain a header.'
	};
	rootClasses = [ CSS.header ];
  render() {
		const { content = null, className = null, ...rest } = this.properties;
    const ElementType = getElementType(this, this.properties);
    const children = [...this.children];
    const props = {
      ...rest,
			classes: this.classes(CSS.header).fixed(...this.fixed)
		}
		return v(ElementType, props, !!children.length ? [content] : children);
	}
}
