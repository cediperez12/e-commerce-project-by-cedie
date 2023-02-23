import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url, single_product_url } from '../utils/constants'
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

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  product_loading: false,
  product_error: false,
  product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios(url)
      const data = response.data

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error.response })
    }
  }

  const fetchProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios(`${single_product_url}${id}`)
      const data = response.data

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error.response })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
