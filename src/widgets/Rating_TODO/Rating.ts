import { DNode, Properties, Base, theme, classy, v } from '../../lib/main';
import { META, RATE_ICON, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import RatingIcon from './RatingIcon';
import * as CSS from './styles/rating.min.css';
// TODO FIXME AutoControlled see trySetState, setState

/**
 * A rating indicates user interest in content.
 */
export interface RatingProps extends Properties {
  /** You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
  */
  clearable?: boolean | 'auto';
  /** The initial rating value. */
  defaultRating?: number | string;
  /** You can disable or enable interactive rating. Makes a read-only rating. */
  disabled?: boolean;
  /** A rating can use a set of star or heart icons. */
  icon?: keyof typeof RATE_ICON;
  /** The total number of icons. */
  maxRating?: number | string;
  /** The current number of active icons. */
  rating?: number | string;
  /** A rating icon can vary in size. */
  size?: keyof typeof SIZE.NO_MEDIUM_BIG;
  /**
   * Called after user selects a new rating.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onRate?: (event: MouseEvent & TouchEvent, data: RatingProps) => void;
  /**
   * Called after user selects a new rating.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
  */
  onMouseLeave?: (event: MouseEvent & TouchEvent, data: RatingProps) => void;
};

@theme(CSS)
export default class Rating extends Base<RatingProps> {
  static meta = {
    title: 'Rating',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  /* TODO */
  static autoControlledProps = [ 'rating' ];
  static defaultProps = { clearable: 'auto', maxRating: 1 };
  static Icon = RatingIcon;
  state: any = {};

  handleIconClick(e: MouseEvent & TouchEvent, { index }: {index: number}) {
    const { clearable, disabled, maxRating, onRate } = this.properties;
    const { rating } = this.state;
    if (disabled) { return }

    // default newRating is the clicked icon
    // allow toggling a binary rating
    // allow clearing ratings
    let newRating = index + 1;
    if (clearable === 'auto' && maxRating === 1) {
      newRating = +!rating
    } else if (clearable === true && newRating === rating) {
      newRating = 0
    }

    // set rating
    /* TODO this.trySetState({ rating: newRating }, { isSelecting: false }) */
    if (onRate) { onRate(e, { ...this.properties, rating: newRating }) }
  }

  handleIconMouseEnter(e: MouseEvent & TouchEvent, { index }: {index: number}) {
    if (this.properties.disabled) return
    /* TODO this.setState({ selectedIndex: index, isSelecting: true }) */
  }

  handleMouseLeave(...args: any[]) {
    if (typeof this.properties.onMouseLeave === 'function') {
      let key: string;
      for (key in this.properties) {
        this.properties.onMouseLeave.apply((<any>this.properties)[key], args);
      }
    }
    if (this.properties.disabled) { return }
    /* TODO this.setState({ selectedIndex: -1, isSelecting: false }) */
  }

	render() {
		const {
      disabled, icon, size,
      className = null, ...rest
		} = this.properties;
    const maxRating = Number(rest.maxRating)||5;
    const defaultRating = Number(rest.defaultRating)||0;
    const { selectedIndex, isSelecting } = this.state;
    const rating = Number(this.state.rating)||0;
    const children: DNode[] = [];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {icon, size}),
        ...classy.keys(CSS, {disabled}),
        (isSelecting && !disabled && selectedIndex >= 0) ? CSS.selected : null,
  			CSS.rating
      ).fixed(...this.fixed),
      role: 'radiogroup',
      onMouseLeave: this.handleMouseLeave
		}
    let i: number;
    for (i = 0; i < maxRating; i++) {
      children.push(RatingIcon.create({
        active: (rating >= i + 1),
        ariaChecked: (rating === i + 1),
        ariaPosinset: (i + 1),
        ariaSetsize: maxRating,
        index: i,
        key: i,
        onClick: this.handleIconClick,
        onMouseEnter: this.handleIconMouseEnter,
        selected: (selectedIndex >= i && isSelecting)
      }))
    }
		return v(ElementType, props, children);
	}
}
