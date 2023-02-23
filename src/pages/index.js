import React from 'react'
import { Outlet } from 'react-router-dom'

import About from './AboutPage'
import AuthWrapper from './AuthWrapper'
import Cart from './CartPage'
import Checkout from './CheckoutPage'
import Home from './HomePage'
import PrivateRoute from './PrivateRoute'
import Products from './ProductsPage'
import SingleProduct from './SingleProductPage'
import Error from './ErrorPage'
import { Navbar, Sidebar, Footer } from '../components'

const Pages = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  )
}

export {
  About,
  AuthWrapper,
  Cart,
  Checkout,
  Home,
  PrivateRoute,
  Products,
  SingleProduct,
  Error,
}

export default Pages
