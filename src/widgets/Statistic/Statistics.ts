import uuid from '@dojo/core/uuid';
import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, SIZE, NUMBER } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Statistic, { StatisticProps } from './Statistic';
import * as CSS from './styles/statistic.min.css';

/**
 * Statistics can be grouped.
 */
export interface StatisticsProps extends Properties {
  /** A statistic group can be formatted to different colors. */
  color?: keyof typeof COLOR;
  /** A statistic group can present it's measurement horizontally. */
  horizontal?: boolean;
  /** A statistic group can be formatted to fit on a dark background. */
  inverted?: boolean;
  /** Array of props for Statistic. */
  items?: (string | StatisticProps)[];
  /** A statistic group can vary in size. */
  size?: keyof typeof SIZE.BASIC;
  /** A statistic group can have its items divided evenly. */
  widths?: keyof typeof NUMBER;
  /** Optional key for children */
  childKey?: string;
}

@theme(CSS)
export default class Statistics extends Base<StatisticsProps> {
  static meta = {
    title: 'Statistics',
    collection: 'Statistic',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ORGANISM
  };
	render() {
		const {
      color, size,
      horizontal, inverted,
      widths,
	    childKey = uuid(), items = [], className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);

    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {color, size}),
        ...classy.keys(CSS, {horizontal, inverted}),
        ...classy.width(CSS, widths),
  			CSS.statistics
      ).fixed(...this.fixed)
		}

    if (!!children.length) { return v(ElementType, props, children) }

    const content = items.map((o) => {
      if (typeof o === 'string') { return Statistic.create(o) }
      let sO: any = o; // TODO FIXME
      const key = sO.childKey || [sO.label, sO.title].join('-')
      return Statistic.create({key, ...o})
    });
		return v(ElementType, props, content);
	}
}
