import { META, Properties, Base, theme, classy, v } from '../../lib/main';
import getElementType from '../../lib/getElementType';
import * as CSS from './styles/search.min.css';
// TODO FIXME AutoControlled see trySetState, setState

/**
 * A result node from Search.
 */
export interface SearchResultProps extends Properties {
  /** The item currently selected by keyboard shortcut. */
  active?: boolean;
  /** Additional text with less emphasis. */
  description?: string;
  /** A unique identifier. */
  id?: number;
  /** Add an image to the item. */
  image?: string;
  /** Customized text for price. */
  price?: string;
  /** Display title text. */
  title?: string;
  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult properties object.
   * @returns {*} - Renderable result contents.
   */
  renderer?: (props: any) => void;
  /**
   * Called on click.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All properties.
   */
  onClick?: (event: MouseEvent & TouchEvent, data: SearchResultProps) => void;
}

@theme(CSS)
export default class SearchResult extends Base<SearchResultProps> {
  static meta = {
    title: 'SearchResult',
    parent: 'Search',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ATOM
  };
  // Note: You technically only need the 'content' wrapper when there's an
  // image. However, optionally wrapping it makes this function a lot more
  // complicated and harder to read. Since always wrapping it doesn't affect
  // the style in any way let's just do that.
  //
  // Note: To avoid requiring a wrapping div, we return an array here so to
  // prevent rendering issues each node needs a unique key.
  defaultRenderer({ image, price, title, description }: SearchResultProps) {
    return [
      image && v('div', {key: 'content', classes: this.classes(CSS.content)}, [
        !!price ? v('div', {classes: this.classes(CSS.price)}, [price]) : null,
        !!title ? v('div', {classes: this.classes(CSS.title)}, [title]) : null,
        !!description ? v('div', {classes: this.classes(CSS.description)}, [description]) : null
      ]) || null
    ]
  }

	render() { // TODO id ...
		const {
      active, renderer = this.defaultRenderer,
      className = null, id, ...rest
		} = this.properties;

    const ElementType = getElementType(this, this.properties);
    const children = [...this.children];
    const props = {
      ...rest,
			classes: this.classes(
        ...classy.keys(CSS, {active}),
  			CSS.result
      ).fixed(...this.fixed),
      onClick: this.handleClick
		}
		return v(ElementType, props, /*renderer(this.properties) TODO FIXME*/);
	}
}
