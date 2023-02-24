import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    console.log()
    const max_price = [...action.payload].sort((a, b) => b.price - a.price)[0]
      ?.price
    const min_price = [...action.payload].sort((a, b) => a.price - b.price)[0]
      ?.price

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        min_price,
        max_price,
        price: max_price,
      },
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    }
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    }
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    }
  }

  if (action.type === SORT_PRODUCTS) {
    const sorted = action.payload.sort((a, b) => {
      if (state.sort === 'price-highest') {
        return b.price - a.price
      } else if (state.sort === 'name-a') {
        return a.name > b.name ? 1 : -1
      } else if (state.sort === 'name-z') {
        return a.name < b.name ? 1 : -1
      } else {
        return a.price - b.price
      }
    })
    return {
      ...state,
      filtered_products: sorted,
    }
  }

  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload,
      },
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    let temp = state.filtered_products.filter((product) =>
      product.name.toLowerCase().includes(state.filters.text)
    )

    if (state.filters.category !== 'all') {
      temp = temp.filter(
        (product) => product.category === state.filters.category
      )
    }

    if (state.filters.company !== 'all') {
      temp = temp.filter((product) => product.company === state.filters.company)
    }

    if (state.filters.color !== 'all') {
      temp = temp.filter((product) =>
        product.colors.includes(state.filters.color)
      )
    }

    if (state.filters.shipping) {
      temp = temp.filter((product) => product.shipping)
    }

    temp = temp.filter((product) => product.price <= state.filters.price)
    return {
      ...state,
      filtered_products: temp,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      sort: 'price-lowest',
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
      },
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
