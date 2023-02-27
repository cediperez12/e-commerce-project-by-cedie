import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const temp = state.cart.find((item) => item.id === id + color)

    if (temp) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          const { max, amount: oldAmount } = item
          let newAmount = amount + oldAmount

          newAmount = newAmount > max ? max : newAmount
          item.amount = newAmount
        }

        return item
      })

      return {
        ...state,
        cart: tempCart,
      }
    } else {
      const newItem = {
        id: id + color,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }

      return {
        ...state,
        cart: [...state.cart, newItem],
      }
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload
    const tempCart = state.cart.filter((item) => item.id !== id)

    return {
      ...state,
      cart: tempCart,
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload

    const newCart = state.cart.map((item) => {
      if (item.id === id) {
        let { amount, max } = item

        let newAmount = value === 'inc' ? amount + 1 : amount - 1
        if (newAmount > max) {
          newAmount = max
        } else if (newAmount <= 0) {
          newAmount = 1
        }

        item.amount = newAmount
      }

      return item
    })

    return {
      ...state,
      cart: newCart,
    }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, currVal) => {
        const { amount, price } = currVal

        total.total_items += amount
        total.total_amount += amount * price

        return total
      },
      { total_items: 0, total_amount: 0 }
    )
    return {
      ...state,
      total_items,
      total_amount,
    }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
