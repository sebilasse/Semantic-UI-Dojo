import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/card.min.css';
@theme(CSS)
/**
 * A card can contain a description with one or more paragraphs.
 */
export default class CardDescription extends Base {
  static meta = {
		title: 'CardDescription',
    parent: 'CardContent',
		namespace: META.NAME.SUI, type: META.TYPES.VIEW, atomic: META.ATOMIC.MOLECULE,
		description: 'A card can contain a description with one or more paragraphs.'
	};
	rootClasses = [ CSS.description ];
}
