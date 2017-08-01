import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import { SearchResultProps } from './SearchResult';
import * as CSS from './styles/search.min.css';
// TODO FIXME AutoControlled see trySetState, setState

/**
 * A Search category.
 */
export interface SearchCategoryProps extends Properties {
  /** The item currently selected by keyboard shortcut. */
  active?: boolean;
  /** Display name. */
  name?: string;
  /** Array of Search.Result props. */
  results: SearchCategoryProps[];
  /**
   * Renders the category contents.
   *
   * @param {object} props - The SearchCategory properties object.
   * @returns {*} - Renderable result contents.
   */
  renderer: (props: any) => void;
}

@theme(CSS)
export default class SearchCategory extends Base<SearchCategoryProps> {
  static meta = {
    title: 'SearchCategory',
    parent: 'Search',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM
  };
  defaultRenderer({ name }: SearchCategoryProps) { return name }
	render() {
		const {
      active, renderer = this.defaultRenderer,
      className = null, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const children = [...this.children];
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.keys(CSS, {active}),
  			CSS.category
      ).fixed(...this.fixed)
		}
		return v(ElementType, props, /*renderer(this.properties)*/); // TODO FIXME
	}
}
