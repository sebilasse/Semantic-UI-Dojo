import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/table.min.css';
@theme(CSS)
/**
 * A table can have a footer.
 */
export default class TableFooter extends Base {
  static meta = {
		title: 'TableFooter',
    parent: 'Table',
		namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ATOM,
		description: 'A table can have a footer.'
	};
	rootClasses = [];
  defaultProps = { as: 'tfoot' }
}
