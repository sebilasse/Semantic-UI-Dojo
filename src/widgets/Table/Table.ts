import { Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, POS, SIZE, ALIGN, NUMBER, COLOR, VERY } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableRow, { TableRowProps } from './TableRow';
import * as CSS from './styles/table.min.css';

/**
 * A table displays a collections of data grouped into rows.
 */
export interface TableProps extends Properties {
  /** Attach table to other content */
  attached?: boolean | keyof typeof POS.TB;
  /** A table can reduce it's complexity to increase readability. */
  basic?: boolean | keyof typeof VERY;
  /** A table may be divided each row into separate cells. */
  celled?: boolean;
  /** A table can be collapsing, taking up only as much space as its rows. */
  collapsing?: boolean;
  /** A table can be given a color to distinguish it from other tables. */
  color?: keyof typeof COLOR;
  /** A table can specify its column count to divide its content evenly. */
  columns?: keyof typeof NUMBER;
  /** A table may sometimes need to be more compact to make more rows visible at a time. */
  compact?: boolean | keyof typeof VERY;
  /** A table may be formatted to emphasize a first column that defines a rows content. */
  definition?: boolean;
  /**
   * A table can use fixed a special faster form of table rendering that does not
   * resize table cells based on content.
   */
  fixed?: boolean;
  /** Shorthand for a TableRow to be placed within Table.Footer. */
  footerRow?: string | TableRowProps;
  /** Shorthand for a TableRow to be placed within Table.Header. */
  headerRow?: string | TableRowProps;
  /** A table\'s colors can be inverted. */
  inverted?: boolean;
  /** A table may sometimes need to be more padded for legibility. */
  padded?: boolean | keyof typeof VERY;
  /** A table can have its rows appear selectable. */
  selectable?: boolean;
  /** A table can specify that it's cell contents should remain on a single line. */
  singleLine?: boolean;
  /** A table can also be small or large. */
  size?: keyof typeof SIZE.TABLE;
  /** A table may allow a user to sort contents by clicking on a table header. */
  sortable?: boolean;
  /** A table can specify how it stacks table content responsively. */
  stackable?: boolean;
  /** A table can stripe alternate rows of content with a darker color
   * to increase contrast. */
  striped?: boolean;
  /** A table can be formatted to display complex structured data. */
  structured?: boolean;
  /** Data to be passed to the renderBodyRow function.'], /* TODO */
  tableData?: any;
/* TODO FIXME
  customPropTypes.every([
    customPropTypes.disallow(['children']),
    customPropTypes.demand(['renderBodyRow']),
    PropTypes.array,
  ]),
*/
  /** A table can adjust its text alignment. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** A table can specify how it stacks table content responsively. */
  unstackable?: boolean;
  /** A table can adjust its text alignment. */
  verticalAlign?: keyof typeof ALIGN.V;
  /**
   * Mapped over `tableData` and should return shorthand for each Table.Row to be placed within Table.Body.
   *
   * @param {*} data - An element in the `tableData` array.
   * @param {number} index - The index of the current element in `tableData`.
   * @returns {*} Shorthand for a Table.Row.
   */
  renderBodyRow?: (data: any, index: number) => any;
  /* TODO
    customPropTypes.every([
      customPropTypes.disallow(['children']),
      customPropTypes.demand(['tableData']),
      PropTypes.func,
    ]),
  */
}

@theme(CSS)
export default class Table extends Base<TableProps> {
  static meta = {
    title: 'Table',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  static Body = TableBody;
  static Cell = TableCell;
  static Footer = TableFooter;
  static Header = TableHeader;
  static HeaderCell = TableHeaderCell;
  static Row = TableRow;

	render() {
		const {
      color, size,
      celled, collapsing, definition, fixed, inverted, selectable, singleLine,
      sortable, stackable, striped, structured, unstackable,
      attached, basic, compact, padded,
      textAlign, verticalAlign, columns,
      headerRow = null, tableData = [], renderBodyRow = null, footerRow = null,
	    className = null, ...rest
		} = this.properties;

		let children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {
          celled, collapsing, definition, fixed, inverted, selectable, singleLine,
          sortable, stackable, striped, structured, unstackable
        }),
        ...classy.generic(CSS, {attached, basic, compact, padded}),
        ...classy.textAlign(CSS, {textAlign}),
        ...classy.verticalAlign(CSS, {verticalAlign}),
        classy.width(CSS, {column: columns}),
  			CSS.table
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }
    const headerChildren = (!headerRow) ? [] : [
      TableRow.create(headerRow, { defaultProps: { cellAs: 'th' } })
    ];
    const bodyChildren = (!renderBodyRow) ? [] : tableData.map(
      (data: any, index: number) => TableRow.create(renderBodyRow(data, index))
    );
    const footerChildren = (!footerRow) ? [] : [
      TableRow.create(footerRow)
    ];
    children = [
      (headerRow) ? w(TableHeader, {}, headerChildren) : null,
      w(TableBody, {}, bodyChildren),
      (footerRow) ? w(TableFooter, {}, footerChildren) : null,
    ];
		return v(ElementType, rootProps, children);
	}
}
