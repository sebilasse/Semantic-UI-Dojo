import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/accordion.min.css';
@theme(CSS)
/**
 * A content sub-component for Accordion component (visible if panel open).
 */
export default class AccordionContent extends Base {
  static meta = {
		title: 'AccordionContent',
    parent: 'AccordionPanel',
		namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM,
		description: 'A title sub-component for Accordion component.'
	};
	rootClasses = [ CSS.content ];
}
