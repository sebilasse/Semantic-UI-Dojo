import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Grid from './Grid';

/**
 * Configures a Grid web component
 */
export default function createGridElement(): CustomElementDescriptor {
	return {
		tagName: 'ui-grid',
		widgetConstructor: Grid,
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
