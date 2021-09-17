import React, { useEffect, useState } from "react";
import styled from "styled-components";

import BigNumber from 'bignumber.js'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'

import ERC20ABI from '../../abis/erc20ABI.json';
import Info from "../../components/Info";
import Panel from "../../components/Panel";
import AutoRow from "../../components/AutoRow";
import { getPrice, getPeriodVolume, getTotalTradeAmount } from "../../utils/bitquery";
import { BIG_ZERO } from "../../utils/bigNumber";
import constants from "../../utils/constants";
import FormatterBalance from "../../utils/formatBalance"

const Reward = () => {


  const { account } = useWeb3React()

  const [totalEarned, setTotalEarned] = useState(0);
  const [totalUSDEarned, setTotalUSDEarned] = useState(0);
  const [oneDayReward, setOneDayReward] = useState(0);
  const [oneDayUSDReward, setOneDayUSDReward] = useState(0);
  const [oneMonthReward, setOneMonthReward] = useState(0);
  const [oneMonthUSDReward, setOneMonthUSDReward] = useState(0);

  useEffect(() => {
    const fetchBalance = async() => {
      try {
        const rewardFee = 0.05;
        const burnFee = 0.29;
        const price = await getPrice(constants.BabyDoge.token);
        
        const totalTradeAmount = await getTotalTradeAmount(constants.BabyDoge.token);
        const usdEarned = totalTradeAmount * rewardFee * (1 - burnFee);
        setTotalUSDEarned(usdEarned);
        setTotalEarned(price <= 0 ? 0 : totalTradeAmount / price);

        const oneDayUSDReward1 = await getPeriodVolume(constants.BabyDoge.token, 1 * 24 * 60 * 60 * 1000) * rewardFee * (1 - burnFee);
        setOneDayUSDReward(oneDayUSDReward1);
        setOneDayReward(price <= 0 ? 0 : oneDayUSDReward1 / price);

        const oneMonthUSDReward1 = await getPeriodVolume(constants.BabyDoge.token, 30 * 24 * 60 * 60 * 1000) * rewardFee * (1 - burnFee);
        setOneMonthUSDReward(oneMonthUSDReward1);
        setOneMonthReward(price <= 0 ? 0 : oneDayUSDReward1 / price);

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
      <AutoRow>
        <Info title={'Total BabyDoge Earned'} value={FormatterBalance(totalEarned.toString())}/>
        <Info title={'Total USD Value Earned'} value={`$${FormatterBalance(totalUSDEarned.toString())}`}/>
        <Info title={'Projected Weekly BabyDoge Rewards'} value={`$${FormatterBalance(oneDayReward.toString())}`}/>
        <Info title={'Projected Weekly USD Rewards'} value={`$${FormatterBalance(oneDayUSDReward.toString())}`}/>
        <Info title={'Projected Monthly BabyDoge Rewards'} value={`$${FormatterBalance(oneMonthReward.toString())}`}/>
        <Info title={'Projected Montly USD Rewards'} value={`$${FormatterBalance(oneMonthUSDReward.toString())}`}/>
      </AutoRow>
    </Panel>
  )
}

export default Reward;