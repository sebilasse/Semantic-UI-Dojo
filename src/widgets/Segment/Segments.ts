import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Segment, { SegmentProps } from './Segment';
import * as CSS from './styles/segment.min.css';

/**
 * Segments can be grouped.
 */
export interface SegmentsProps extends Properties {
  /** A segment may take up only as much space as is necessary. */
  compact: boolean;
  /** Formats content to be aligned horizontally. */
  horizontal: boolean;
  /** Shorthand array of props for Segment. */
  items?: (string | SegmentProps)[];
  /** Formatted to look like a pile of pages. */
  piled: boolean;
  /** A segment group may be formatted to raise above the page. */
  raised: boolean;
  /** A group of segments can can have different sizes. */
  size: keyof typeof SIZE.NO_MEDIUM;
  /** Formatted to show it contains multiple pages. */
  stacked: boolean;
}

@theme(CSS)
export default class Segments extends Base<SegmentsProps> {
  static meta = {
    title: 'Segments',
    collection: 'Segment',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      size,
      compact, horizontal, piled, raised, stacked,
      items = [], className = null, ...rest
    } = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {size}),
        ...classy.keys(CSS, {compact, horizontal, piled, raised, stacked}),
  			CSS.segments
      ).fixed(...this.fixed)
		}
    if (!!children.length) { return v(ElementType, props, children) }
    const content = mapItems(items, Segment);
		return v(ElementType, props, content);
	}
}
