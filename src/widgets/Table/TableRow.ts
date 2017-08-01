import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, ALIGN } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import TableCell, { TableCellProps } from './TableCell';
import * as CSS from './styles/table.min.css';

/**
 * A table can have rows.
 */
export interface TableRowProps extends Properties {
  /** A row can be active or selected by a user. */
  active?: boolean;
  /** An element type to render as (string or function). */
  cellAs?: any; // TODO
  /** Shorthand array of props for TableCell. */
  cells?: (string | TableCellProps)[];
  /** A row can be disabled. */
  disabled?: boolean;
  /** A row may call attention to an error or a negative value. */
  error?: boolean;
  /** A row may let a user know whether a value is bad. */
  negative?: boolean;
  /** A row may let a user know whether a value is good. */
  positive?: boolean;
  /** A table row can adjust it's text alignment. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** A table row can adjust it's text alignment. */
  verticalAlign?: keyof typeof ALIGN.V;
  /** A row may warn a user. */
  warning?: boolean;
}

@theme(CSS)
export default class TableRow extends Base<TableRowProps> {
  static meta = {
    title: 'TableRow',
    parent: 'Table',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  static defaultProps = { as: 'tr', cellAs: 'td' }

	render() {
		const {
      active, disabled, error, negative, positive, warning,
      cellAs = TableRow.defaultProps.cellAs, cells = [],
	    textAlign, verticalAlign, className = null, ...rest
		} = this.properties;

    let children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        ...classy.keys(CSS, {active, disabled, error, negative, positive, warning}),
        ...classy.textAlign(CSS, {textAlign}),
        ...classy.verticalAlign(CSS, {verticalAlign})
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }
    children = cells.map((cell) => TableCell.create(cell, {
      defaultProps: { as: cellAs }
    }));

		return v(ElementType, rootProps, children);
	}
}
