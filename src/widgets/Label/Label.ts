import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, COLOR, SIZE, ALIGN, POS } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import Image, { ImageProps } from '../Image/Image';
import LabelDetail from './LabelDetail';
import Labels from './Labels';

import { invoke } from 'lodash'; // TODO FIXME
import * as CSS from './styles/label.min.css';

/**
 * A label displays content classification.
 */
export interface LabelProps extends Properties {
  /** A label can be active. */
  active?: boolean;
  /** A label can attach to a content segment. */
  attached?: keyof typeof ALIGN.CORNER;
  /** A label can reduce its complexity. */
  basic?: boolean;
  /** A label can be circular. */
  circular?: boolean;
  /** Color of the label. */
  color?: keyof typeof COLOR;
  /** A label can position itself in the corner of an element. */
  corner?: boolean | keyof typeof POS.LR;
  /** Shorthand for LabelDetail. */
  detail?: string | Properties;
  /** Formats the label as a dot. */
  empty?: boolean;
  /** Float above another element in the upper right corner. */
  floating?: boolean;
  /** Formatted to label content along-side it horizontally. */
  horizontal?: boolean;
  /** Shorthand for Icon. */
  icon?: string | IconProps;
  /** A label can be formatted to emphasize an image. Shorthand for Image. */
  image?: boolean | string | ImageProps;
  /** A label can point to content next to it. */
  pointing?: boolean | keyof typeof ALIGN.POINT;
  /** Shorthand for Icon to appear as the last child and trigger onRemove. */
  removeIcon?: string | IconProps;
  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon?: boolean | 'right';
  /** A label can have different sizes. */
  size?: keyof typeof SIZE.ALL;
  /** A label can appear as a tag. */
  tag?: boolean;
  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: LabelProps) => void;
  /**
   * Adds an "x" icon, called when "x" is clicked.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onRemove?: (event: MouseEvent & TouchEvent, data: LabelProps) => void; // TODO FIXME
}

@theme(CSS)
export default class Label extends Base<LabelProps> {
  static meta = {
    title:  'Label',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ATOM
  };
  static Detail = LabelDetail;
  static Group = Labels;

	handleClick(e: MouseEvent & TouchEvent) {
    const { onClick } = this.properties
    if (onClick) { onClick(e, this.properties) }
  }

  private iconOverrides(predefinedProps: any) {
    return ({
      onClick: (e: Event) => {
        invoke(predefinedProps, 'onClick', e);
        invoke(this.properties, 'onRemove', e, this.properties)
      },
    })
  }
	render() {
		const {
      active, basic, circular, empty, floating, horizontal, tag,
      attached, color, corner, pointing, ribbon, size,
      detail, icon, removeIcon, image,
      onClick, onRemove, content = null, className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const pointingClass = pointing === true && 'pointing'
      || (pointing === 'left' || pointing === 'right') && `${pointing} pointing`
      || (pointing === 'above' || pointing === 'below') && `pointing ${pointing}`; // TODO FIXME

    const classes = this.classes(
      CSS.ui,
      ...classy.values(CSS, {color, pointingClass, size}),
      ...classy.keys(CSS, {active,basic,circular,empty,floating,horizontal,tag}),
      (image === true) ? CSS.image : null,
      ...classy.generic(CSS, {corner, ribbon}),
      ...classy.valueKeys(CSS, {attached}),
      CSS.label
    ).fixed(...this.fixed);

    const rootProps = {...rest, classes, onClick: this.handleClick}
		const children = [...this.children];
    if (!!children.length) { return v(ElementType, rootProps, children) }

    const removeIconShorthand = (typeof removeIcon === 'string') ? removeIcon : 'delete';
    !!icon && children.unshift(Icon.create(icon));
    (typeof image !== 'boolean') && children.push(Image.create(image));
    children.push(content);
    !!onRemove && Icon.create(removeIconShorthand, { overrideProps: this.iconOverrides });
    !!detail && children.push(LabelDetail.create(detail));

    return v(ElementType, rootProps, children)
  }
}
