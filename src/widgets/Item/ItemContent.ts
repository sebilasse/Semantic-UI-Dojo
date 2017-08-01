import { Properties, Base, theme, classy } from '../../lib/main';
import { META, ALIGN } from '../../lib/SUI';
import ItemDescription from './ItemDescription';
import ItemHeader from './ItemHeader';
import ItemMeta from './ItemMeta';
import ItemExtra from './ItemExtra';
import * as CSS from './styles/item.min.css';

/**
 * An item can contain content.
 */
export interface ItemContentProps extends Properties {
  /** Shorthand for ItemDescription. */
  description?: string | Properties;
  /** Shorthand for primary content of ItemContent. */
  extra?: string | Properties;
  /** Shorthand for ItemHeader. */
  header?: string | Properties;
  /** Shorthand for ItemMeta. */
  meta?: string | Properties;
  /** Content can specify its vertical alignment. */
  verticalAlign?: keyof typeof ALIGN.V;
}

@theme(CSS)
export default class ItemContent extends Base<ItemContentProps> {
  static meta = {
    title:  'ItemContent',
    parent: 'Item',
    namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE
  };
	rootClasses = () => [ CSS.content, classy.verticalAlign(CSS, this.properties.verticalAlign) ];
  groups = {
    header: ItemHeader,
    image: Image,
    meta: ItemMeta,
    description: ItemDescription,
    extra: ItemExtra
  }
}
