import has from '@dojo/has/main';
import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, DIMMER, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';
import ModalDescription from './ModalDescription';
import * as CSS from './styles/modal.min.css';
// TODO FIXME Portal AND AutoControlled see trySetState, setState
// TODO FIXME add and remove classes = CSS.

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
export interface ModalProps extends Properties {
  /** Elements to render as Modal action buttons. */
  actions?: (string | Properties)[]; // TODO
  /** A modal can reduce its complexity */
  basic?: boolean;
  /** Shorthand for Icon. */
  closeIcon?: string | IconProps;
  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick?: boolean;
  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick?: boolean;
  /** Initial value of open. */
  defaultOpen?: boolean;
  /** A Modal can appear in a dimmer. */
  dimmer?: boolean | keyof typeof DIMMER;
  /** Modal displayed above the content in bold. */
  header?: string | Properties;
  /** The node where the modal should mount. Defaults to document.body. */
  mountNode?: any;
  /** Controls whether or not the Modal is displayed. */
  open?: boolean;
  /** A modal can vary in size */
  size?: keyof typeof SIZE.SCREEN;
  /** Custom styles. */
  style?: any;
  /**
   * Called when a close event happens.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onClose?: (event: Event, data: ModalProps) => void;
  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onMount?: (event: Event, data: ModalProps) => void;
  /**
   * Called when an open event happens.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onOpen?: (event: Event, data: ModalProps) => void;
  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {object} data - All properties.
   */
  onUnmount?: (data: ModalProps) => void;
  /**
   * NOTE: Any unhandled props that are defined in Portal are passed-through
   * to the wrapping Portal.
   */
}

