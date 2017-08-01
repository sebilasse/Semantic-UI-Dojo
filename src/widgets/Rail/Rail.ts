import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, POS, SIZE, VERY } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/rail.min.css';

/**
 * A rail is used to show accompanying content outside the boundaries of the main view of a site.
 */
export interface RailProps extends Properties {
  /** A rail can appear attached to the main viewport. */
  attached?: boolean;
  /** A rail can appear closer to the main viewport. */
  close?: boolean | keyof typeof VERY;
  /** A rail can create a division between itself and a container. */
  dividing?: boolean;
  /** A rail can attach itself to the inside of a container. */
  internal?: boolean;
  /** A rail can be presented on the left or right side of a container. */
  position?: keyof typeof POS.LR;
  /** A rail can have different sizes. */
  size?: keyof typeof SIZE.NO_MEDIUM;
}

@theme(CSS)
export default class Rail extends Base<RailProps> {
  static meta = {
    title: 'Rail',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE
  };
	render() {
		const {
      attached, close, dividing, internal,
      position, size,
      className = null, ...rest
		} = this.properties;
    const ElementType = getElementType(this, this.properties);

    const rootProps = {...rest, classes: this.classes(
      CSS.ui,
      ...classy.values(CSS, {position, size}),
      ...classy.keys(CSS, {attached}),
      ...classy.generic(CSS, {close}),
      ...classy.keys(CSS, {dividing, internal}),
      CSS.rail
    ).fixed(...this.fixed)}

		return v(ElementType, rootProps, this.children);
	}
}
