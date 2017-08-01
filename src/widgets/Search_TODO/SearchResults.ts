import { META, Properties, Base, theme } from '../../lib/main';
import * as CSS from './styles/search.min.css';

@theme(CSS)
/**
 * An internal results sub-component for Search component
 */
export default class SearchResults extends Base<Properties> {
	static meta = {
		title: 'SearchResults',
    parent: 'Search',
		namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.MOLECULE,
		description: 'An internal results sub-component for Search component'
	};
  rootClasses = [ 'results', 'transition' ];
}
