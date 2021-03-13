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
import {
    ClaimTable,
    ExchangeForm,
    // StakeForm
} from './components'
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


const { useEffect, useState } = React

const options = {
    httpEndpoint: eosjsEndPoint,
}

const eos = EosApi(options)


const DepositPrizePool = () => {
    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()
    // const [claimBalance, setClaimBalance] = useState('0.000000 DAD')
    const [loading, setLoading] = useState(false);
    const [claimedData, setClaimedData] = useState([])
    const [prizeMoney, setPrizeMoney] = useState('0.000000 EOS')
    const [eosYield, setEosYield] = useState(0)
    const [eosWeight, setEosWeight] = useState(0)
    const [roundStartTime, setRoundStartTime] = useState(' ')
    const [roundEndTime, setRoundEndTime] = useState(' ')
    const [dspEndpoint, setDspEndpoint] = useState('BlockStart Dsp')
    const [userTickets, setUserTickets] = useState(0)
    const [totalTickets, setTotalTickets] = useState('0.0000 DPPEOS')

    useEffect(() => {

        const getYield = async () => {
            try {

                const dadTokenRowId = 588

                let eosTokenRatio = 0
                let totalRatio = 0
                let dadReleased = 0
                // let dadReleased1 = 0
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
                    "code": ContractNames.eosPrizePoolContract,
                    "json": true,
                    "limit": 1000,
                    "scope": ContractNames.eosPrizePoolContract,
                    "table": ContractTable.userTicketsTable
                }

                const winnerlist = {
                    "code": ContractNames.eosPrizePoolContract,
                    "json": true,
                    "limit": 1000,
                    "scope": ContractNames.eosPrizePoolContract,
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
                        code: ContractNames.eosPrizePoolContract,
                        scope: ContractNames.eosPrizePoolContract,
                        table: ContractTable.eosPool
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.weightTable
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.eosPrizePoolContract,
                        table: ContractTable.eosPrizeTable,
                        scope: ContractNames.eosPrizePoolContract
                    }),
                    fetch(`${eosjsEndPoint}/v1/chain/get_table_rows`, {
                        method: 'post',
                        body: JSON.stringify(winnerlist)
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.eosPrizePoolContract,
                        table: ContractTable.prizeRoundTable,
                        scope: ContractNames.eosPrizePoolContract
                    }),
                    fetch(`${eosjsEndPoint}/v1/chain/get_table_rows`, {
                        method: 'post',
                        body: JSON.stringify(usertickets)
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.eosPrizePoolContract,
                        table: ContractTable.totalTiketsTable,
                        scope: ContractNames.eosPrizePoolContract
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
                const totalTicketTab = responses[9]

                console.log('userticket table ', userTicketsTab)

                if (ratioTable.rows.length) {
                    const dEosTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '4,DPPEOS')
                    if (dEosTokenRatio.length) {
                        eosTokenRatio = parseFloat(dEosTokenRatio[0].weight)
                        setEosWeight(parseFloat(dEosTokenRatio[0].weight))
                    }
                }

                if (weightTable.rows.length) {
                    totalRatio = parseFloat(weightTable.rows[0].totweight)
                }

                if (roundTable.rows.length) {
                    dadReleased = parseFloat(roundTable.rows[0].currround_amount.split(' ')[0])
                }

                if (eosSupplyTable.rows.length) {
                    eosSupply = parseFloat(eosSupplyTable.rows[0].totalamountin.split(' ')[0])
                }

                if (dadTokenRes.rows.length) {
                    dadEosPrice = parseFloat(dadTokenRes.rows[0].price1_last)
                }

                if (prizeMoneyTable.rows.length) {
                    setPrizeMoney(prizeMoneyTable.rows[0].rewardacc)
                }

                if (prizeWinnerTab.rows.length) {
                    setClaimedData(prizeWinnerTab.rows.reverse())
                }

                if (prizeRoundTab.rows.length) {
                    setRoundStartTime(new Date(prizeRoundTab.rows[0].round_started).toString().slice(0, 25) + ' ' + 'UTC')
                    setRoundEndTime(new Date(prizeRoundTab.rows[0].round_ends).toString().slice(0, 25) + ' ' + 'UTC')
                }

                if (totalTicketTab.rows.length) {
                    setTotalTickets(totalTicketTab.rows[0].totalamountin)
                }

                if (userTicketsTab.rows.length) {
                    setUserTickets(userTicketsTab.rows.length)
                }

                let x = (eosTokenRatio / totalRatio) * dadReleased * dadEosPrice
                const dadAnnualYield = x / eosSupply * 100 * 24 * 365
                setEosYield(dadAnnualYield)
                console.log('supply----', eosSupply)
            } catch (e) {
                console.log('something went wrong in getting yield ', e)
            }
        }
        getYield()
    }, [])

    useEffect(() => {

        const getBalance = async () => {
            try {
                const wallet = WalletProvider.getWallet()

                if (!!wallet) {
                    const claimDadBalance = await wallet.eosApi.rpc.get_table_rows({
                        json: true,
                        code: ContractNames.didIssueContract,
                        scope: ContractNames.didIssueContract,
                        table: ContractTable.dadBalanceTable,
                        lower_bound: wallet.auth?.accountName,
                        upper_bound: wallet.auth?.accountName
                    })
                }
            } catch (e) {
                console.log('something went wrong in getting balance ', e)
            }
        }

        if (walletConnected) {
            getBalance()
        }

    }, [walletConnected])

    const getDadBalance = async () => {
        try {

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const balance = await wallet.eosApi.rpc.get_table_rows({
                    code: ContractNames.dadTokenContract,
                    table: ContractTable.balanceTable,
                    scope: wallet.auth?.accountName
                })

            }

        } catch (e) {
            console.log('something went wrong in getting dad token', e)
        }
    }

    const handleClaim = async () => {

        try {
            setLoading(true)
            const wallet = WalletProvider.getWallet()
            console.log('wallet----', wallet)
            if (!!wallet) {
                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.eosPrizePoolContract,
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
                getDadBalance()
                // getClaimableBalance()
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
                DAD Prize Pool (no-loss pool)
                </Title>
            <Header>
                <PrizeContainer>
                    <Balance>
                        Prize Money : {"  "}
                    </Balance>
                    <Balance>
                        {prizeMoney}
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
                        Total Eligible Tickets For Current Draw:
                        </Balance>
                    <Balance>
                        {totalTickets}
                    </Balance>
                </BalanceContainer>
                <BalanceContainer>
                    <Round>
                        Current Round : {"  "}
                    </Round>
                    <Round>
                        {roundStartTime}
                    </Round>
                    <Round>
                        {" - "}
                    </Round>
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
            </TextContainer>

            <TransferContainer>
                <ExchangeForm
                    token="EOS"
                    yieldPercentage={eosYield}
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

export default DepositPrizePool
