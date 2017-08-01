import { Properties, Base, theme, classy, v } from '../../lib/main';
import { META, SIZE } from '../../lib/SUI';
import getElementType from '../../lib/getElementType';
import Icon, { IconProps } from '../Icon/Icon'
import Input, { InputProps } from '../Input/Input'
import SearchCategory from './SearchCategory'
import SearchResult from './SearchResult'
import SearchResults from './SearchResults'
import * as CSS from './styles/search.min.css';
// TODO FIXME AutoControlled see trySetState, setState etc. pp.

/**
 * A search module allows a user to query for results from a selection of data
 */
export interface SearchProps extends Properties {
  // ------------------------------------
  // Behavior
  // ------------------------------------
  /** Initial value of open. */
  defaultOpen?: boolean;
  /** Initial value. */
  defaultValue?: string;
  /** Shorthand for Icon. */
  icon?: string | IconProps;
  /** Minimum characters to query for results */
  minCharacters?: number;
  /** Description to display when there are no results. */
  noResultsDescription?: string;
  /** Message to display when there are no results. */
  noResultsMessage?: string;
  /** Controls whether or not the results menu is displayed. */
  open?: boolean;
  /**
   * One of:
   * - array of Search.Result props e.g. `{ title: '', description: '' }` or
   * - object of categories e.g. `{ name: '', results: [{ title: '', description: '' }]`
   */ // TODO Array<any> | Object; */
  results?: any;
  /** Whether the search should automatically select the first result after searching. */
  selectFirstResult?: boolean;
  /** Whether a "no results" message should be shown if no results are found. */
  showNoResults?: boolean;
  /** Current value of the search input. Creates a controlled component. */
  value?: string;
  // ------------------------------------
  // Style
  // ------------------------------------
  /** A search can have its results aligned to its left or right container edge. */
  aligned?: string;
  /** A search can display results from remote content ordered by categories. */
  category?: boolean;
  /** A search can have its results take up the width of it's container. */
  fluid?: boolean;
  /** A search input can take up the width of its container. */ // TODO
  input?: string | InputProps;
  /** A search can show a loading indicator. */
  loading?: boolean;
  /** A search can have different sizes. */
  size?: keyof typeof SIZE.NO_MEDIUM;
  // ------------------------------------
  // Rendering
  // ------------------------------------
  /**
   * Renders the SearchCategory contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable SearchCategory contents.
   */
  categoryRenderer?: (event: Event, data: SearchProps) => void;
  /**
   * Renders the SearchResult contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable SearchResult contents.
   */
  resultRenderer?: (event: Event, data: SearchProps) => void;
  // ------------------------------------
  // Callbacks
  // ------------------------------------
  /**
   * Called on blur.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onBlur?: (event: FocusEvent, data: SearchProps) => void;
  /**
   * Called on focus.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onFocus?: (event: FocusEvent, data: SearchProps) => void;
  /**
   * Called on mousedown.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onMouseDown?: (event: MouseEvent, data: SearchProps) => void;
  /**
   * Called when a result is selected.
   *
   * @param {Event} event - The Event.
   * @param {object} data - All props.
   */
  onResultSelect?: (event: Event, data: SearchProps) => void;
  /**
   * Called on search input change.
   *
   * @param {Event} event - The Event.
   * @param {string} value - Current value of search input.
   */
  onSearchChange?: (event: Event, data: SearchProps) => void;
}

