export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(number / 10)
  return newNumber
}

export const getUniqueValues = (products, value) => {
  let uniqueValues = products.map((product) => product[value])

  if (value === 'colors') {
    uniqueValues = uniqueValues.flat()
  }

  return ['all', ...new Set(uniqueValues)]
}
