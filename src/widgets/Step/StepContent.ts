import { META, Base, theme } from '../../lib/main';
import StepDescription from './StepDescription';
import StepTitle from './StepTitle';
import * as CSS from './styles/step.min.css';
@theme(CSS)
/**
 * A step can contain a content.
 */
export default class StepContent extends Base {
  static meta = {
		title: 'StepContent',
    parent: 'Step',
		namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.MOLECULE,
		description: 'A step can contain a content.'
	};
	rootClasses = [ CSS.content ];
  groups: any = { title: StepTitle, description: StepDescription }
}
