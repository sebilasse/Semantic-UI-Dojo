import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/modal.min.css';
@theme(CSS)
/**
 * A modal can contain a description with one or more paragraphs.
 */
export default class ModalDescription extends Base {
  static meta = {
		title: 'ModalDescription',
    parent: 'ModalContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE,
		description: 'A modal can contain a description with one or more paragraphs.'
	};
	rootClasses = [ CSS.description ];
}
