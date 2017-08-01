import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/statistic.min.css';

/**
 * A statistic can contain a numeric, icon, image, or text value.
 */
export interface StatisticValueProps extends Properties {
  /** Format the value with smaller font size to fit nicely beside number values. */
  text?: boolean;
  /**
   * Primary content of the StatisticValue. Mutually exclusive
   * with the children prop.
  */ // TODO
  value?: string | Properties;
}

@theme(CSS)
export default class StatisticValue extends Base<StatisticValueProps> {
  static meta = {
    title: 'StatisticValue',
    parent: 'Statistic',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const { value, text, className = null, ...rest } = this.properties;
		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.keys(CSS, {text}),
  			CSS.value
      ).fixed(...this.fixed)
		}
    if (!children.length && !!value) {
      children.push((typeof value === 'string') ? value : v('span', value))
    }
		return v(ElementType, props, children);
	}
}
