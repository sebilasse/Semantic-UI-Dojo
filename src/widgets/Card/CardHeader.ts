import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/card.min.css';
@theme(CSS)
/**
 * A card can contain a header.
 */
export default class CardHeader extends Base {
  static meta = {
		title: 'CardHeader',
    parent: 'CardContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.ATOM,
		description: 'A card can contain a header.'
	};
	rootClasses = [ CSS.header ];
}
