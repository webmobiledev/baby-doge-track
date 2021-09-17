import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import Info from "../../components/Info";
import Panel from "../../components/Panel";
import AutoRow from "../../components/AutoRow";

import TokenStats from "../../components/TokenStats";
import Reward from "../../components/Reward";
import PredictionMaker from "../../components/PredictionMaker";
import WalletHistory from "../../components/Wallet";

import BabyDogeImg from "../../assets/babydoge.png";
import RewardImg from '../../assets/ico-rewards.png';
import PredictionImg from '../../assets/ico_predictions.png';
import WalletImg from '../../assets/ico_wallet.png';
import StyledInput from "../../components/Input";

import FormatterBalance from '../../utils/formatBalance'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    56, // BSC Mainet
  ]
});

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  max-width: 750px;
  padding: 0 15px;
  
  > div {
    margin-top: 20px;
  }
`;
const ImgWrapper = styled.img`
  width: ${(props) => (props.width ? props.width : '50px')};
`;
const TitleWrapper = styled.div`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '20px')};
  .title {
    font-size: ${(props) => (props.fontSize ? props.fontSize : '28px')};
    font-weight: bold;
  }
  
  .subtitle {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .description {
    font-size: 10px;
    margin-top: 10px;
  }
`;

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React()

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  )
}

const TrackView = () => {

  const { chainId, account, activate, active } = useWeb3React()

  // useEffect(() => {
  //   if (account) {
  //     console.log('Successfully logined');
  //   } else {
  //     activate(injectedConnector)
  //   }
  // }, [account])

  // return (
  //   <Web3ReactProvider getLibrary={getLibrary}>
  //     <Wallet />
  //   </Web3ReactProvider>
  // )

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wrapper>
        <Wallet />
        <div>
          <ImgWrapper src={BabyDogeImg} width={'170px'} marginBottom={'40px'}/>
          <TitleWrapper fontSize={'40px'}>
            <span className={'title'}>BabyDoge Tracker</span>
          </TitleWrapper>

          <TokenStats />
        </div>

        <div>
          <ImgWrapper src={RewardImg} width={'40px'}/>
          <TitleWrapper>
            <div className={'subtitle'}>Rewards</div>
            <div className={'description'} style={{paddingLeft:'50px', paddingRight:'50px'}}>
              BabyDoge token features a 5% fee that is redistributed as rewards to holders. That means that the more active
              is the Community, including you, the more rewards in Baby Doge Coin you'll have!
            </div>
          </TitleWrapper>
          
          <Reward />
        </div>

        <AutoRow gap={40}>
          <div>
            <div style={{minHeight: '140px', alignItems: 'center'}}>
              <ImgWrapper src={PredictionImg} width={'50px'} marginBottom={'10px'}/>
              <TitleWrapper>
                <div className={'title'}>Prediction Maker</div>
                <div className={'description'}>Curious about the future? Use the Prediction Maker to enter different scenarios for your future BabyDoge
                  rewards!
                </div>
              </TitleWrapper>
            </div>

            <PredictionMaker/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{minHeight: '140px', alignItems: 'center', display: 'table'}}>
              <div style={{display:'table-cell', verticalAlign: 'middle'}}>
                <ImgWrapper src={WalletImg} width={'50px'} />
                <TitleWrapper>
                  <div className={'title'}>Wallet Activity</div>
                </TitleWrapper>
              </div>
            </div>
            <WalletHistory />
          </div>
        </AutoRow>
      </Wrapper>
    </Web3ReactProvider>
  )
};

export default TrackView;