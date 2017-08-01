import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon';
import StepContent from './StepContent';
import StepDescription from './StepDescription';
import StepTitle from './StepTitle';
import Steps from './Steps';
import * as CSS from './styles/step.min.css';

/**
 * A step shows the completion status of an activity in a series of activities.
 */
export interface StepProps extends Properties {
  /** A step can be highlighted as active. */
  active?: boolean;
  /** A step can show that a user has completed it. */
  completed?: boolean;
  /** Shorthand for StepDescription. */
  description?: string | Properties;
  /** Show that the Loader is inactive. */
  disabled?: boolean;
  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href?: string;
  /** Shorthand for Icon. */
  icon?: string | IconProps;
  /** A step can be link. */
  link?: boolean;
  /** A step can show a ordered sequence of steps. Passed from StepGroup. */
  ordered?: boolean;
  /** Shorthand for StepTitle. */
  title?: string | Properties;
  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: StepProps) => void;
}

@theme(CSS)
export default class Step extends Base<StepProps> {
  static meta = {
    title: 'Step',
    namespace: META.NAME.SUI, type: META.TYPES.ELEMENT, atomic: META.ATOMIC.ORGANISM
  };
  static Group = Steps;
  static Content = StepContent;
  static Description = StepDescription;
  static Title = StepTitle;

	render() {
		const {
      active, completed, disabled, link,
      description, title, icon,
      href, onClick, className = null, ...rest
		} = this.properties;

		const children = [...this.children];
    const ElementType = getElementType(this, this.properties);
    const props = {
			href: href,
			onclick: this.handleClick,
			classes: this.classes(
        CSS.ui,
        ...classy.keys(CSS, {active, completed, disabled, link}),
  			CSS.step
      ).fixed(...this.fixed)
		}
    const rootProps = {...rest, ...props}
    if (!!children.length) { return v(ElementType, rootProps, children) }

    if (!!icon) { children.unshift(Icon.create(icon)) }
    if (!!description || !!title) { children.push(StepContent.create(icon, {description, title})) }
		return v(ElementType, rootProps, children);
	}
}
