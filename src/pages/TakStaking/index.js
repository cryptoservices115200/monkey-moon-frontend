import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

import { useWeb3React } from "@web3-react/core";
import { Hearts } from  'react-loader-spinner';
import Web3 from 'web3';
import LogoFooterComponent from "../../components/LogoFooterComponent";
import AmountImg from '../../assets/images/amount.svg';
import ClockImg from '../../assets/images/clock.svg';
import StarImg from '../../assets/images/star.svg';
import BNBImg from '../../assets/images/bnb.png';
import MonkeyImg from '../../assets/images/monkey.png';
import './index.scss';
import { EtherscanProvider } from '@ethersproject/providers';

//handsome
import { CONTRACTS, CONTRACTS_TYPE } from '../../utils/constants';
import { injected } from "../../components/wallet/connectors";



let web3 ;

const TakStaking = (props) => {


    const { active, account, library, chainId, connector, activate, deactivate } = useWeb3React();
    let metadata0 = CONTRACTS[CONTRACTS_TYPE.TAKTOKEN][4]?.abi;
    let addr0 = CONTRACTS[CONTRACTS_TYPE.TAKTOKEN][4]?.address;

    let metadata1 = CONTRACTS[CONTRACTS_TYPE.TAKTOKENSTAKE][4]?.abi;
    let addr1 = CONTRACTS[CONTRACTS_TYPE.TAKTOKENSTAKE][4]?.address;

    const [approveAmount, setAmountValue] = useState(0);
    const [claimAmount, setClaimAmount] = useState(0);
    const [amountStake, setAmountStake] = useState(0);
    const [lockduration, setLockDuration] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
            if (account && chainId && library) {
                web3 = new Web3(library.provider);
                let contract0 = new web3.eth.Contract(metadata0, addr0);
                console.log(contract0);

                try
                {
                    // let approve = await contract1.methods.approvedAddresses(account).call();
                    let allow_result = await contract0.methods.allowance(account, addr1).call();
                    console.log(allow_result);
                    setAmountValue(allow_result);
                }
                catch(err)
                {
                    console.log(err);
                }
            }
        })();
    }, [chainId, library, account])


    // if (account && chainId && library) {

    // }




    const chartOptions = {
        chart: {
            type: 'area',
            id: "basic-bar",
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            horizontalAlign: 'left'
        },
        labels: [30, 40, 45, 50, 49, 60, 70, 91],
        xaxis: {
            categories: [17, 18, 19, 20, 21, 22, 23, 24]
        },
        stroke: {
            curve: 'straight'
        },
        tooltip: {
            enabled: true
        },
        theme: {
            mode: 'dark'
        },
        colors: ['#F001F4']
    }

    const chartSeries = [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]

    // const changeStakeAmount = () => {

    // }

    function connect() {
        setLoading(true);
        activate(injected, async (error) => {
            console.log(error);
        });
        setLoading(false);
    }


    const changeStakeAmount = (e) => {
        setAmountStake(e.target.value);
    }


    async function approve() {
        if (account && chainId && library) {
            setLoading(true);
            web3 = new Web3(library.provider);
            let contract0 = new web3.eth.Contract(metadata0, addr0);
            let contract1 = new web3.eth.Contract(metadata1, addr1);
            console.log(contract0);

            try
            {
                // let approve = await contract1.methods.approvedAddresses(account).call();
                let allow_result = await contract0.methods.approve(addr1, 9999999).send({from: account});
                setAmountValue(allow_result);

                let amount_reward = await  contract0.methods.getAmountClaimable().call();
                setClaimAmount(amount_reward);
            }
            catch(err)
            {
                console.log(err);
            }
            setLoading(false);
        }
    }

    async function clickStake() {
        if(amountStake > 10000)
        {
            alert("Max amount over.");
            return;
        }

        if (account && chainId && library) {

            setLoading(true);
            web3 = new Web3(library.provider);

            let contract1 = new web3.eth.Contract(metadata1, addr1);
            console.log(contract1);
            console.log(account, lockduration);

            try
            {
                // let approve = await contract1.methods.approvedAddresses(account).call();
                let mint_result = await contract1.methods.stake(amountStake, lockduration).send({from: account});
                
            }
            catch(err)
            {
                console.log(err);
            }
            setLoading(false);
        }
    }

    async function clickUnStake() {
        if (account && chainId && library) {

            setLoading(true);
            web3 = new Web3(library.provider);

            let contract1 = new web3.eth.Contract(metadata1, addr1);
            console.log(contract1);
            console.log(account, lockduration);

            try
            {
                // let approve = await contract1.methods.approvedAddresses(account).call();
                let mint_result = await contract1.methods.unstake().send({from: account});
                
            }
            catch(err)
            {
                console.log(err);
            }
            setLoading(false);
        }
    }

    async function clickClaim() {
        if (account && chainId && library) {

            setLoading(true);
            web3 = new Web3(library.provider);

            let contract1 = new web3.eth.Contract(metadata1, addr1);
            console.log(contract1);
            console.log(account, lockduration);

            try
            {
                // let approve = await contract1.methods.approvedAddresses(account).call();
                let mint_result = await contract1.methods.claim().send({from: account});
                
            }
            catch(err)
            {
                console.log(err);
            }
            setLoading(false);
        }   
    }

    const clickLockDuration = (day) => {
        setLockDuration(day);
    }

    //amountStake
    if(loading)
    {  
        return (
            <div className="staking-container">
                <div style={{margin:'15% 40%'}}>
                    <Hearts color="#F001F4" height={280} width={280}/>
                </div>
            </div>
        )
    }
    else
    return (
        <div className="staking-container">
            <div className="gradient-font staking-container-title">STAKING</div>
            <div className="main">
                <Row>
                    <Col sm={12} lg={12} xl={7}>
                        <div className="staking-container-left">
                            <div className="staking-container-left-top">
                                <div className="title">
                                    Available Staked TAK Balance 10'000
                                </div>
                                <div className="stake-component ph-hide wnd-show">
                                    <div className="title">
                                        <img src={AmountImg} alt="amount" />
                                        Stake Amount
                                    </div>
                                    <div className="info">
                                        <input type='number' className='stake-amount' placeholder = 'Amount' onChange={changeStakeAmount} />
                                        {/* <div className="">Amount</div> */}
                                        <div className="">10000 <span>max</span></div>
                                    </div>
                                </div>
                                <div className="stake-component ph-show wnd-hide">
                                    <div className="info stake-component-first">
                                        <div className="title">
                                            <img src={AmountImg} alt="amount" />
                                            Stake Amount
                                        </div>
                                        <div className="">10'000 <span>max</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lock-component">
                                    <div className="title">
                                        <img src={ClockImg} alt="clock" />
                                        Lock in period (Days)
                                    </div>
                                    <div className="info">
                                        <div className={`item ${lockduration == 0 ? 'active' : ''}`} onClick={() => clickLockDuration(0)}>0</div>
                                        <div className={`item ${lockduration == 1 ? 'active' : ''}`} onClick={() => clickLockDuration(1)}>1</div>
                                        <div className={`item ${lockduration == 2 ? 'active' : ''}`} onClick={() => clickLockDuration(2)}>2</div>
                                        <div className={`item ${lockduration == 3 ? 'active' : ''}`} onClick={() => clickLockDuration(3)}>3</div>
                                        <div className={`item ${lockduration == 4 ? 'active' : ''}`} onClick={() => clickLockDuration(4)}>4</div>
                                        <div className={`item ${lockduration == 52 ? 'active' : ''}`} onClick={() => clickLockDuration(52)}>52</div>
                                    </div>
                                </div>
                                <div className="stake-component ph-hide wnd-show">
                                    <div className="title">
                                        <img src={StarImg} alt="star" />
                                        Rewards
                                    </div>
                                    <div className="info">
                                        <div></div>
                                        <div><span className="pink-font">{claimAmount}</span> <span>$TAK</span></div>
                                    </div>
                                </div>
                                <div className="stake-component ph-show wnd-hide">
                                    
                                    <div className="info">
                                    <div className="title">
                                        <img src={StarImg} alt="star" />
                                        Rewards
                                    </div>
                                        <div><span className="pink-font">{claimAmount}</span> <span>$TAK</span></div>
                                    </div>
                                </div>
                                <div className="explain-component">
                                    <div className="left">Only one TAK Staking per wallet is allowed. And, the minimum of the "TAB" TAK staked will be locked in for the full duration of the stake period.</div>
                                    <div className="right ph-hide wnd-show">
                                        On BSCscan.com<br />View Contract
                                        <img src={BNBImg} alt="bnb_image" />
                                    </div>
                                    <div className="right ph-show wnd-hide">
                                        View Contract
                                        <div>
                                            On BSCscan.com
                                            <img src={BNBImg} alt="bnb_image" />
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="staking-container-left-bottom">
                                {!account && (
                                    <div className="button-group">
                                        <div className="button" onClick={connect}>Connect Wallet</div>
                                    </div>
                                )}

                                {account && (approveAmount > 0) && (
                                    <div className="button-group">
                                        <div className="button" onClick={clickStake}>STAKE</div>
                                        <div className="button" onClick={clickUnStake}>UNSTAKE</div>
                                        <div className="button" onClick={clickClaim}>CLAIM</div>
                                    </div> )
                                }

                                {account && (approveAmount == 0) && (
                                    <div className="button-group">
                                        <div className="button" onClick={approve}>approve</div>
                                    </div> )
                                }
                                <div className="view-history white-btn">View History</div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} lg={12} xl={5}>
                        <div className="staking-container-right">
                            <div className="staking-container-right-top">
                                <Row className="ph-hide wnd-show">
                                    <Col sm={12} md={6}>
                                        <div className="title">Market Data</div>
                                        <div className="detail">
                                            <div className="sub-title">Total Tak Reward Pool</div>
                                            <div className="info">X TAK</div>
                                        </div>
                                        <div className="detail">
                                            <div className="sub-title">Total Tak Rewards Left</div>
                                            <div className="info">X TAK</div>
                                        </div>
                                        <div className="detail">
                                            <div className="sub-title">TAK Circ. Supply Staked</div>
                                            <div className="info">X%</div>
                                        </div>
                                        <div className="detail">
                                            <div className="sub-title">TVL</div>
                                            <div className="info">$X</div>
                                        </div>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <div className="title">My Data</div>
                                        <div className="detail">
                                            <div className="sub-title">My TAK Staked</div>
                                            <div className="info">X TAK</div>
                                        </div>
                                        <div className="detail">
                                            <div className="sub-title">My TAK Earned</div>
                                            <div className="info">X TAK</div>
                                        </div>
                                        <div className="detail">
                                            <div className="sub-title">Locked Until</div>
                                            <div className="info">XX/XX/XX</div>
                                        </div>
                                        <div className="detail">
                                            <div className="sub-title">APY</div>
                                            <div className="info">X%</div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="ph-show wnd-hide">
                                </div>
                                <div className="chart-option">
                                    <div className="">STAKING REWARD</div>
                                    <div className="item-list">
                                        <span className="item">H</span>
                                        <span className="item">D</span>
                                        <span className="item">W</span>
                                        <span className="item">M</span>
                                        <span className="item">ALL</span>
                                    </div>
                                </div>
                                <ReactApexChart type="area" options={chartOptions} series={chartSeries} height={200}/>
                            </div>
                            <div className="staking-container-right-bottom">
                                <div className="button">
                                     Tutorial Video
                                </div>
                                <img src={MonkeyImg} alt="monkey_image" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <LogoFooterComponent />
        </div>
    );
}

export default TakStaking;