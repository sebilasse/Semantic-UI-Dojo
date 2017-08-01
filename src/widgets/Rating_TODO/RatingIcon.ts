import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/rating.min.css';

/**
 * An internal icon sub-component for Rating component
 */
export interface RatingIconProps extends Properties {
  /** Indicates activity of an icon. */
  active?: boolean;
  /** An index of icon inside Rating. */
  index?: number;
  /** Indicates selection of an icon. */
  selected?: boolean;
  /**
   * Called on click.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: RatingIconProps) => void;
  /**
   * Called on keyup.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onKeyUp?: (event: KeyboardEvent, data: RatingIconProps) => void;
  /**
   * Called on mouseenter.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onMouseEnter?: (event: MouseEvent & TouchEvent, data: RatingIconProps) => void;
}

@theme(CSS)
export default class RatingIcon extends Base<RatingIconProps> {
  static meta = {
    title: 'RatingIcon',
    parent: 'Rating',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM
  };
  /* TODO */
  static defaultProps = { as: 'i' };
  state: any = {}

  handleIconClick(e: MouseEvent & TouchEvent, { index }: {index: number}) {
    const { onClick } = this.properties;
    if (onClick) { onClick(e, this.properties) }
  }

  handleKeyUp(e: KeyboardEvent) {
    const { onClick, onKeyUp } = this.properties;
    if (onKeyUp) { onKeyUp(e, this.properties) }
    if (onClick) {
      switch (e.code) {
        case 'Enter':
        case 'Space':
          e.preventDefault();
          onClick((<any>e), this.properties); /* TODO */
          break;
        default: return;
      }
    }
  }

  handleMouseEnter(e: MouseEvent & TouchEvent) {
    const { onMouseEnter } = this.properties;
    if (onMouseEnter) { onMouseEnter(e, this.properties) }
  }

	render() {
		const {
      active, selected,
      className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.keys(CSS, {active, selected}),
  			CSS.icon
      ).fixed(...this.fixed),
      onClick: this.handleClick,
      onKeyUp: this.handleKeyUp,
      onMouseEnter: this.handleMouseEnter,
      tabIndex: 0,
      role: 'radio'
		}

		return v(ElementType, props, []);
	}
}
