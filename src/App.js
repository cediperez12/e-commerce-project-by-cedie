import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import {
  Home,
  About,
  Cart,
  Products,
  SingleProduct,
  Checkout,
  Error,
} from './pages'
import Pages from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
