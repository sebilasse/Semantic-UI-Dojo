import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/sidebar.min.css';
@theme(CSS)
/**
 * A pushable sub-component for Sidebar.
 */
export default class SidebarPushable extends Base {
  static meta = {
		title: 'SidebarPushable',
    parent: 'Sidebar',
		namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM,
		description: 'A pushable sub-component for Sidebar.'
	}
	rootClasses = [ CSS.pushable ];
}
