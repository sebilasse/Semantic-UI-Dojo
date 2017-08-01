import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Header from './Header';

/**
 * Configures a Header web component
 */
export default function createHeaderElement(): CustomElementDescriptor {
	return {
		tagName: 'ui-header',
		widgetConstructor: Header,
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
