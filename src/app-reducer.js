export const initialState = {
  tradeData: {
    totalBalance: 446090000000000,
    usdPrice: 0.00000000104900,
    marketCap: 285800000,
    oneDayVolume: 3300000,
    monthVolume: 93200000,
    totalIn: 401300000000000,
    totalOut: 4500000000,
    balanceWithoutReward: 401300000000000,
    worthVal: 841800,
    estimatedAmount: 909000000000,
    estimatedUsd: 952.39,
  },
}

export const appReducer = (state, action) => {
  return {
    ...state,
    [action.type]: action.payload,
  }
}
