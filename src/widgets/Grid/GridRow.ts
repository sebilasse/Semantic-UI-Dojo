import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, NUMBER, DEVICE, REVERSE, ALIGN } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/grid.min.css';

/**
 * The row sub-component for Grid.
 */
export interface GridRowProps extends Properties {
  /** A row can have its columns centered. */
  centered?: boolean;
  /** A grid row can be colored. */
  color?: keyof typeof COLOR;
  /** Represents column count per line in Row. */
  columns?: NUMBER | keyof typeof NUMBER;
  /** A row can have dividers between its columns. */
  divided?: boolean;
  /** A row can appear only for a specific device, or screen sizes. */
  only?: keyof typeof DEVICE;
  /** A  row can specify that its columns should reverse order at different device sizes. */
  reversed?: keyof typeof REVERSE;
  /** An can stretch its contents to take up the entire column height. */
  stretched?: boolean;
  /** A row can specify its text alignment. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** A row can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign?: keyof typeof ALIGN.V;
}

const EO = { E: {enum: {equal: 'equal'}} };
const CO = ['{"type":"integer", "minimum":1, "maximum":16}', {enum: NUMBER}, EO.E]; // TODO
@theme(CSS)
export default class GridRow extends Base<GridRowProps> {
  static meta = {
    title: 'GridRow',
    parent: 'Grid',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      color,
      centered, stretched, divided,
      columns, reversed,
      textAlign, verticalAlign,
      className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			onclick: this.handleClick,
			classes: this.classes(
        ...classy.values(CSS, {color}),
        ...classy.keys(CSS, {centered, stretched, divided}),
        ...classy.textAlign(CSS, {textAlign}),
        ...classy.valueKeys(CSS, {reversed}),
        ...classy.verticalAlign(CSS, {verticalAlign}),
        classy.width(CSS, columns, 'column', true),
  			CSS.row
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    return v(ElementType, rootProps, children)
	}
}
