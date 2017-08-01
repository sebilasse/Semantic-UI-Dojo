import { META, Properties, Base, theme, classy, mapItems, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import Button from '../Button/Button';
import * as CSS from './styles/modal.min.css';

/**
 * An internal icon sub-component for Modal component
 */
export interface ModalActionsProps extends Properties {
  /** Elements to render as Modal action buttons. */
  actions: (string | Properties)[];
  /* customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.arrayOf(customPropTypes.itemShorthand),
  ]), TODO FIXME */

  /**
   * onClick handler for an action. Mutually exclusive with children. TODO
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onActionClick?: (event: MouseEvent & TouchEvent, data: ModalActionsProps) => void;
}

@theme(CSS)
export default class ModalActions extends Base<ModalActionsProps> {
  static meta = {
    title:  'ModalActions',
    parent: 'Modal',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM
  };
  handleButtonOverrides(predefinedProps: any) {
    return {
      onClick: (e: MouseEvent & TouchEvent, buttonProps: any) => {
        /* TODO FIXME predefinedProps
        // Example const { onClick } = this.properties;
        //         if (onClick) { onClick(e, this.properties) }
        // ::
        _.invoke(predefinedProps, 'onClick', e, buttonProps)
        _.invoke(this.properties, 'onActionClick', e, buttonProps)
        */
      }
    }
  }

	render() {
		const { actions = [], className = null, ...rest } = this.properties;
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
  			CSS.actions
      ).fixed(...this.fixed)
		}
    if (!!this.children.length) { return v(ElementType, props, this.children) }
    const content = mapItems(actions, Button);
		return v(ElementType, props, content);
	}
}
