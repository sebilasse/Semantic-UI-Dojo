import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/list.min.css';
@theme(CSS)
/**
 * A list can contain a sub list.
 */
export default class ListList extends Base {
  static meta = {
		title: 'ListList',
    parent: 'ListContent',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE,
		description: 'A list can contain a sub list.'
	};
	rootClasses = [ CSS.list ];
}
