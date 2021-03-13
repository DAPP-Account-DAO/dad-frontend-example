import * as React from 'react'
import {
    Wrapper,
    SideBar,
    Container,
    TokenWrapper,
    TokenTextContainer,
    TokenIconContainer,
    TokenImg,
    TokenText,
    YieldTexTContainer,
    YieldText,
    YieldPercent,
    ToggleButton,
    Line,
    BottomLine,
    NoteText,
    FormWrapper,
    LabelContainer,
    Label,
    LabelValue,
    InputContainer,
    FormInput,
    PercentageContainer,
    PercentBox,
    FormContainer,
    FormError,
    ResponsivePercentageContainer,
    FormButton,
    FeesContainer
} from './style'
import {
    DappToken,
    OcmTokenIcon,
    EosTokenIcon,
    DappTokenIcon,
} from '../../../../images'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import WalletProvider from '../../../../utils/wallet'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../../../../shared'
import { showNotification } from '../../../../logic/actions/actions'
import { ContractNames, ContractTable, eosjsEndPoint } from '../../../../utils/constants';
import { generateError } from '../../../../utils/helpers'
//@ts-ignore
import EosApi from 'eosjs-api'
const options = {
    httpEndpoint: eosjsEndPoint
}

const eos = EosApi(options)

const { useState, useEffect } = React

const withdrawSchema = Yup.object().shape({
    withdrawValue: Yup.number().required('Enter Withdraw Amount').min(0.0001, "Should be greater than 0"),
})

const withdrawValue = {
    withdrawValue: '',
}

const depositSchema = Yup.object().shape({
    depositValue: Yup.number().required('Enter Deposit Amount').min(0.0001, "Should be greater than 0"),
})

const depositValue = {
    depositValue: '',
}

interface Props {
    token: string
    yieldPercentage: number
    borderColor: string
    normalYield: number
    miningWeight: number
    isNew?: boolean
}

