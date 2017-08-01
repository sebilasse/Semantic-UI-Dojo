import { META, Properties, Base, theme, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/statistic.min.css';

/**
 * A statistic can contain a label to help provide context for the presented value.
 */
export interface StatisticLabelProps extends Properties {
  label?: string | Properties;
}

@theme(CSS)
export default class StatisticLabel extends Base<StatisticLabelProps> {
  static meta = {
    title: 'StatisticLabel',
    parent: 'Statistic',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
  };
  render() {
		const { label = null, className = null, ...rest } = this.properties;

		const children = [...this.children];
    if (!children.length) {
      children.push((typeof label === 'string') ? label : v('span', label || {}))
    }

    const ElementType = getElementType(this, this.properties);
    const props = { ...rest, classes: this.classes(CSS.label).fixed(...this.fixed) }
		return v(ElementType, props, children);
	}
}
