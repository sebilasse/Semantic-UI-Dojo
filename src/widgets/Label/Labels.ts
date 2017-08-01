import { Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import { META, COLOR, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Label, { LabelProps } from './Label';
import * as CSS from './styles/label.min.css';

/**
 * Labels can be grouped.
 */
export interface LabelsProps extends Properties {
  /** Labels can share shapes. */
  circular?: boolean;
  /** A group of labels can share colors together. */
  color?: keyof typeof COLOR;
  /** Shorthand array of props for Label. */
  items?: (string | LabelProps)[];
  /** A group of labels can share sizes together. */
  size?: keyof typeof SIZE.ALL;
  /** A group of labels can share tag formatting. */
  tag?: boolean;
}

@theme(CSS)
export default class Labels extends Base<LabelsProps> {
  static meta = {
    title:  'Labels',
    collection: 'Label',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      color, size,
      circular, tag,
      items = [], className = null, ...rest
    } = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {circular, tag}),
  			CSS.labels
      ).fixed(...this.fixed)
		}
    if (!!children.length) { return v(ElementType, props, children) }
    const content = mapItems(items, Label);
		return v(ElementType, props, content);
	}
}
