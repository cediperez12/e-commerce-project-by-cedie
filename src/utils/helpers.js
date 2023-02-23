export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(number / 10)
  return newNumber
}

export const getUniqueValues = () => {}
