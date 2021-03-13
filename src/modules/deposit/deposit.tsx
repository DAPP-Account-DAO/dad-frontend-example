import * as React from 'react'
import {
    Header,
    TransferContainer,
    ClaimBtn,
    ClaimBtnContainer,
    Balance,
    TextContainer
} from './style'
import {
    ExchangeForm,
    StakeForm
} from './components'
import WalletProvider from '../../utils/wallet'
import { useSelector } from 'react-redux'
import { Footer, Loader } from '../../shared'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../logic/actions/actions'
import { ContractNames, ContractTable, Paths, eosjsEndPoint } from '../../utils/constants';
import { generateError } from '../../utils/helpers'
import axios from 'axios'
//@ts-ignore
import EosApi from 'eosjs-api'
import { Bottom } from './style';
import { LinkContainer } from '../../shared/side-bar/style'
import { useHistory, useLocation } from 'react-router-dom'

const { useEffect, useState } = React

const options = {
    httpEndpoint: eosjsEndPoint
}

const eos = EosApi(options)

const Deposit = () => {
    const history = useHistory()
    const goTo = (path: string) => {
        history.push(path)
    }
    const { pathname } = useLocation()

    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()
    const [claimBalance, setClaimBalance] = useState('0.000000 DAD')
    const [loading, setLoading] = useState(false);
    const [dadToken, setDadToken] = useState('0.000000 DAD')
    const [eosYield, setEosYield] = useState(0)
    const [dappYield, setDappYield] = useState(0)
    const [dadYield, setDadYield] = useState(0)
    const [eosWeight, setEosWeight] = useState(0)
    const [dappWeight, setDappWeight] = useState(0)
    const [dadWeight, setDadWeight] = useState(0)
    const [boxvpWeight, setBoxvpWeight] = useState(0)
    const [newBoxvpWeight, setNewBoxvpWeight] = useState(0)
    const [newBoxvpYield, setNewBoxvpYield] = useState(0)
    const [boxwqYield, setBoxwqYield] = useState(0)
    const [boxwqWeight, setBoxwqWeight] = useState(0)
    const [boxvpYield, setBoxvpYield] = useState(0)


    useEffect(() => {

        const getYield = async () => {
            try {

                const dadTokenRowId = 588
                const dappTokenRowId = 193
                const dappDadRowId = 615

                let eosTokenRatio = 0
                let totalRatio = 0
                let dadReleased = 0
                let dadReleased1 = 0
                let dadEosPrice = 0
                let eosSupply = 0
                let dappRatio = 0
                let dappPriceEos = 0
                let totalDapp = 0
                let dadTokenSupply = 0
                let reserve0 = 0
                let reserve1 = 0
                let liquidityToken = 0
                let boxvpRatio = 0
                let boxvpStaked = 0
                let dboxvpRatio = 0
                let newBoxvpStaked = 0
                let dadTokenWeight = 0
                let dappreserve0 = 0
                let boxwqRatio = 0
                let liquidityToken1 = 0
                let boxwqStaked = 0

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

                const dappTokenData = {
                    "code": "swap.defi",
                    "json": true,
                    "limit": 10,
                    "lower_bound": dappTokenRowId,
                    "scope": "swap.defi",
                    "table": "pairs",
                    "table_key": "",
                    "upper_bound": dappTokenRowId
                }

                const dappDadData = {
                    "code": "swap.defi",
                    "json": true,
                    "limit": 10,
                    "lower_bound": dappDadRowId,
                    "scope": "swap.defi",
                    "table": "pairs",
                    "table_key": "",
                    "upper_bound": dappDadRowId
                }

                const requests = [
                    fetch('https://eos.greymass.com/v1/chain/get_table_rows', {
                        method: 'post',
                        body: JSON.stringify(dadTokenData)
                    }),
                    fetch('https://eos.greymass.com/v1/chain/get_table_rows', {
                        method: 'post',
                        body: JSON.stringify(dappTokenData)
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
                        code: ContractNames.eosPoolContract,
                        scope: ContractNames.eosPoolContract,
                        table: ContractTable.eosPool
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dappPoolContract,
                        scope: ContractNames.dappPoolContract,
                        table: ContractTable.dappPool
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        table: ContractTable.balanceTable,
                        scope: ContractNames.dadGovernanceContract
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.boxvpStakeContract,
                        scope: ContractNames.boxvpStakeContract,
                        table: ContractTable.boxvpStake
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.boxvpPoolContract,
                        scope: ContractNames.boxvpPoolContract,
                        table: ContractTable.dboxvpPool
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.weightTable
                    }),
                    fetch('https://eos.greymass.com/v1/chain/get_table_rows', {
                        method: 'post',
                        body: JSON.stringify(dappDadData)
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.boxwqStakeContract,
                        scope: ContractNames.boxwqStakeContract,
                        table: ContractTable.boxwqStake
                    })
                ]

                const responses = await axios.all(requests)
                const dadTokenRes = await responses[0].json()
                const dappTokenRes = await responses[1].json()
                const ratioTable = responses[2]
                const roundTable = responses[3]
                const eosSupplyTable = responses[4]
                const dappSupply = responses[5]
                const dadSupply = responses[6]
                const boxvpTable = responses[7]
                const dboxvpTable = responses[8]
                const weightTable = responses[9]
                const dappDadRes = await responses[10].json()
                const boxwqTable = responses[11]

                console.log('weight table ', weightTable)

                if (boxvpTable.rows.length) {
                    boxvpStaked = parseFloat(boxvpTable.rows[0].balance.split(' ')[0])
                }

                if (boxwqTable.rows.length) {
                    boxwqStaked = parseFloat(boxwqTable.rows[0].totalamountin.split(' ')[0])
                }

                if (dadSupply.rows.length) {
                    dadTokenSupply = parseFloat(dadSupply.rows[0].balance.split(' ')[0])
                }
                if (dadTokenRes.rows.length) {
                    dadEosPrice = parseFloat(dadTokenRes.rows[0].price1_last)
                    reserve0 = parseFloat(dadTokenRes.rows[0].reserve0.split(' ')[0])
                    reserve1 = parseFloat(dadTokenRes.rows[0].reserve1.split(' ')[0])
                    liquidityToken = dadTokenRes.rows[0].liquidity_token
                }
                if (dappDadRes.rows.length) {
                    dappreserve0 = parseFloat(dappDadRes.rows[0].reserve0.split(' ')[0])
                    liquidityToken1 = dappDadRes.rows[0].liquidity_token
                }

                if (dappTokenRes.rows.length) {
                    dappPriceEos = parseFloat(dappTokenRes.rows[0].price1_last)
                }

                if (dappSupply.rows.length) {
                    totalDapp = parseFloat(dappSupply.rows[0].totalamountin.split(' ')[0])
                }

                if (ratioTable.rows.length) {

                    const dadTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '6,SDAD')
                    const dEosTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '4,DEOS')
                    const dappTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '4,DDAPP')
                    const eosDappTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '0,DADLP')
                    const boxvpTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '0,DBOXVP')
                    const boxwqTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '0,DBOXWQ')

                    if(boxwqTokenRatio.length) {
                        boxwqRatio = parseFloat(boxwqTokenRatio[0].weight)
                        setBoxwqWeight(parseFloat(boxwqTokenRatio[0].weight))
                    }
                    if (dadTokenRatio.length) {
                        setDadWeight(parseFloat(dadTokenRatio[0].weight))
                        dadTokenWeight = parseFloat(dadTokenRatio[0].weight)
                    }

                    if (dEosTokenRatio.length) {
                        eosTokenRatio = parseFloat(dEosTokenRatio[0].weight)
                        setEosWeight(parseFloat(dEosTokenRatio[0].weight))
                    }

                    if (dappTokenRatio.length) {
                        dappRatio = parseFloat(dappTokenRatio[0].weight)
                        setDappWeight(parseFloat(dappTokenRatio[0].weight))
                    }

                    if (eosDappTokenRatio.length) {
                        boxvpRatio = parseFloat(eosDappTokenRatio[0].weight)
                        setBoxvpWeight(parseFloat(eosDappTokenRatio[0].weight))
                    }

                    if (boxvpTokenRatio.length) {
                        dboxvpRatio = parseFloat(boxvpTokenRatio[0].weight)
                        setNewBoxvpWeight(dboxvpRatio)
                    }
                }
                
                if(weightTable.rows.length) {
                    totalRatio = parseFloat(weightTable.rows[0].totweight)
                }

                if (roundTable.rows.length) {
                    dadReleased1 = parseFloat(roundTable.rows[0].currround_amount.split(' ')[0]) / totalRatio
                    dadReleased = parseFloat(roundTable.rows[0].currround_amount.split(' ')[0])
                }

                if (eosSupplyTable.rows.length) {
                    eosSupply = parseFloat(eosSupplyTable.rows[0].totalamountin.split(' ')[0])
                }

                if (dboxvpTable.rows.length) {
                    newBoxvpStaked = parseFloat(dboxvpTable.rows[0].totalamountin)
                }
                

                let x = (eosTokenRatio / totalRatio) * dadReleased * dadEosPrice
                const dadAnnualYield = x / eosSupply * 100 * 24 * 365
                let dappTokenX = (dappRatio / totalRatio) * dadReleased * dadEosPrice
                let dappTokenY = totalDapp * dappPriceEos
                let dappYieldAnnual = (dappTokenX / dappTokenY) * 100 * 24 * 365

                setEosYield(dadAnnualYield)
                setDappYield(dappYieldAnnual)
                console.log(`${dadReleased1}----------${dadTokenSupply}`)

                setDadYield((dadReleased1 / dadTokenSupply) * dadTokenWeight * 100 * 24 * 365)

                const t = reserve0 + (reserve1 * dadEosPrice)
                let boxvpTokenVal = t / liquidityToken
                let dadReleasedBox = boxvpRatio / totalRatio * dadReleased
                let boxvpHourly = (dadReleasedBox * dadEosPrice) * 100 / (boxvpTokenVal * boxvpStaked)
                setBoxvpYield(boxvpHourly * 24 * 365)

                let newBoxvpDadReleased = dboxvpRatio / totalRatio * dadReleased
                let newBoxvpHourly = newBoxvpDadReleased/((reserve1 * 2)*(newBoxvpStaked/liquidityToken))
                setNewBoxvpYield(newBoxvpHourly * 100 * 24 * 365)

                let boxwqDadReleased =  boxwqRatio / totalRatio * dadReleased
                let boxwqDappReleased =  (dappreserve0 * 2)*(boxwqStaked/liquidityToken1)
                setBoxwqYield((boxwqDadReleased/boxwqDappReleased)* 100 * 24* 365)
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

                    const balance = await wallet.eosApi.rpc.get_table_rows({
                        code: ContractNames.dadTokenContract,
                        table: ContractTable.balanceTable,
                        scope: wallet.auth?.accountName
                    })

                    if (claimDadBalance.rows.length) {
                        setClaimBalance(claimDadBalance.rows[0].issuedamt)
                    }

                    if (balance.rows.length) {
                        setDadToken(balance.rows[0].balance)
                    }
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

                if (balance.rows.length) {
                    setDadToken(balance.rows[0].balance)
                }
            }

        } catch (e) {
            console.log('something went wrong in getting dad token', e)
        }
    }

    const getClaimableBalance = async () => {
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

                if (claimDadBalance.rows.length) {
                    setClaimBalance(claimDadBalance.rows[0].issuedamt)
                }
            }

        } catch (e) {
            console.log('something went wrong in getting claimable balance ', e)
        }
    }

    const handleClaim = async () => {

        try {
            setLoading(true)
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.didIssueContract,
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
                // if(!response.transaction_id){
                //     dispatch(showNotification({ notificationText: generateError(e, 'Claim Failed'), notificationType: 2 }))
                // }
                getDadBalance()
                getClaimableBalance()
                dispatch(showNotification({ notificationText: 'Claim Successful', notificationType: 1 }))
            }
        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Claim Failed'), notificationType: 2 }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Header>
                Deposit
            </Header>
            <TextContainer>
                <Balance>
                    DAD Token Balance : {"  "}
                </Balance>
                <Balance>
                    {`  ${dadToken}`}
                </Balance>
            </TextContainer>
            <TextContainer>
                <Balance>
                    Unclaimed DAD :
                </Balance>
                <Balance>
                    {`  ${claimBalance}`}
                </Balance>
            </TextContainer>

            <ClaimBtnContainer>

                <ClaimBtn onClick={handleClaim} disabled={loading}>
                    {loading ? <Loader color={"#fff"} /> : "Claim"}
                </ClaimBtn>
            </ClaimBtnContainer>
            <TransferContainer>
                <ExchangeForm
                    token="EOS"
                    yieldPercentage={eosYield}
                    borderColor="#E3E3E3"
                    normalYield={3}
                    miningWeight={eosWeight}
                />
                <ExchangeForm
                    token="DAPP"
                    yieldPercentage={dappYield}
                    borderColor="#636991"
                    normalYield={5.9}
                    miningWeight={dappWeight}
                />
                <StakeForm
                    token={'DAD'}
                    yieldPercentage={dadYield}
                    borderColor="#AFDE81"
                    miningWeight={dadWeight}
                />
                {/*  <StakeForm 
                    token={'BOXVP'}
                    yieldPercentage={boxvpYield}
                    borderColor="#FF8E01"
                    miningWeight={boxvpWeight}
                />  */}
                <ExchangeForm
                    token="BOXVP"
                    yieldPercentage={newBoxvpYield}
                    borderColor="#E63956"
                    normalYield={0}
                    miningWeight={newBoxvpWeight}
                    isNew={true}
                />

                <ExchangeForm
                    token="BOXWQ"
                    yieldPercentage={boxwqYield} 
                    borderColor="#009ACC"
                    normalYield={0}
                    miningWeight={boxwqWeight}
                    isNew={false}
                />
            </TransferContainer>
            <LinkContainer onClick={() => goTo(Paths.prizepool)} active={pathname === Paths.prizepool}>
               <Bottom>
                Go to Prize Pool game
                </Bottom>
            </LinkContainer>
            
        </div>
    )
}

export default Deposit
