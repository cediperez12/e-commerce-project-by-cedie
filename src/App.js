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
  PrivateRoute,
  AuthWrapper,
} from './pages'
import Pages from './pages'

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Pages />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </AuthWrapper>
  )
}

export default App
