import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, POS, COLOR, SIZE, ALIGN, VERY } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/segment.min.css';

/**
 * A segment is used to create a grouping of related content.
 */
export interface SegmentProps extends Properties {
  /** Attach segment to other content, like a header. */
  attached?: boolean | keyof typeof POS.TB;
  /** A basic segment has no special formatting. */
  basic?: boolean;
  /** A segment can be circular. */
  circular?: boolean;
  /** A segment can clear floated content. */
  clearing?: boolean;
  /** Segment can be colored. */
  color?: keyof typeof COLOR;
  /** A segment may take up only as much space as is necessary. */
  compact?: boolean;
  /** A segment may show its content is disabled. */
  disabled?: boolean;
  /** Segment content can be floated to the left or right. */
  floated?: keyof typeof POS.LR;
  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean;
  /** A segment may show its content is being loaded. */
  loading?: boolean;
  /** A segment can increase its padding. */
  padded?: boolean | keyof typeof VERY;
  /** Formatted to look like a pile of pages. */
  piled?: boolean;
  /** A segment may be formatted to raise above the page. */
  raised?: boolean;
  /** A segment can be formatted to appear less noticeable. */
  secondary?: boolean;
  /** A segment can have different sizes. */
  size?: keyof typeof SIZE.NO_MEDIUM;
  /** Formatted to show it contains multiple pages. */
  stacked?: boolean;
  /** A segment can be formatted to appear even less noticeable. */
  tertiary?: boolean;
  /** Formats content to be aligned as part of a vertical group. */
  textAlign?: keyof typeof ALIGN.TEXT;
  /** Formats content to be aligned vertically. */
  vertical?: boolean;
}

@theme(CSS)
export default class Segment extends Base<SegmentProps> {
  static meta = {
    title: 'Segment',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      color, size,
      basic, circular, clearing, compact, disabled,
      inverted, loading, piled, raised, secondary, stacked, tertiary, vertical,
      attached, padded, floated, textAlign,
      className = null, ...rest
		} = this.properties;
    const ElementType = getElementType(this, this.properties);

    const props = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.values(CSS, {color, size}),
      ...classy.keys(CSS, {basic, circular, clearing, compact, disabled,
        inverted, loading, piled, raised, secondary, stacked, tertiary, vertical}),
      ...classy.generic(CSS, {attached, padded}),
      ...classy.textAlign(CSS, {textAlign}),
      ...classy.generic(CSS, {floated}),
      CSS.segment
    ).fixed(...this.fixed)}

		return v(ElementType, props, this.children);
	}
}
