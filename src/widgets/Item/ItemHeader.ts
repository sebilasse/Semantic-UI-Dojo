import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/item.min.css';
@theme(CSS)
/**
 * An item can contain a header.
 */
export default class ItemHeader extends Base {
  static meta = {
		title: 'ItemHeader',
    parent: 'ItemContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'An item can contain a header.'
	};
	rootClasses = [ CSS.header ];
}
