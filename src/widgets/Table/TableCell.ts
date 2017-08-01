import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, ALIGN, NUMBER } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import * as CSS from './styles/table.min.css';

/**
 * A table row can have cells.
 */
export interface TableCellProps extends Properties {
  /** A cell can be active or selected by a user. */
  active?: boolean;
  /** A cell can be collapsing so that it only uses as much space as required. */
  collapsing?: boolean;
  /** A cell can be disabled. */
  disabled?: boolean;
  /** A cell may call attention to an error or a negative value. */
  error?: boolean;
  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon?: (string | IconProps);
  /** A cell may let a user know whether a value is bad. */
  negative?: boolean;
  /** A cell may let a user know whether a value is good. */
  positive?: boolean;
  /** A cell can be selectable. */
  selectable?: boolean;
  /** A cell can specify that it's contents should remain on a single line. */
  singleLine?: boolean;
  /** A table cell can adjust it's text alignment. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** A table cell can adjust it's text alignment. */
  verticalAlign?: keyof typeof ALIGN.V;
  /** A cell may warn a user. */
  warning?: boolean;
  /** A table can specify the width of individual columns independently. */
  width?: keyof typeof NUMBER;
}

@theme(CSS)
export default class Table extends Base<TableCellProps> {
  static meta = {
    title: 'TableCell',
    parent: 'TableRow',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  static defaultProps = { as: 'td' };

	render() {
		const {
      active, collapsing, disabled, error, negative, positive,
      selectable, singleLine, warning,
      textAlign, verticalAlign, width,
	    icon, onClick, content = null, className = null, ...rest
		} = this.properties;

		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        ...classy.keys(CSS, {
          active, collapsing, disabled, error, negative, positive,
          selectable, singleLine, warning
        }),
        ...classy.textAlign(CSS, {textAlign}),
        ...classy.verticalAlign(CSS, {verticalAlign}),
        classy.width(CSS, {wide: width})
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

    if (!!icon) { children.unshift(Icon.create(icon)); }
    children.push(content);

		return v(ElementType, rootProps, children);
	}
}
