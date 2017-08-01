import { Properties, Base, theme, classy, v, w } from '../../lib/main';
import { META, ALIGN, ANIM, SIDEWIDTH } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import SidebarPusher from './SidebarPusher';
import SidebarPushable from './SidebarPushable';
import * as CSS from './styles/sidebar.min.css';
// TODO FIXME AutoControlled see setState, trySetState etc

/**
 * A sidebar hides additional content beside a page.
 */
export interface SidebarProps extends Properties {
  /** Animation style. */
  animation?: keyof typeof ANIM.OVER;
  /** Initial value of visible. */
  defaultVisible?: boolean;
  /** Direction the sidebar should appear on. */
  direction?: keyof typeof ALIGN.ALL;
  /** Controls whether or not the sidebar is visible on the page. */
  visible?: boolean;
  /** Sidebar width. */
  width: keyof typeof SIDEWIDTH;
}

@theme(CSS)
export default class Sidebar extends Base<SidebarProps> {
  static meta = {
    title: 'Sidebar',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  /* TODO */
  static autoControlledProps = [ 'visible' ];
  static defaultProps = { direction: 'left' };
  static Pusher = SidebarPusher;
  static Pushable = SidebarPushable;
  state: any = {};

  startAnimating(duration = 500) {
    /* TODO FIXME
    clearTimeout(this.stopAnimatingTimer)
    this.setState({ animating: true })
    this.stopAnimatingTimer = setTimeout(() => this.setState({ animating: false }), duration)
    */
  }
  /* TODO FIXME : */
  componentWillReceiveProps(nextProps: SidebarProps) {
    if (nextProps.visible !== this.properties.visible) {
      this.startAnimating()
    }
  }

	render() {
		const {
      animation, direction, visible, width,
      className = null, ...rest
		} = this.properties;
    const { animating } = this.state;

    const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        ...classy.values(CSS, {animation, direction, width}),
        ...classy.keys(CSS, {animating, visible}),
  			CSS.sidebar
      ).fixed(...this.fixed),

		}

		return v(ElementType, props, children);
	}
}