@theme(CSS)
export default class Search extends Base<SearchProps> {
  static meta = {
    title: 'Search',
    namespace: META.NAME.SUI, type: META.TYPES.MODULE, atomic: META.ATOMIC.ORGANISM
  };
  /* TODO */
  static autoControlledProps = [ 'open', 'value' ];
  static defaultProps = {
    icon: 'search',
    input: 'text',
    minCharacters: 1,
    noResultsMessage: 'No results found.',
    showNoResults: true
  };
  static Category = SearchCategory;
  static Result = SearchResult;
  static Results = SearchResults;
  state: any = {};
/*
  componentWillMount() {
    if (super.componentWillMount) super.componentWillMount()
    debug('componentWillMount()')
    const { open, value } = this.state

    this.setValue(value)
    if (open) this.open()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps)
    debug('componentWillReceiveProps()')
    // TODO objectDiff still runs in prod, stop it
    debug('changed props:', objectDiff(nextProps, this.props))

    if (!_.isEqual(nextProps.value, this.props.value)) {
      debug('value changed, setting', nextProps.value)
      this.setValue(nextProps.value)
    }
  }

  componentDidUpdate(prevProps, prevState) { // eslint-disable-line complexity
    debug('componentDidUpdate()')
    // TODO objectDiff still runs in prod, stop it
    debug('to state:', objectDiff(prevState, this.state))

    // Do not access document when server side rendering
    if (!isBrowser) return

    // focused / blurred
    if (!prevState.focus && this.state.focus) {
      debug('search focused')
      if (!this.isMouseDown) {
        debug('mouse is not down, opening')
        this.tryOpen()
      }
      if (this.state.open) {
        document.addEventListener('keydown', this.moveSelectionOnKeyDown)
        document.addEventListener('keydown', this.selectItemOnEnter)
      }
    } else if (prevState.focus && !this.state.focus) {
      debug('search blurred')
      if (!this.isMouseDown) {
        debug('mouse is not down, closing')
        this.close()
      }
      document.removeEventListener('keydown', this.moveSelectionOnKeyDown)
      document.removeEventListener('keydown', this.selectItemOnEnter)
    }

    // opened / closed
    if (!prevState.open && this.state.open) {
      debug('search opened')
      this.open()
      document.addEventListener('keydown', this.closeOnEscape)
      document.addEventListener('keydown', this.moveSelectionOnKeyDown)
      document.addEventListener('keydown', this.selectItemOnEnter)
      document.addEventListener('click', this.closeOnDocumentClick)
    } else if (prevState.open && !this.state.open) {
      debug('search closed')
      this.close()
      document.removeEventListener('keydown', this.closeOnEscape)
      document.removeEventListener('keydown', this.moveSelectionOnKeyDown)
      document.removeEventListener('keydown', this.selectItemOnEnter)
      document.removeEventListener('click', this.closeOnDocumentClick)
    }
  }

  componentWillUnmount() {
    debug('componentWillUnmount()')

    // Do not access document when server side rendering
    if (!isBrowser) return

    document.removeEventListener('keydown', this.moveSelectionOnKeyDown)
    document.removeEventListener('keydown', this.selectItemOnEnter)
    document.removeEventListener('keydown', this.closeOnEscape)
    document.removeEventListener('click', this.closeOnDocumentClick)
  }

  // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------

  handleResultSelect(e, result) {
    debug('handleResultSelect()')
    debug(result)
    const { onResultSelect } = this.props
    if (onResultSelect) onResultSelect(e, result)
  }

  closeOnEscape(e) {
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return
    e.preventDefault()
    this.close()
  }

  moveSelectionOnKeyDown(e) {
    debug('moveSelectionOnKeyDown()')
    debug(keyboardKey.getName(e))
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.ArrowDown:
        e.preventDefault()
        this.moveSelectionBy(1)
        break
      case keyboardKey.ArrowUp:
        e.preventDefault()
        this.moveSelectionBy(-1)
        break
      default:
        break
    }
  }

  selectItemOnEnter(e) {
    debug('selectItemOnEnter()')
    debug(keyboardKey.getName(e))
    if (keyboardKey.getCode(e) !== keyboardKey.Enter) return
    e.preventDefault()

    const result = this.getSelectedResult()

    // prevent selecting null if there was no selected item value
    if (!result) return

    // notify the onResultSelect prop that the user is trying to change value
    this.setValue(result.title)
    this.handleResultSelect(e, result)
    this.close()
  }

  closeOnDocumentClick(e) {
    debug('closeOnDocumentClick()')
    debug(e)
    this.close()
  }

  // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------

  handleMouseDown(e) {
    debug('handleMouseDown()')
    const { onMouseDown } = this.props
    if (onMouseDown) onMouseDown(e, this.props)
    this.isMouseDown = true
    // Do not access document when server side rendering
    if (!isBrowser) return
    document.addEventListener('mouseup', this.handleDocumentMouseUp)
  }

  handleDocumentMouseUp() {
    debug('handleDocumentMouseUp()')
    this.isMouseDown = false
    // Do not access document when server side rendering
    if (!isBrowser) return
    document.removeEventListener('mouseup', this.handleDocumentMouseUp)
  }

  handleInputClick(e) {
    debug('handleInputClick()', e)

    // prevent closeOnDocumentClick()
    e.nativeEvent.stopImmediatePropagation()

    this.tryOpen()
  }

  handleItemClick(e, { id }) {
    debug('handleItemClick()')
    debug(id)
    const result = this.getSelectedResult(id)

    // prevent closeOnDocumentClick()
    e.nativeEvent.stopImmediatePropagation()

    // notify the onResultSelect prop that the user is trying to change value
    this.setValue(result.title)
    this.handleResultSelect(e, result)
    this.close()
  }

  handleFocus(e) {
    debug('handleFocus()')
    const { onFocus } = this.props
    if (onFocus) onFocus(e, this.props)
    this.setState({ focus: true })
  }

  handleBlur(e) {
    debug('handleBlur()')
    const { onBlur } = this.props
    if (onBlur) onBlur(e, this.props)
    this.setState({ focus: false })
  }

  handleSearchChange(e) {
    debug('handleSearchChange()')
    debug(e.target.value)
    // prevent propagating to this.props.onChange()
    e.stopPropagation()
    const { onSearchChange, minCharacters } = this.props
    const { open } = this.state
    const newQuery = e.target.value

    if (onSearchChange) onSearchChange(e, newQuery)

    // open search dropdown on search query
    if (newQuery.length < minCharacters) {
      this.close()
    } else if (!open) {
      this.tryOpen(newQuery)
    }

    this.setValue(newQuery)
  }

  // ----------------------------------------
  // Getters
  // ----------------------------------------

  getFlattenedResults() {
    const { category, results } = this.props

    return !category ? results : _.reduce(results,
        (memo, categoryData) => memo.concat(categoryData.results),
        []
      )
  }

  getSelectedResult(index = this.state.selectedIndex) {
    const results = this.getFlattenedResults()
    return _.get(results, index)
  }

  // ----------------------------------------
  // Setters
  // ----------------------------------------

  setValue(value) {
    debug('setValue()')
    debug('value', value)

    const { selectFirstResult } = this.props

    this.trySetState(
      { value },
      { selectedIndex: selectFirstResult ? 0 : -1 }
    )
  }

  moveSelectionBy(offset) {
    debug('moveSelectionBy()')
    debug(`offset: ${offset}`)
    const { selectedIndex } = this.state

    const results = this.getFlattenedResults()
    const lastIndex = results.length - 1

    // next is after last, wrap to beginning
    // next is before first, wrap to end
    let nextIndex = selectedIndex + offset
    if (nextIndex > lastIndex) nextIndex = 0
    else if (nextIndex < 0) nextIndex = lastIndex

    this.setState({ selectedIndex: nextIndex })
    this.scrollSelectedItemIntoView()
  }

  // ----------------------------------------
  // Behavior
  // ----------------------------------------

  scrollSelectedItemIntoView() {
    debug('scrollSelectedItemIntoView()')
    // Do not access document when server side rendering
    if (!isBrowser) return
    const menu = document.querySelector('.ui.search.active.visible .results.visible')
    const item = menu.querySelector('.result.active')
    if (!item) return
    debug(`menu (results): ${menu}`)
    debug(`item (result): ${item}`)
    const isOutOfUpperView = item.offsetTop < menu.scrollTop
    const isOutOfLowerView = (item.offsetTop + item.clientHeight) > menu.scrollTop + menu.clientHeight

    if (isOutOfUpperView) {
      menu.scrollTop = item.offsetTop
    } else if (isOutOfLowerView) {
      menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight
    }
  }

  // Open if the current value is greater than the minCharacters prop
  tryOpen(currentValue = this.state.value) {
    debug('open()')

    const { minCharacters } = this.props
    if (currentValue.length < minCharacters) return

    this.open()
  }

  open() {
    debug('open()')
    this.trySetState({ open: true })
  }

  close() {
    debug('close()')
    this.trySetState({ open: false })
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  renderSearchInput = rest => {
    const { icon, input } = this.props
    const { value } = this.state

    return Input.create(input, { defaultProps: {
      ...rest,
      icon,
      input: { className: 'prompt', tabIndex: '0', autoComplete: 'off' },
      onBlur: this.handleBlur,
      onChange: this.handleSearchChange,
      onClick: this.handleInputClick,
      onFocus: this.handleFocus,
      value,
    } })
  }

  renderNoResults() {
    const { noResultsDescription, noResultsMessage } = this.props

    return (
      <div className='message empty'>
        <div className='header'>{noResultsMessage}</div>
        {noResultsDescription && (
          <div className='description'>{noResultsDescription}</div>
        )}
      </div>
    )
  }

  /**
   * Offset is needed for determining the active item for results within a
   * category. Since the index is reset to 0 for each new category, an offset
   * must be passed in.
   */
/*
  renderResult({ childKey, ...result }, index, _array, offset = 0) {
    const { resultRenderer } = this.props
    const { selectedIndex } = this.state
    const offsetIndex = index + offset

    return (
      <SearchResult
        key={childKey || result.title}
        active={selectedIndex === offsetIndex}
        onClick={this.handleItemClick}
        renderer={resultRenderer}
        {...result}
        id={offsetIndex} // Used to lookup the result on item click
      />
    )
  }

  renderResults() {
    const { results } = this.props

    return _.map(results, this.renderResult)
  }

  renderCategories() {
    const { categoryRenderer, results: categories } = this.props
    const { selectedIndex } = this.state

    let count = 0

    return _.map(categories, ({ childKey, ...category }, name, index) => {
      const categoryProps = {
        key: childKey || category.name,
        active: _.inRange(selectedIndex, count, count + category.results.length),
        renderer: categoryRenderer,
        ...category,
      }
      const renderFn = _.partialRight(this.renderResult, count)

      count = count + category.results.length

      return (
        <SearchCategory {...categoryProps}>
          {category.results.map(renderFn)}
        </SearchCategory>
      )
    })
  }

  renderMenuContent() {
    const { category, showNoResults, results } = this.props

    if (_.isEmpty(results)) {
      return showNoResults ? this.renderNoResults() : null
    }

    return category ? this.renderCategories() : this.renderResults()
  }

  renderResultsMenu() {
    const { open } = this.state
    const resultsClasses = open ? 'visible' : ''
    const menuContent = this.renderMenuContent()

    if (!menuContent) return

    return <SearchResults className={resultsClasses}>{menuContent}</SearchResults>
  }


*/
	render() {
    /* TODO
    debug('render()')
    debug('props', this.props)
    debug('state', this.state)
    */
		const {
      aligned, category, fluid, loading, size,
      className = null, ...rest
		} = this.properties;
    const { searchClasses, focus, open } = this.state;

    //const children: DNode[] = [];
    const ElementType = getElementType(this, this.properties);
    const props = {
      ...rest,
			classes: this.classes(
        CSS.ui,
        //open && 'active visible',
        ...classy.values(CSS, {size}),
        searchClasses,
        ...classy.keys(CSS, {category, fluid, focus, loading}),
        ...classy.valueKeys(CSS, {aligned}),
  			CSS.search
      ).fixed(...this.fixed)

		}
    /* TODO FIXME
    const [htmlInputProps, rest] = partitionHTMLInputProps(unhandled, htmlInputAttrs)

    return (
      <ElementType
        {...rest}
        className={classes}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
      >
        {this.renderSearchInput(htmlInputProps)}
        {this.renderResultsMenu()}
      </ElementType>
    */
		return v(ElementType, props, this.children);
	}
}
