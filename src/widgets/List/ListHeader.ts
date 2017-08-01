import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/list.min.css';
@theme(CSS)
/**
 * A list item can contain a header.
 */
export default class ListHeader extends Base {
  static meta = {
		title: 'ListHeader',
    parent: 'ListContent',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE,
		description: 'A list item can contain a header.'
	};
	rootClasses = [ CSS.header ];
}
