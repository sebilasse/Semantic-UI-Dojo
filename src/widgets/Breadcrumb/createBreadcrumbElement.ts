import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Breadcrumb from './Breadcrumb';

/**
 * Configures a Breadcrumb web component
 */
export default function createBreadcrumbElement(): CustomElementDescriptor {
	return {
		tagName: 'ui-breadcrumb',
		widgetConstructor: Breadcrumb,
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
