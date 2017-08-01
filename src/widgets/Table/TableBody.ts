import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/table.min.css';
@theme(CSS)
/**
 * The table body.
 */
export default class TableBody extends Base {
  static meta = {
		title: 'TableBody',
    parent: 'Table',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE,
		description: 'A table body.'
	};
	rootClasses = [ ];
  defaultProps = { as: 'tbody' }
}
