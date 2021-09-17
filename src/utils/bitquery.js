import axios from 'axios';

export const getMarketCap = async (address) => {
  try {
    if (!address) {
      return 0;
    }
    const query = `
    {
      ethereum(network: bsc) {
        dexTrades(
          baseCurrency: {is: "${address}"}
          quoteCurrency: {in: ["0xe9e7cea3dedca5984780bafc599bd69add087d56", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"]}
          exchangeName: {in: ["Pancake v2"]}
        ) {
          quoteCurrency {
            symbol
          }
          baseCurrency {
            symbol
          }
          baseAmount(calculate: sum)
        }
      }
    }
    
    `;
    const { data: { data: { ethereum: { dexTrades } } } } = await axios.post("https://graphql.bitquery.io/", { query });

    const price = await getPrice(address);
    return dexTrades[0] ? dexTrades[0].baseAmount * price : 0
  } catch (error) {
    return 0;
  }
}

export const getPrice = async (address) => {
  try {
    if (!address) {
      return 0
    }
    const query = `
    {
      ethereum(network: bsc) {
        dexTrades(
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
          exchangeName: {in: ["Pancake v2"]}
        ) {
          baseCurrency {
            symbol
          }
          quoteCurrency {
            symbol
          }
          close_price: maximum(of: block, get: quote_price)
        }
      }
    }
    `;
    const { data: { data: { ethereum: { dexTrades } } } } = await axios.post("https://graphql.bitquery.io/", { query });
    return dexTrades[0] ? parseFloat(dexTrades[0].close_price) : 0;
  } catch (error) {
    return 0
  }
}

export const getPeriodVolume = async (address, period) => { // period in milisecond, 24h=1 * 24 * 60 * 60 * 1000
  try {
    if (!address) {
      return 0
    }

    let till = new Date().toISOString();
    let since = new Date(Date.now() - period).toISOString();

    const query = `{
      ethereum(network: bsc) {
        dexTrades(
          date: {since: "${since}", till: "${till}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
          exchangeName: {in: ["Pancake v2"]}
        ) {
          baseCurrency {
            symbol
          }
          quoteCurrency {
            symbol
          }
          tradeAmount(in: USD, calculate: sum)
        }
      }
    }
    `;
    let url = `https://graphql.bitquery.io/`
    let { data: { data: { ethereum: { dexTrades } } } } = await axios.post(url, { query });
    
    return dexTrades && dexTrades[0] ? dexTrades[0].tradeAmount : 0;
  } catch (error) {
    return 0
  }
}

export const getTotalTradeAmount = async (address) => {
  try {
    if (!address) {
      return 0
    }

    const query = `{
      ethereum(network: bsc) {
        dexTrades(
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
          exchangeName: {in: ["Pancake v2"]}
        ) {
          baseCurrency {
            symbol
          }
          quoteCurrency {
            symbol
          }
          tradeAmount(in: USD, calculate: sum)
        }
      }
    }
    `;
    let url = `https://graphql.bitquery.io/`
    let { data: { data: { ethereum: { dexTrades } } } } = await axios.post(url, { query });
    
    return dexTrades && dexTrades[0] ? dexTrades[0].tradeAmount : 0;
  } catch (error) {
    return 0
  }
}
