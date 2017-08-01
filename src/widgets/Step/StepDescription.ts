import { META, Base, theme } from '../../lib/main';
import * as CSS from './styles/step.min.css';
@theme(CSS)
/**
 * A step can contain a description.
 */
export default class StepDescription extends Base {
  static meta = {
		title: 'StepDescription',
    parent: 'StepContent',
		namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE,
		description: 'A step can contain a description.'
	};
	rootClasses = [ CSS.description ];
  primaryContent = 'description';
}
