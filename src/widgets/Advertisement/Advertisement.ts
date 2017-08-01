import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, AD } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/ad.min.css';

/**
 * An ad displays third-party promotional content.
 */
export interface AdProps extends Properties {
  /** Varies the size of the advertisement. */
  unit?: keyof typeof AD;
  /** For Testing: Text to be displayed on the advertisement. */
  test?: boolean | string | number;
  /** Center the advertisement. */
  centered?: boolean;
}

@theme(CSS)
export default class Ad extends Base<AdProps> {
  static meta = {
    title: 'Advertisement',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      centered,
      test, unit, className = null, ...rest
		} = this.properties;
    const ElementType = getElementType(this, this.properties);
    const props: any = {
      ...rest,
      classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {unit}),
        ...classy.keys(CSS, {centered, test}),
        CSS.ad
      ).fixed(...this.fixed)
    }
    if (test === true) {
      props.dataText = !!unit ? `${unit} Advertisement` : 'Test'
    } else {
      props.dataText = ''+test;
    }
		return v(ElementType, props, this.children);
	}
}
