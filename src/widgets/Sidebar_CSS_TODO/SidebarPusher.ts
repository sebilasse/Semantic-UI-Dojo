import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/sidebar.min.css';

/**
 * A pushable sub-component for Sidebar.
 */
export interface SidebarPusherProps extends Properties {
  /** Controls whether or not the dim is displayed. */
  dimmed: boolean;
}

@theme(CSS)
export default class SidebarPusher extends Base<SidebarPusherProps> {
  static meta = {
    title: 'SidebarPusher',
    parent: 'Sidebar',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM
  };
  render() {
		const { dimmed, className = null, ...rest } = this.properties;
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.pusher,
        ...classy.keys(CSS, {dimmed})
      ).fixed(...this.fixed)
		}

		return v(ElementType, props, []);
	}
}
