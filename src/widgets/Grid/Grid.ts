import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, NUMBER, CONTAINER, REVERSE, POS, ALIGN, VERY } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/grid.min.css';
import * as containerCSS from './styles/container.min.css';
import GridColumn from './GridColumn';
import GridRow from './GridRow';

/**
 * A grid is used to harmonize negative space in a layout.
 */
export interface GridProps extends Properties {
  /** A grid can have rows divided into cells. */
  celled?: boolean | 'internally';
  /** A Grid can have its columns centered. */
  centered?: boolean;
  /** Represents column count per row in Grid. */
  columns?: NUMBER | keyof typeof NUMBER | 'equal';
  /** A grid can be combined with a container to use the available layout and alignment. */
  container?: boolean | keyof typeof CONTAINER;
  /** A grid can have dividers between its columns. */
  divided?: boolean | 'vertically';
  /** A grid can double its column width on tablet and mobile sizes. */
  doubling?: boolean;
  /** A grid's colors can be inverted. */
  inverted?: boolean;
  /** A grid can preserve its vertical and horizontal gutters on first and last columns. */
  padded?: boolean | keyof typeof POS.HV;
  /** A grid can increase its gutters to allow for more negative space. */
  relaxed?: boolean | keyof typeof VERY;
  /** A grid can specify that its columns should reverse order at different device sizes. */
  reversed?: keyof typeof REVERSE;
  /** A grid can have its columns stack on-top of each other after reaching mobile breakpoints. */
  stackable?: boolean;
  /** A grid can stretch its contents to take up the entire grid height. */
  stretched?: boolean;
  /** A grid can specify its text alignment. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** A grid can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign?: keyof typeof ALIGN.V;
}

const EO = {
  I: {enum: {internally: 'internally'}}, E: {enum: {equal: 'equal'}},
  V: {enum: {vertically: 'vertically'}}
};
const CO = ['{"type":"integer", "minimum":1, "maximum":16}', {enum: NUMBER}, EO.E];

@theme(CSS)
@theme(containerCSS)
export default class Grid extends Base<GridProps> {
  static meta = {
    title: 'Grid',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.ORGANISM
  };
  static Column = GridColumn;
  static Row = GridRow;

	render() {
		const {
      centered, container, doubling, inverted, stackable, stretched,
      celled, divided, padded, relaxed,
      textAlign, verticalAlign, reversed,
	    columns, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {centered, doubling, inverted, stackable, stretched}),
        ...classy.generic(CSS, {celled, divided, padded, relaxed}),
        ...classy.textAlign(CSS, {textAlign}),
        ...classy.valueKeys(CSS, {reversed}),
        ...classy.verticalAlign(CSS, {verticalAlign}),
        classy.width(CSS, columns, 'column', true),
  			CSS.grid,
        ...classy.generic(containerCSS, {container})
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    return v(ElementType, rootProps, children)
	}
}
