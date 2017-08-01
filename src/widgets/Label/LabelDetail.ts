import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/label.min.css';
@theme(CSS)
/**
 * A label can contain a (spaced) detail.
 */
export default class LabelDetail extends Base {
  static meta = {
		title: 'LabelDetail',
    parent: 'Label',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ATOM,
		description: 'A label can contain a (spaced) detail.'
	};
	rootClasses = [ CSS.detail ];
}
