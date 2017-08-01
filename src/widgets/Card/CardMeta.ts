import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/card.min.css';
@theme(CSS)
/**
 * A card can contain content metadata.
 */
export default class CardMeta extends Base {
  static meta = {
		title: 'CardMeta',
    parent: 'CardContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'A card can contain content metadata.'
	};
	rootClasses = [ CSS.meta ];
}
