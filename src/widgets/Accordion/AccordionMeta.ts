import { META, Base, theme } from '../../lib/main';
import * as progressiveCSS from './main.css';

/**
 * A meta (byline) sub-component for Accordion component (visible if panel open).
 */
export default class AccordionMeta extends Base {
  static meta = {
		title: 'AccordionMeta',
    parent: 'AccordionPanel',
		namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM,
		description: 'A meta (byline) sub-component for Accordion component.'
	};
	rootClasses = [ progressiveCSS.meta ];
}
