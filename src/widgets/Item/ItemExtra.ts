import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/item.min.css';
@theme(CSS)
/**
 * An item can contain extra content meant to be formatted separately from the main content.
 */
export default class ItemExtra extends Base {
  static meta = {
		title: 'ItemExtra',
    parent: 'ItemContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE,
		description: `An item can contain extra content meant to be formatted
    separately from the main content.`
	};
	rootClasses = [ CSS.meta ];
}
