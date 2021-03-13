import * as React from 'react'
import {
    Header,
    TransferContainer,
    ClaimBtn,
    ClaimBtnContainer,
    Balance,
    TextContainer,
    BtnContainer,
    Select,
    Option,
    Title,
    BalanceContainer,
    Round,
    PrizeContainer
} from './style'
import { ClaimTable, ExchangeForm } from './components'
import WalletProvider from '../../utils/wallet'
import { useSelector } from 'react-redux'
import { Loader } from '../../shared'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../logic/actions/actions'
import { ContractNames, ContractTable, DspEndpoints, eosjsEndPoint } from '../../utils/constants'
import { generateError } from '../../utils/helpers'
import axios from 'axios'
//@ts-ignore
import EosApi from 'eosjs-api'
import RoundStartModel from './components/round-start'
import ExchangeFormSubs from './components/exchange-form-subs/index';


const { useEffect, useState } = React

const options = {
    httpEndpoint: eosjsEndPoint,
}

const eos = EosApi(options)


const RafflePrizePool = () => {
    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [claimedData, setClaimedData] = useState([])
    const [prizeMoney, setPrizeMoney] = useState('0.0000 EOS')
    const [poolMoney, setPoolMoney] = useState('0.0000 EOS')
    const [eosYield, setEosYield] = useState(0)
    const [eosWeight, setEosWeight] = useState(0)
    const [roundStartTime, setRoundStartTime] = useState(' ')
    const [roundEndTime, setRoundEndTime] = useState(' ')
    const [dspEndpoint, setDspEndpoint] = useState('BlockStart Dsp')
    const [userTickets, setUserTickets] = useState(0)
    const [userBal, setUserBal] = useState('0.0000 EOS')


    useEffect(() => {
        const getBalances = async () => {
            const wallet = WalletProvider.getWallet()
            const usertickets = {
                "code": ContractNames.raffleDepositContract,
                "json": true,
                "limit": 1000,
                "scope": ContractNames.raffleDepositContract,
                "table": ContractTable.raffleUserCount
            }

            const userTicketsTab = await fetch(`${eosjsEndPoint}/v1/chain/get_table_rows`, {
                method: 'post',
                body: JSON.stringify(usertickets)
            })

            if (!!wallet) {
                const userbals = await userTicketsTab.json()
                if (userbals.rows.length) {
                    const userbal = userbals.rows.find((entry: any) => entry.account == wallet.auth?.accountName)
                    console.log('userbal-----', userbal)
                    if (userbal) {
                        setUserBal(userbal.balance)
                    }
                }
            }
        }

        if (walletConnected) {
            getBalances()
        }
    }, [walletConnected])


    useEffect(() => {

        const getYield = async () => {
            try {

                const dadTokenRowId = 588

                let eosTokenRatio = 0
                let totalRatio = 0
                let dadReleased = 0
                let dadEosPrice = 0
                let eosSupply = 0

                const dadTokenData = {
                    "code": "swap.defi",
                    "json": true,
                    "limit": 10,
                    "lower_bound": dadTokenRowId,
                    "scope": "swap.defi",
                    "table": "pairs",
                    "table_key": "",
                    "upper_bound": dadTokenRowId
                }

                const usertickets = {
                    "code": ContractNames.raffleDepositContract,
                    "json": true,
                    "limit": 1000,
                    "scope": ContractNames.raffleDepositContract,
                    "table": ContractTable.raffleUserCount
                }

                const winnerlist = {
                    "code": ContractNames.raffleDepositContract,
                    "json": true,
                    "limit": 1000,
                    "scope": ContractNames.raffleDepositContract,
                    "table": ContractTable.prizeWinnerTable
                }

                const requests = [
                    fetch('https://eos.greymass.com/v1/chain/get_table_rows', {
                        method: 'post',
                        body: JSON.stringify(dadTokenData)
                    }),
                    eos.getTableRows({
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.tokenDist,
                        json: 'true'
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.roundTable
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.raffleDepositContract,
                        scope: ContractNames.raffleDepositContract,
                        table: ContractTable.raffleTotalStake
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.weightTable
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.raffleDepositContract,
                        table: ContractTable.raffleTotalStake,
                        scope: ContractNames.raffleDepositContract
                    }),
                    fetch(`${eosjsEndPoint}/v1/chain/get_table_rows`, {
                        method: 'post',
                        body: JSON.stringify(winnerlist)
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.raffleDepositContract,
                        table: ContractTable.raffleRoundTab,
                        scope: ContractNames.raffleDepositContract
                    }),
                    fetch(`${eosjsEndPoint}/v1/chain/get_table_rows`, {
                        method: 'post',
                        body: JSON.stringify(usertickets)
                    })
                ]

                const responses = await axios.all(requests)
                const dadTokenRes = await responses[0].json()
                const ratioTable = responses[1]
                const roundTable = responses[2]
                const eosSupplyTable = responses[3]
                const weightTable = responses[4]
                const prizeMoneyTable = responses[5]
                const prizeWinnerTab = await responses[6].json()
                const prizeRoundTab = responses[7]
                const userTicketsTab = await responses[8].json()

                if (ratioTable.rows.length) {
                    const RAFEosTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '4,RAFEOS')
                    if (RAFEosTokenRatio.length) {
                        eosTokenRatio = parseFloat(RAFEosTokenRatio[0].weight)
                        setEosWeight(parseFloat(RAFEosTokenRatio[0].weight))
                    }
                }

                if (weightTable.rows.length) {
                    totalRatio = parseFloat(weightTable.rows[0].totweight)
                }

                if (roundTable.rows.length) {
                    dadReleased = parseFloat(roundTable.rows[0].currround_amount.split(' ')[0])
                }

                if (eosSupplyTable.rows.length) {
                    eosSupply = parseFloat(eosSupplyTable.rows[0].balance.split(' ')[0])
                }

                if (dadTokenRes.rows.length) {
                    dadEosPrice = parseFloat(dadTokenRes.rows[0].price1_last)
                }

                if (prizeMoneyTable.rows.length) {
                    setPoolMoney(prizeMoneyTable.rows[0].balance)
                    const money = (parseFloat(prizeMoneyTable.rows[0].balance) * 75 / 100).toFixed(4);
                    setPrizeMoney(money.toString() + ' ' + prizeMoneyTable.rows[0].balance.toString().split(' ')[1])
                }

                if (prizeWinnerTab.rows.length) {
                    setClaimedData(prizeWinnerTab.rows.reverse())
                }

                if (prizeRoundTab.rows.length) {
                    if (prizeRoundTab.rows[0].curround != 0 && prizeRoundTab.rows[0].curround != '0') {
                        setRoundStartTime(new Date(prizeRoundTab.rows[0].round_started).toString().slice(0, 25) + ' ' + 'UTC')
                        setRoundEndTime(new Date(prizeRoundTab.rows[0].round_ends).toString().slice(0, 25) + ' ' + 'UTC')
                    }
                }

                if (userTicketsTab.rows.length) {
                    setUserTickets(userTicketsTab.rows.length)
                }

                console.log('data----', eosTokenRatio, dadReleased, dadEosPrice)
                let x = (eosTokenRatio / totalRatio) * dadReleased * dadEosPrice
                const dadAnnualYield = x / eosSupply * 100 * 24 * 365
                if (dadAnnualYield) {
                    setEosYield(dadAnnualYield)
                }
            } catch (e) {
                console.log('something went wrong in getting yield ', e)
            }
        }
        getYield()
    }, [])

    const handleClaim = async () => {

        try {
            setLoading(true)
            const wallet = WalletProvider.getWallet()
            console.log('wallet----', wallet)
            if (!!wallet) {
                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.raffleDepositContract,
                            name: 'claim',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                owner: wallet?.auth?.accountName,
                                permission: wallet?.auth?.accountName
                            }
                        }
                    ]
                },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    })

                console.log('response ', response)
                dispatch(showNotification({ notificationText: 'Claim Successful', notificationType: 1 }))
            }
        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Claim Failed'), notificationType: 2 }))
        } finally {
            setLoading(false)
        }
    }

    const handleDspEndpoint = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log('dsp---', event.target.value)
        setDspEndpoint(event.target.value as string);
        const endpoint = getDspEndpoint(event.target.value as string);
        WalletProvider.resetEndpoint(endpoint.endpoint, endpoint.protocol)
    };

    const getDspEndpoint = (endpoint: string): any => {
        switch (endpoint) {
            case 'BlockStart Dsp':
                return DspEndpoints.blockstartdsp
            case 'EOS-USA Dsp':
                return DspEndpoints.eosusadsp
            case 'DappSolutions Dsp':
                return DspEndpoints.dappsolutions
            default:
                return DspEndpoints.blockstartdsp
        }
    }

    return (
        <div>
            <Title>
                DAD Daily Raffle (NOT a no-loss pool)
            </Title>

            <Header>
                <PrizeContainer>
                    <Balance>
                        Total Pool : {"  "}
                    </Balance>
                    <Balance>
                        {poolMoney}
                    </Balance>
                </PrizeContainer>
                <BtnContainer>
                    <Select
                        id="demo-simple-select"
                        name="dropdown"
                        value={dspEndpoint}
                        onChange={handleDspEndpoint}
                    >
                        <Option value={"BlockStart Dsp"}>BlockStart Dsp</Option>
                        <Option value={"DappSolutions Dsp"}>DappSolutions Dsp</Option>
                        <Option value={"EOS-USA Dsp"}>EOS-USA Dsp</Option>
                    </Select>
                    <RoundStartModel />
                </BtnContainer>
            </Header>
            <TextContainer>
                <BalanceContainer>
                    <Balance>
                        Prize Money : {"  "}
                    </Balance>
                    <Balance>
                        {prizeMoney}
                    </Balance>
                </BalanceContainer>
                <BalanceContainer>
                    <Round>
                        Next Draw : {"  "}
                    </Round>
                    {/* <Round>
                        {" - "}
                    </Round> */}
                    <Round>
                        {roundEndTime}
                    </Round>
                </BalanceContainer>
            </TextContainer>
            <TextContainer>
                <BalanceContainer>
                    <Balance>
                        Total Number Of Users:
                    </Balance>
                    <Balance>
                        {userTickets}
                    </Balance>
                </BalanceContainer>
                <BalanceContainer>
                    <Balance>
                        Your tickets for current round : {"  "}
                    </Balance>
                    <Balance>
                        {userBal}
                    </Balance>
                </BalanceContainer>
            </TextContainer>
            {/* <Header>
                 <PrizeContainer>
                    <Balance>
                        Total Pool : {"  "}
                    </Balance>
                    <Balance>
                        {poolMoney}
                    </Balance>
                </PrizeContainer> 
                <PrizeContainer>
                    <Balance>
                        Prize Money : {"  "}
                    </Balance>
                    <Balance>
                        {prizeMoney}
                    </Balance>
                </PrizeContainer>
                <PrizeContainer>
                    <Balance>
                        Your tickets for current round : {"  "}
                    </Balance>
                    <Balance>
                        {userBal}
                    </Balance>
                </PrizeContainer>

                <BtnContainer>
                    <Select
                        id="demo-simple-select"
                        name="dropdown"
                        value={dspEndpoint}
                        onChange={handleDspEndpoint}
                    >
                        <Option value={"BlockStart Dsp"}>BlockStart Dsp</Option>
                        <Option value={"DappSolutions Dsp"}>DappSolutions Dsp</Option>
                        <Option value={"EOS-USA Dsp"}>EOS-USA Dsp</Option>
                    </Select>
                    <RoundStartModel />
                </BtnContainer>
            </Header>
            <TextContainer>
                <BalanceContainer>
                    <Balance>
                        Total Number Of Users:
                    </Balance>
                    <Balance>
                        {userTickets}
                    </Balance>
                </BalanceContainer>
                <BalanceContainer>
                    <Round>
                        Next Draw : {"  "}
                    </Round>
                    {/* <Round>
                        {roundStartTime}
                    </Round> */}
            {/* <Round>
                        {" - "}
                    </Round> 
                    <Round>
                        {roundEndTime}
                    </Round>
                </BalanceContainer>
            </TextContainer>
            <TextContainer>

            </TextContainer> */}

            <TransferContainer>
                <ExchangeForm
                    token="EOS"
                    yieldPercentage={eosYield}
                    borderColor="#E3E3E3"
                    miningWeight={eosWeight}
                />
            </TransferContainer>

            <TransferContainer>
                <ExchangeFormSubs
                    token="EOS"
                    // yieldPercentage={eosYield}
                    borderColor="#E3E3E3"
                    miningWeight={eosWeight}
                />
            </TransferContainer>
            <TransferContainer>
                <ClaimBtnContainer>
                    <ClaimBtn onClick={handleClaim} disabled={loading}>
                        {loading ? <Loader color={"#fff"} /> : "Claim Your Win"}
                    </ClaimBtn>
                </ClaimBtnContainer>
            </TransferContainer>
            <TransferContainer>
                <ClaimTable data={claimedData} />
            </TransferContainer>
        </div>
    )
}

export default RafflePrizePool