const ExchangeForm = (props: Props) => {

    const {
        token,
        yieldPercentage,
        borderColor,
        normalYield,
        miningWeight,
        isNew
    } = props

    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [balance, setBalance] = useState(`0 ${token}`)
    const [dBalance, setDbalance] = useState(`0 D${token}`)
    const [rate, setRate] = useState('')
    const [depositLoading, setDepositLoading] = useState(false)
    const [withdrawLoading, setWithdrawLoading] = useState(false)

    useEffect(() => {
        const getBalances = async () => {
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                getBalance()
                getDbalance()
            }
        }

        if (walletConnected) {
            getBalances()
        }

        getRate()

    }, [walletConnected])

    const setRateContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosPoolContract
            case 'DAPP':
                return ContractNames.dappPoolContract
            case 'BOXVP':
                return ContractNames.boxvpPoolContract
            case 'BOXWQ':
                return ContractNames.boxwqPoolContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setBalanceContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosioTokenContract
            case 'DAPP':
                return ContractNames.dappServicesContract
            case 'BOXVP':
                return ContractNames.boxvpTokenContract
            case 'BOXWQ':
                return ContractNames.boxwqTokenContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setDBalanceContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.deosTokenContract
            case 'DAPP':
                return ContractNames.ddappTokenContract
            case 'BOXVP':
                return ContractNames.dboxvpTokenContract
            case 'BOXWQ':
                return ContractNames.dboxwqTokenContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const getBalance = async () => {
        try {
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                const balance = await wallet.eosApi.rpc.get_table_rows({
                    code: setBalanceContract(),
                    table: ContractTable.balanceTable,
                    scope: wallet.auth?.accountName,
                })
                
                if (token === 'BOXVP') {
                    if (balance.rows.length) {
                        for (let i = 0; i < balance.rows.length; i++) {
                            let symbol = balance.rows[i].balance.split(' ')[1]
                            if (symbol === 'BOXVP') {
                                setBalance(balance.rows[i].balance)
                            }
                        }
                    }
                } else if (token === 'BOXWQ') {
                    if (balance.rows.length) {
                        for (let i = 0; i < balance.rows.length; i++) {
                            let symbol = balance.rows[i].balance.split(' ')[1]
                            if (symbol === 'BOXWQ') {
                                setBalance(balance.rows[i].balance)
                            }
                        }
                    }
                } else {
                    if (balance.rows.length) {
                        setBalance(balance.rows[0].balance)
                    }
                }
            }

        } catch (e) {
            console.log('something went wrong in getting balance ', e)
        }
    }

    const getDbalance = async () => {
        try {
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                const dBalance = await wallet.eosApi.rpc.get_table_rows({
                    code: setDBalanceContract(),
                    table: ContractTable.balanceTable,
                    scope: wallet.auth?.accountName
                })
                console.log('balance----', dBalance)
                if (dBalance.rows.length) {
                    if (token === 'BOXVP') {
                        const boxvpRow = dBalance.rows.filter((v: any) => v.balance.split(' ')[1] === 'DBOXVP')

                        if (boxvpRow) {
                            setDbalance(boxvpRow[0].balance)
                        }
                    } else if (token === 'BOXWQ') {
                        const boxwqpRow = dBalance.rows.filter((v: any) => v.balance.split(' ')[1] === 'DBOXWQ')
                        if (boxwqpRow) {
                            setDbalance(boxwqpRow[0].balance)
                        }
                    } else {
                       setDbalance(dBalance.rows[0].balance)
                    }
                }
            }
        } catch (e) {
            console.log('something went wrong in getting d balance ', e)
        }
    }

    const getRate = async () => {
        try {

            const dappRate = await eos.getTableRows({
                code: setRateContract(),
                scope: setRateContract(),
                table: ContractTable.rateTable,
                json: 'true'
            })

            if (dappRate.rows.length) {
                setRate(dappRate.rows[0].pricedeos)

            }

        } catch (e) {
            console.log(`something went wrong in getting rate ${token}`, e)
        }
    }

    const setSrouce = (): string => {
        switch (token) {
            case 'EOS':
                return EosTokenIcon
            case 'OCM':
                return OcmTokenIcon
            case 'DAPP':
                return DappTokenIcon
            default:
                return DappToken
        }
    }

    const handleDepositContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosioTokenContract
            case 'DAPP':
                return ContractNames.dappServicesContract
            case 'BOXVP':
                return ContractNames.boxvpTokenContract
            case 'BOXWQ':
                return ContractNames.boxwqTokenContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const handleDepositAccount = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosDepositContract
            case 'DAPP':
                return ContractNames.dappDepositContract
            case 'BOXVP':
                return ContractNames.boxvpDepositContract
            case 'BOXWQ':
                return ContractNames.boxwqDepositContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setPrecision = (): number => {
        switch (token) {
            case 'EOS':
                return 4
            case 'DAPP':
                return 4
            case 'BOXVP':
                return 0
            case 'BOXWQ':
                return 0
            default:
                return 4
        }
    }

    const handleDepositAmount = async (values: any) => {

        try {
            setDepositLoading(true)
            const { depositValue } = values

            const tokenValue = `${parseFloat(depositValue).toFixed(setPrecision())} ${token}`

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: handleDepositContract(),
                            name: 'transfer',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                from: wallet?.auth?.accountName,
                                to: handleDepositAccount(),
                                quantity: tokenValue,
                                memo: ''
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

                getBalance()
                getDbalance()
                dispatch(showNotification({ notificationText: 'Deposit Successful', notificationType: 1 }))
            }

        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Deposit Failed'), notificationType: 2 }))
        } finally {
            setDepositLoading(false)
        }
    }

    const handleWithdrawContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.deosTokenContract
            case 'DAPP':
                return ContractNames.ddappTokenContract
            case 'BOXVP':
                return ContractNames.dboxvpTokenContract
            case 'BOXWQ':
                return ContractNames.dboxwqTokenContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const handleWithdrawAccount = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosDepositContract
            case 'DAPP':
                return ContractNames.dappDepositContract
            case 'BOXVP':
                return ContractNames.boxvpDepositContract
            case 'BOXWQ':
                return ContractNames.boxwqDepositContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const handleWithdrawAmount = async (values: any) => {

        try {
            setWithdrawLoading(true)
            const { withdrawValue } = values
            const tokenValue = `${parseFloat(withdrawValue).toFixed(setPrecision())} D${token}`
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: handleWithdrawContract(),
                            name: 'transfer',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                from: wallet?.auth?.accountName,
                                to: handleWithdrawAccount(),
                                quantity: tokenValue,
                                memo: ''
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

                getBalance()
                getDbalance()
                dispatch(showNotification({ notificationText: 'Withdraw Successful', notificationType: 1 }))
            }
        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Withdraw Failed'), notificationType: 2 }))
        } finally {
            setWithdrawLoading(false)
        }
    }

    const calculatePercentageOfBalance = (percent: number): string => {
        return `${(parseFloat(balance.split(' ')[0]) * percent / 100).toFixed(setPrecision())}`
    }

    const calculatePercentageOfDBalance = (percent: number): string => {
        return `${(parseFloat(dBalance.split(' ')[0]) * percent / 100).toFixed(setPrecision())}`
    }

    const renderForm = () => {
        if (!show) return null

        return (
            <div>
                <Line />
                <FormWrapper>

                    <FormContainer>
                        <Formik
                            initialValues={depositValue}
                            validationSchema={depositSchema}
                            onSubmit={handleDepositAmount}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <LabelContainer>
                                        <Label>
                                            Balance:
                                        </Label>
                                        <LabelValue>
                                            {balance}
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="Input Amount" name="depositValue" />

                                        <ResponsivePercentageContainer>
                                            <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(25))}>
                                                25%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(50))}>
                                                50%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(75))}>
                                                75%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(100))}>
                                                100%
                                            </PercentBox>
                                        </ResponsivePercentageContainer>

                                        <FormButton type="submit" disabled={depositLoading}>
                                            {depositLoading ? <Loader color={'#fff'} /> : 'Deposit'}
                                        </FormButton>
                                    </InputContainer>

                                    <PercentageContainer>
                                        <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(25))}>
                                            25%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(50))}>
                                            50%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(75))}>
                                            75%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("depositValue", calculatePercentageOfBalance(100))}>
                                            100%
                                        </PercentBox>
                                    </PercentageContainer>

                                    <FormError>
                                        <ErrorMessage name="depositValue" />
                                    </FormError>
                                </Form>
                            )}
                        </Formik>

                    </FormContainer>

                    <FormContainer>

                        <Formik
                            initialValues={withdrawValue}
                            validationSchema={withdrawSchema}
                            onSubmit={handleWithdrawAmount}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <LabelContainer>
                                        <Label>
                                            Balance:
                                        </Label>
                                        <LabelValue>
                                            {dBalance}
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="Input Amount" name="withdrawValue" />

                                        <ResponsivePercentageContainer>
                                            <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(25))}>
                                                25%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(50))}>
                                                50%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(75))}>
                                                75%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(100))}>
                                                100%
                                            </PercentBox>
                                        </ResponsivePercentageContainer>

                                        <FormButton type="submit" disabled={withdrawLoading}>
                                            {withdrawLoading ? <Loader color={'#fff'} /> : 'Withdraw'}
                                        </FormButton>
                                    </InputContainer>

                                    <PercentageContainer>
                                        <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(25))}>
                                            25%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(50))}>
                                            50%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(75))}>
                                            75%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("withdrawValue", calculatePercentageOfDBalance(100))}>
                                            100%
                                        </PercentBox>
                                    </PercentageContainer>

                                    <FormError>
                                        <ErrorMessage name="withdrawValue" />
                                    </FormError>

                                    <FeesContainer>
                                        Withdrawal fees: 0.3%
                                    </FeesContainer>
                                    <FeesContainer>
                                        Mining Weight : {miningWeight}
                                    </FeesContainer>

                                </Form>
                            )}

                        </Formik>

                    </FormContainer>
                </FormWrapper>
                <BottomLine />
                { rate !== '' ? (
                    <NoteText>
                        {`Note: 1 D${token} = ${parseFloat(rate).toFixed(4)} ${token}`}
                    </NoteText>
                ) : null}
            </div>
        )
    }

    return (
        <Wrapper>
            <SideBar background={borderColor} />

            <Container>
                <TokenWrapper>

                    <TokenTextContainer>

                        <TokenIconContainer>
                            <TokenImg src={setSrouce()} alt="token" />
                        </TokenIconContainer>
                        <TokenText>
                            {isNew ? "New " : ""}
                            {token}
                        </TokenText>

                    </TokenTextContainer>

                    <YieldTexTContainer>
                        <YieldText>
                            DAD Mining Yield:
                        </YieldText>

                        <YieldPercent>
                            {`${yieldPercentage.toFixed(2)} %`}
                        </YieldPercent>
                    </YieldTexTContainer>

                    <YieldTexTContainer>
                        <YieldText>
                            Yield:
                        </YieldText>

                        <YieldPercent>
                            {`${normalYield.toFixed(2)} %`}
                        </YieldPercent>
                    </YieldTexTContainer>

                </TokenWrapper>

                <ToggleButton
                    onClick={() => setShow(!show)}
                    show={show}
                >
                    {show ? "Cancel" : "Deposit"}
                </ToggleButton>

            </Container>

            {renderForm()}

        </Wrapper>
    )
}

export default ExchangeForm
