import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/divider.min.css';

/**
 * A divider visually segments content into groups.
 */
export interface DividerProps extends Properties {
  /** Divider can clear the content above it. */
  clearing?: boolean;
  /** Divider can be fitted without any space above or below it. */
  fitted?: boolean;
  /** Divider can divide content without creating a dividing line. */
  hidden?: boolean;
  /** Divider can segment content horizontally. */
  horizontal?: boolean;
  /** Divider can have it's colours inverted. */
  inverted?: boolean;
  /** Divider can provide greater margins to divide sections of content. */
  section?: boolean;
  /** Divider can segment content vertically. */
  vertical?: boolean;
}

@theme(CSS)
export default class Divider extends Base<DividerProps> {
  static meta = {
    title: 'Divider',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      clearing, fitted, hidden, horizontal, inverted, section, vertical,
      className = null, ...rest
		} = this.properties;
    const ElementType = getElementType(this, this.properties);

    const rootProps = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.keys(CSS, {clearing, fitted, hidden, horizontal, inverted, section, vertical}),
      CSS.divider
    ).fixed(...this.fixed)}

		return v(ElementType, rootProps, this.children);
	}
}
