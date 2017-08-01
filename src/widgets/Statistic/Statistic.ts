import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, POS, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import StatisticLabel, { StatisticLabelProps } from './StatisticLabel';
import StatisticValue, { StatisticValueProps } from './StatisticValue';
import Statistics from './Statistics';
import * as CSS from './styles/statistic.min.css';

/**
 * A statistic emphasizes the current value of an attribute.
 */
export interface StatisticProps extends Properties {
  /** A statistic can be formatted to be different colors. */
  color?: keyof typeof COLOR;
  /** A statistic can sit to the left or right of other content. */
  floated?: keyof typeof POS.LR;
  /** A statistic can present its measurement horizontally. */
  horizontal?: boolean;
  /** A statistic can be formatted to fit on a dark background. */
  inverted?: boolean;
  /** Label content of the Statistic. */
  label?: string | StatisticLabelProps;
  /** A statistic can vary in size. */
  size?: keyof typeof SIZE.BASIC;
  /** Format the StatisticValue with smaller font size to fit nicely beside number values. */
  text?: boolean;
  /** Value content of the Statistic. */
  value?: string | StatisticValueProps;
  /** Optional key for children */
  childKey?: string;
}

@theme(CSS)
export default class Statistic extends Base<StatisticProps> {
  static meta = {
    title: 'Statistic',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
  static Group = Statistics;
  static Label = StatisticLabel;
  static Value = StatisticValue;

	render() {
		const {
      label, value,
      horizontal, inverted, text,
      color, floated, size,
	    className = null, ...rest
		} = this.properties;

		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {horizontal, inverted}),
  			CSS.statistic
      ).fixed(...this.fixed)
		}
    const rootProps = {...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }
    if (!!text || !!value) {
			children.unshift(StatisticValue.create({text, value}));
		}
    if (!!label) {
      children.push(StatisticLabel.create({label}));
    }

		return v(ElementType, rootProps, children);
	}
}
