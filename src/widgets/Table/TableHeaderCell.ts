import { Properties, Base, theme, classy } from '../../lib/main';
import { META, SORT } from '../../lib/SUI';
import * as CSS from './styles/table.min.css';

/**
 * A table can have a header cell.
 */
export interface TableHeaderCellProps extends Properties {
  /** A header cell can be sorted in ascending or descending order. */
  sorted?: keyof typeof SORT;
}

@theme(CSS)
export default class TableHeaderCell extends Base<TableHeaderCellProps> {
  static meta = {
    title: 'TableHeaderCell',
    parent: 'TableHeader',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ATOM
  };
	rootClasses = () =>
    [this.classes( ...classy.valueKeys(CSS, {sorted: this.properties.sorted}))];
  defaultProps = { as: 'th' }
}
