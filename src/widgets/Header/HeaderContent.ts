import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/header.min.css';
@theme(CSS)
/**
 * Header content wraps the main content when there is an adjacent Icon or Image.
 */
export default class HeaderContent extends Base {
  static meta = {
		title: 'HeaderContent',
    parent: 'Header',
		namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE,
		description: 'Header content wraps the main content when there is an adjacent Icon or Image.'
	}
	rootClasses = [ CSS.content ];
}
