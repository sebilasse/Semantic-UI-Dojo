import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, NUMBER, DEVICE, ALIGN, POS } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/grid.min.css';

/**
 * The column sub-component for Grid.
 */
export interface GridColumnProps extends Properties {
  /** A grid column can be colored. */
  color?: keyof typeof COLOR;
  /** A column can specify a width for a computer. */
  computer?: NUMBER | keyof typeof NUMBER;
  /** A column can sit flush against the left or right edge of a row. */
  floated?: keyof typeof POS.LR;
  /** A column can specify a width for a large screen device. */
  largeScreen?: NUMBER | keyof typeof NUMBER;
  /** A column can specify a width for a mobile device. */
  mobile?: NUMBER | keyof typeof NUMBER;
  /** A column can appear only for a specific device, or screen sizes. */
  only?: keyof typeof DEVICE;
  /** An can stretch its contents to take up the entire grid or row height. */
  stretched?: boolean;
  /** A column can specify a width for a tablet device. */
  tablet?: NUMBER | keyof typeof NUMBER;
  /** A row can specify its text alignment. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign?: keyof typeof ALIGN.V;
  /** A column can specify a width for a wide screen device. */
  widescreen?: NUMBER | keyof typeof NUMBER;
  /** Represents width of column. */
  width?: NUMBER | keyof typeof NUMBER;
}

const EO = { E: {enum: {equal: 'equal'}} };
const CO = ['{"type":"integer", "minimum":1, "maximum":16}', {enum: NUMBER}, EO.E]; // TODO
@theme(CSS)
export default class GridColumn extends Base<GridColumnProps> {
  static meta = {
    title:  'GridColumn',
    parent: 'Grid',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const {
      stretched,
      color, floated,
      mobile, tablet, computer, largeScreen, widescreen, only,
      textAlign, verticalAlign, width, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			onclick: this.handleClick,
			classes: this.classes(
        ...classy.values(CSS, {color}),
        ...classy.keys(CSS, {stretched}),
        ...classy.only(CSS, only),
        ...classy.textAlign(CSS, {textAlign}),
        ...classy.valueKeys(CSS, {floated}),
        ...classy.verticalAlign(CSS, {verticalAlign}),
        classy.width(CSS, mobile, 'wide mobile'),
        classy.width(CSS, tablet, 'wide tablet'),
        classy.width(CSS, computer, 'wide computer'),
        classy.width(CSS, largeScreen, 'wide large screen'),
        classy.width(CSS, widescreen, 'wide widescreen'),
        classy.width(CSS, width, 'wide'),
  			CSS.column
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    return v(ElementType, rootProps, children)
	}
}
