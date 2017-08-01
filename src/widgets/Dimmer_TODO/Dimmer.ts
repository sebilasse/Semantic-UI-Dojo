import has from '@dojo/has/main';
import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import DimmerDimmable from './DimmerDimmable';
import * as CSS from './styles/dimmer.min.css';
/* TODO FIXME AutoControlled and Portal */

/**
 * A dimmer hides distractions to focus attention on particular content.
 */
export interface DimmerProps extends Properties {
  /** An active dimmer will dim its parent container when active. */
  active?: boolean;
  /** A disabled dimmer cannot be activated. */
  disabled?: boolean;
  /** A dimmer can be formatted to have its colors inverted. */
  inverted: boolean;
  /** A dimmer can be formatted to be fixed to the page. */
  page: boolean;
  /** A dimmer can be controlled with simple prop. */
  simple: boolean;
  /**
   * Called on click.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: DimmerProps) => void;
  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
   onClickOutside?: (event: MouseEvent & TouchEvent, data: DimmerProps) => void;
}

@theme(CSS)
export default class Dimmer extends Base<DimmerProps> {
  static meta = {
    title: 'Dimmer',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.MOLECULE
  };
  static Dimmable = DimmerDimmable;

  handlePortalMount() {
    if (has('host-browser')) { document.body.classList.add('dimmed', 'dimmable') }
  }

  handlePortalUnmount() {
    if (has('host-browser')) { document.body.classList.remove('dimmed', 'dimmable') }
  }

  handleClick(e: MouseEvent & TouchEvent) {
    const { onClick, onClickOutside } = this.properties;
    if (onClick) { onClick(e, this.properties) }
    if (this.centerRef && (this.centerRef !== e.target && this.centerRef.contains(e.target))) {
      return
    }
    if (onClickOutside) { onClickOutside(e, this.properties) }
  }

  handleCenterRef(c: any) { this.centerRef = c; }

  centerRef: any; /* TODO FIXME, also CSS.transition ? */

	render() {
		const {
      active,
      disabled, inverted, page, simple,
	    onClick, content = null, className = null, ...rest
		} = this.properties;

		const children = [...this.children];

    const ElementType = getElementType(this, this.properties);
    const props = {
			classes: this.classes(
        CSS.ui,
        !!active ? CSS.active : null,
        !!active ? CSS.visible : null,
        ...classy.keys(CSS, {disabled, inverted, page, simple}),
  			CSS.dimmer
      ).fixed(!active ? 'transition' : null, ...this.fixed),
      onclick: this.handleClick
		}
    const rootProps = {...rest, ...props}
    const childrenContent = !children.length ? [content] : children;
    let dimmerChildren = (!childrenContent) ? [] : [
      v('div.content', {}, [
        v('div.center', {ref: this.handleCenterRef}, childrenContent)
      ])
    ];
    const dimmerElement = v(ElementType, rootProps, dimmerChildren);
    /* TODO FIXME Portal
    if (page) {
      return (
        <Portal
          closeOnEscape={false}
          closeOnDocumentClick={false}
          onMount={this.handlePortalMount}
          onUnmount={this.handlePortalUnmount}
          open={active}
          openOnTriggerClick={false}
        >
          {dimmerElement}
        </Portal>
      )
    }
    */
    return dimmerElement;
	}
}
