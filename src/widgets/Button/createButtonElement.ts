import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Button from './Button';

/**
 * Configures a Button web component
 */
export default function createButtonElement(): CustomElementDescriptor {
	return {
		tagName: 'ui-button',
		widgetConstructor: Button,
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
