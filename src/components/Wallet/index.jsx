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

const WalletHistory = () => {

  const { library, account } = useWeb3React()
  const { state: { tradeData } } = useContext(AppContext);

  const [balanceWithoutReward, setBalanceWithoutReward] = useState(tradeData.balanceWithoutReward);
  const [usdBalanceWithoutReward, setUsdBalanceWithoutReward] = useState(tradeData.worthVal);

  useEffect(() => {
    const fetchBalance = async() => {
      const contract = new ethers.Contract(constants.BabyDoge.token, ERC20ABI, library.getSigner());
      try {
        // Get amount of token address
        const amount = await contract.balanceOf(account);
        const price = await getPrice(constants.BabyDoge.token);

        setBalanceWithoutReward(amount);
        setUsdBalanceWithoutReward(amount * price);

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
    <Panel style={{flex: 1}}>
      <AutoRow gap={10}>
        <Info title={'Total BabyDoge In'} value={FormatterBalance(tradeData.totalIn)}/>
        <Info title={'Total BabyDoge Out'} value={FormatterBalance(tradeData.totalOut)}/>
      </AutoRow>
      <DividerWithOutText/>
      <Info width={150} title={'BabyDoge Balance Without Rewards'} value={FormatterBalance(balanceWithoutReward.toString())}/>
      <Info title={'If you never sold any our your BabyDoge, now you would be worth'} value={`$${FormatterBalance(usdBalanceWithoutReward.toString())}`}/>
    </Panel>
  )
}

export default WalletHistory;
