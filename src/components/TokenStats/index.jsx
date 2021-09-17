import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import BigNumber from 'bignumber.js'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'

import ERC20ABI from '../../abis/erc20ABI.json';
import Info from "../../components/Info";
import Panel from "../../components/Panel";
import AutoRow from "../../components/AutoRow";
import { getMarketCap, getPrice, getPeriodVolume, getTotalTradeAmount } from "../../utils/bitquery";
import { BIG_ZERO } from "../../utils/bigNumber";
import constants from "../../utils/constants";
import FormatterBalance from "../../utils/formatBalance"
import { DividerWithText, DividerWithOutText } from '../../components/Divider'
import { AppContext } from "../../App";

const TokenStats = () => {
  const { library, account } = useWeb3React()
  const { state: { tradeData } } = useContext(AppContext);
  console.log(tradeData)

  const [totalBalance, setTotalBalance] = useState(new BigNumber(tradeData.totalBalance));
  const [totalUSDBalance, setTotalUSDBalance] = useState(new BigNumber(tradeData.totalBalance * tradeData.usdPrice));
  const [usdPrice, setUsdPrice] = useState(tradeData.usdPrice);
  const [marketCap, setMarketCap] = useState(tradeData.marketCap);
  const [oneDayVolume, setOneDayVolume] = useState(tradeData.oneDayVolume);
  const [oneMonthVolume, setOneMonthVolume] = useState(tradeData.monthVolume);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    const fetchBalance = async() => {
      console.log('account=', account);
      const contract = new ethers.Contract(constants.BabyDoge.token, ERC20ABI, library.getSigner());
      console.log('contract=', contract)
      try {
        // Get amount of token address
        const amount = await contract.balanceOf(constants.BabyDoge.token);
        const price = await getPrice(constants.BabyDoge.token);
        
        setTotalBalance(amount);
        setTotalUSDBalance(amount * price);
        setUsdPrice(price);

        setMarketCap(await getMarketCap(constants.BabyDoge.token));
        setOneDayVolume(await getPeriodVolume(constants.BabyDoge.token, 1 * 24 * 60 * 60 * 1000));
        setOneMonthVolume(await getPeriodVolume(constants.BabyDoge.token, 30 * 24 * 60 * 60 * 1000));

        const totalTradeAmount = await getTotalTradeAmount(constants.BabyDoge.token);
        setTotalEarned(totalTradeAmount);

      } catch (e) {
        console.error(e)
      }
    }
    console.log('start effecting');
    if (account) {
      console.log('start calling');
      fetchBalance()
    }
  }, [account])

  return (
    <Panel>
      <Info title={'Your BabyDoge Balance'} value={FormatterBalance(totalBalance.toString())} color={'#59BBE8'} size={'54px'} marginTop={10}/>
      <Info title={'Your BabyDoge USD Balance'} value={'$' + FormatterBalance(totalUSDBalance.toString())} color={'#59BBE8'} size={'45px'} marginTop={10}/>

      <DividerWithText>BabyDoge Token Stats</DividerWithText>
      <AutoRow gap={15}>
        <Info title={'Price'} value={usdPrice.toFixed(14)}/>
        <Info title={'Market Cap'} value={'$' + FormatterBalance(marketCap.toString())}/>
        <Info title={'24-hour Volume'} value={'$' + FormatterBalance(oneDayVolume.toString())}/>
        <Info title={'Monthly Volume'} value={'$' + FormatterBalance(oneMonthVolume.toString())}/>
      </AutoRow>
    </Panel>
  )
}

export default TokenStats;