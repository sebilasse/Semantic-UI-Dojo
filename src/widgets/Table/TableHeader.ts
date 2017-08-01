import { META, Properties, Base, theme, classy } from '../../lib/main';
import * as CSS from './styles/table.min.css';

/**
 * A table can have a header.
 */
export interface TableHeaderProps extends Properties {
  /**
   * A definition table can have a full width header or footer,
   * filling in the gap left by the first column.
  */
  fullWidth?: boolean;
}

@theme(CSS)
export default class TableHeader extends Base<TableHeaderProps> {
  static meta = {
    title: 'TableHeader',
    parent: 'Table',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ATOM
  };
  rootClasses = () =>
    [ this.classes(...classy.keys(CSS, {'full-width': this.properties.fullWidth})) ];
  defaultProps = { as: 'thead' }
}