@theme(CSS)
export default class Modal extends Base<ModalProps> {
  static meta = {
    title:  'Modal',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  /* TODO FIXME */
  static autoControlledProps = [ 'open' ];
  static defaultProps = {
    dimmer: true,
    closeOnDimmerClick: true,
    closeOnDocumentClick: false
  };
  static Header = ModalHeader;
  static Content = ModalContent;
  static Description = ModalDescription;
  static Actions = ModalActions;
  state: any = {};

  // TODO FIXME
  animationRequestId: any;
  ref: any;


  componentWillUnmount() {
    //debug('componentWillUnmount()')
    this.handlePortalUnmount();
  }

  // Do not access document when server side rendering // TODO FIXME projector
  getMountNode() {
    return (has('host-browser')) ? (this.properties.mountNode||document.body) : null
  }

  handleActionsOverrides(predefinedProps: any) {
    return {
      onActionClick: (e: Event, actionProps: any) => {
        const { triggerClose } = actionProps
        // TODO FIXME
        //_.invoke(predefinedProps, 'onActionClick', e, actionProps)
        if (triggerClose) this.handleClose(e)
      },
    }
  }

  handleClose(e: Event) {
    //debug('close()')
    const { onClose } = this.properties
    if (onClose) onClose(e, this.properties)
    // TODO FIXME this.trySetState({ open: false })
  }

  handleIconOverrides(predefinedProps: any) {
    return {
      onClick: (e: Event) => {
        // TODO FIXME
        //_.invoke(predefinedProps, 'onClick', e)
        this.handleClose(e)
      },
    }
  }

  handleOpen(e: Event) {
    //debug('open()')
    const { onOpen } = this.properties
    if (onOpen) onOpen(e, this.properties)
    // TODO FIXME this.trySetState({ open: true })
  }

  handlePortalMount(e: Event) {
    //debug('handlePortalMount()')
    const { dimmer } = this.properties
    const mountNode = this.getMountNode()
    if (dimmer) {
      //debug('adding dimmer')
      mountNode.classList.add('dimmable', 'dimmed')

      if (dimmer === 'blurring') {
        //debug('adding blurred dimmer')
        mountNode.classList.add('blurring')
      }
    }
    this.setPosition()
    const { onMount } = this.properties
    if (onMount) onMount(e, this.properties)
  }

  handlePortalUnmount() {
    //debug('handlePortalUnmount()')

    // Always remove all dimmer classes.
    // If the dimmer value changes while the modal is open, then removing its
    // current value could leave cruft classes previously added.
    const mountNode = this.getMountNode()
    mountNode.classList.remove('blurring', 'dimmable', 'dimmed', 'scrollable')

    cancelAnimationFrame(this.animationRequestId)

    const { onUnmount } = this.properties
    if (onUnmount) onUnmount(this.properties)
  }

  handleRef(c: any) { this.ref = c }

  setPosition() {
    if (this.ref) {
      const mountNode = this.getMountNode()
      const { height } = this.ref.getBoundingClientRect()

      const marginTop = -Math.round(height / 2)
      const scrolling = height >= window.innerHeight

      const newState: any = {}

      if (this.state.marginTop !== marginTop) {
        newState.marginTop = marginTop
      }

      if (this.state.scrolling !== scrolling) {
        newState.scrolling = scrolling

        if (scrolling) {
          mountNode.classList.add('scrolling')
        } else {
          mountNode.classList.remove('scrolling')
        }
      }
      // TODO FIXME
      // if (Object.keys(newState).length > 0) this.setState(newState)
    }

    this.animationRequestId = requestAnimationFrame(this.setPosition)
  }

  renderContent(rest: any) {
    const {
      actions, basic, closeIcon, header, size, style,
      content = null, className = null
    } = this.properties;
    const { marginTop, scrolling } = this.state;

    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {basic, scrolling}),
  			CSS.modal, CSS.active
      ).fixed('transition', 'visible', ...this.fixed)
		}
    const closeIconName = (typeof closeIcon === 'boolean' && closeIcon === true) ? 'close' : closeIcon
    const closeIconNode = Icon.create(closeIconName, { overrideProps: this.handleIconOverrides })

    if (!!this.children.length) {
      return /*(
        <ElementType {...rest} className={classes} style={{ marginTop, ...style }} ref={this.handleRef}>
          {closeIconNode}
          {children}
        </ElementType>
      )*/
    }

    return /*(
      <ElementType {...rest} className={classes} style={{ marginTop, ...style }} ref={this.handleRef}>
        {closeIconNode}
        {ModalHeader.create(header)}
        {ModalContent.create(content)}
        {ModalActions.create(actions, { overrideProps: this.handleActionsOverrides })}
      </ElementType>
    )*/
  }

	render() {
		const {
      closeOnDimmerClick, closeOnDocumentClick, dimmer,
      className = null, ...rest
		} = this.properties;
    const { open } = this.state;
    const children = [ ...this.children ];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        dimmer === 'inverted' && CSS.inverted || null,
        // TODO FIXME :
        // ...classy.keys(CSS, {page, modals, dimmer, transition, visible, active}),
  			CSS.modal
      ).fixed(...this.fixed)

		}
    const mountNode = this.getMountNode();
    // Short circuit when server side rendering // TODO FIXME microformats ???
    if (!has('host-browser')) { return null }

    // Heads up!
    //
    // The SUI CSS selector to prevent the modal itself from blurring requires an
    // immediate .dimmer child:
    // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
    //
    // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
    // We need the immediate child to be the dimmer to :not() blur the modal itself!
    // Otherwise, the portal div is also blurred, blurring the modal.
    //
    // We cannot them wrap the modalJSX in an actual <Dimmer /> instead,
    // we apply the dimmer classes to the <Portal />.
    /* TODO FIXME
    const unhandled = getUnhandledProps(Modal, this.props)
    const portalPropNames = Portal.handledProps

    const rest = _.omit(unhandled, portalPropNames)
    const portalProps = _.pick(unhandled, portalPropNames)
    return (
      <Portal
        closeOnDocumentClick={closeOnDocumentClick}
        closeOnRootNodeClick={closeOnDimmerClick}
        {...portalProps}
        className={dimmerClasses}
        mountNode={mountNode}
        open={open}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
      >
        {this.renderContent(rest)}
      </Portal>
    )
    */
		return v(ElementType, props, children);
	}
}
