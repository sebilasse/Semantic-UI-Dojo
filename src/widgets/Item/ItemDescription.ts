import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/item.min.css';
@theme(CSS)
/**
 * An item can contain a description with a single or multiple paragraphs.
 */
export default class ItemDescription extends Base {
  static meta = {
		title: 'ItemDescription',
    parent: 'ItemContent',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'An item can contain a description with a single or multiple paragraphs.'
	};
	rootClasses = [ CSS.description ];
}
