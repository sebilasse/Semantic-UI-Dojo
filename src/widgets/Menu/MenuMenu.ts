import { META, Properties, Base, theme } from '../../lib/main';
import * as CSS from './styles/menu.min.css';

/**
 * A menu can contain a sub menu.
 */
export interface MenuMenuProps extends Properties {
  /** A sub menu can take right position. */
  position?: 'right';
}

@theme(CSS)
export default class MenuMenu extends Base<MenuMenuProps> {
  static meta = {
    title:  'MenuMenu',
    parent: 'Menu',
    namespace: META.NAME.SUI, type: META.TYPES.COLLECTION, atomic: META.ATOMIC.MOLECULE
  };
	rootClasses = (props: MenuMenuProps) => [
    CSS.header,
    (this.properties.position && (<any>CSS)[this.properties.position]) ?
      this.properties.position : null /* TODO FIXME */
  ];
}
