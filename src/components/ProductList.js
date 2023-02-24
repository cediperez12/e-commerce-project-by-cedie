import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext()

  if (filtered_products.length <= 0) {
    return <h4>Sorry, no products found.</h4>
  }

  if (grid_view) {
    return <GridView products={filtered_products} />
  } else {
    return <ListView products={filtered_products} />
  }
}

export default ProductList
