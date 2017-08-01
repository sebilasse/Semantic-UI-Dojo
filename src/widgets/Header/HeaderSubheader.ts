import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/header.min.css';
@theme(CSS)
/**
 * Headers may contain subheaders.
 */
export default class HeaderSubheader extends Base {
  static meta = {
		title: 'HeaderSubheader',
    parent: 'HeaderContent',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ATOM,
		description: 'Headers may contain subheaders.'
	}
	rootClasses = [ CSS.sub, CSS.header ];
}
