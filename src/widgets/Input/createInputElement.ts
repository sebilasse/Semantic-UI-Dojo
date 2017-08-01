import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Input from './Input';

/**
 * Configures a Input web component
 */
export default function createInputElement(): CustomElementDescriptor {
	return {
		tagName: 'ui-input',
		widgetConstructor: Input,
		attributes: [
			{
				attributeName: 'centered'
			},
			{
				attributeName: 'description'
			},
			{
				attributeName: 'extra'
			},
			{
				attributeName: 'fluid'
			},
			{
				attributeName: 'header'
			},
			{
				attributeName: 'link'
			},
			{
				attributeName: 'meta'
			},
			{
				attributeName: 'raised'
			},
			{
				attributeName: 'color'
			},
			{
				attributeName: 'href'
			},
			{
				attributeName: 'image'
			}
		],
		events: [
			{
				propertyName: 'onClick',
				eventName: 'click'
			}
		]
	};
};
