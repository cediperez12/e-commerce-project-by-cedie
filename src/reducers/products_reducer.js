import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return {
      ...state,
      isSidebarOpen: true,
    }
  }

  if (action.type === SIDEBAR_CLOSE) {
    return {
      ...state,
      isSidebarOpen: false,
    }
  }

  if (action.type === GET_PRODUCTS_BEGIN) {
    return {
      ...state,
      products_loading: true,
      products_error: false,
    }
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    const { payload } = action
    const featuredProducts = payload.filter(
      (product) => product.featured === true
    )

    return {
      ...state,
      products_loading: false,
      products: payload,
      featured_products: featuredProducts,
    }
  }

  if (action.type === GET_PRODUCTS_ERROR) {
    const { payload } = action
    console.log('error', payload)

    return {
      ...state,
      products_loading: false,
      products_error: false,
    }
  }

  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      product_loading: true,
      product_error: false,
    }
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    const { payload } = action

    return {
      ...state,
      product_loading: false,
      product: payload,
    }
  }

  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    const { payload } = action
    console.log('error', payload)

    return {
      ...state,
      product_loading: false,
      product_error: true,
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
