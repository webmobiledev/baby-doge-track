import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import BigNumber from 'bignumber.js'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'

import ERC20ABI from '../../abis/erc20ABI.json';
import Info from "../../components/Info";
import Panel from "../../components/Panel";
import AutoRow from "../../components/AutoRow";
import StyledInput from "../../components/Input";

import { getPrice, getPeriodVolume, getTotalTradeAmount } from "../../utils/bitquery";
import { BIG_ZERO } from "../../utils/bigNumber";
import constants from "../../utils/constants";
import FormatterBalance from "../../utils/formatBalance"
import { DividerWithText, DividerWithOutText } from '../../components/Divider'
import { AppContext } from "../../App";


const PredictManager = () => {
  const { library, account } = useWeb3React()
  const { state: { tradeData } } = useContext(AppContext);

  const [totalEarned, setTotalEarned] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [estimatedAmount, setEstimatedAmount] = useState(tradeData.estimatedAmount);
  const [estimatedUsd, setEstimatedUsd] = useState(tradeData.estimatedUsd);

  const fetchBalance = async (earned, multi) => {
    try {
      const contract = new ethers.Contract(constants.BabyDoge.token, ERC20ABI, library.getSigner());
      const amount = await contract.balanceOf(account);
      const price = await getPrice(constants.BabyDoge.token);

      earned = Number(earned)
      multi = Number(multi)

      setEstimatedAmount(amount.add(earned));
      setEstimatedUsd(amount.add(earned * multi) * price);

    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log('start effecting');
    if (account) {
      console.log('start calling');
      fetchBalance(0, 0)
    }
  }, [account])

  const handleChangeInputEarned = async (e) => {
    setTotalEarned(e.target.value);
    await fetchBalance(e.target.value, multiplier);
  }

  const handleChangeInputMultplier = async (e) => {
    setMultiplier(e.target.value);
    await fetchBalance(totalEarned, e.target.value);
  }

  return (
    <Panel>
      <Info title={'Total BabyDoge Earned'} value={
        <StyledInput type={'text'} id={'babydoge_earned'} value={totalEarned} onChange={handleChangeInputEarned} />
      }/>
      <Info title={'Estimated BabyDoge Gained'} value={FormatterBalance(estimatedAmount.toString())}/>
      <DividerWithOutText/>
      <Info title={'BabyDoge Volume Multiplier'} value={
        <StyledInput type={'text'} id={'babydoge_multiplier'} value={multiplier} onChange={handleChangeInputMultplier} />
      }/>
      <Info title={'Estimated BabyDoge Gained'} value={`$${FormatterBalance(estimatedUsd.toString())}`}/>
    </Panel>
  )
}

export default PredictManager;