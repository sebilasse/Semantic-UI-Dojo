import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Flag from './Flag';

/**
 * Configures a Flag web component
 */
export default function createFlagElement(): CustomElementDescriptor {
	return {
		tagName: 'ui-flag',
		widgetConstructor: Flag,
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
