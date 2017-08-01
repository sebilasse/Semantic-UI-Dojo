import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/item.min.css';
@theme(CSS)
/**
 * An item can contain content metadata.
 */
export default class ItemMeta extends Base {
  static meta = {
		title: 'ItemMeta',
    parent: 'ItemContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'An item can contain content metadata.'
	};
	rootClasses = [ CSS.meta ];
}
