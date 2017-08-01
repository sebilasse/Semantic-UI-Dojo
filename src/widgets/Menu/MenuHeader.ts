import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/menu.min.css';
@theme(CSS)
/**
 * A menu item may include a header or may itself be a header.
 */
export default class MenuHeader extends Base {
  static meta = {
		title: 'MenuHeader',
    parent: 'Menu',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE,
		description: 'A menu item may include a header or may itself be a header.'
	}
	rootClasses = [ CSS.header ];
}
