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
    ToggleButton,
    Line,
    BottomLine,
    FormWrapper,
    LabelContainer,
    LabelValue,
    InputContainer,
    FormInput,
    PercentageContainer,
    PercentBox,
    FormContainer,
    FormError,
    ResponsivePercentageContainer,
    FormButton,
    FeesContainer,
    Label,
    YieldText,
    YieldTexTContainer
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
import { ContractNames, ContractTable } from '../../../../utils/constants'
import { generateError } from '../../../../utils/helpers'

const { useState, useEffect } = React

const subscribeSchema = Yup.object().shape({
    depositValue: Yup.number().required('Enter Daily-Limit Amount').min(0.0001, "Should be greater than 0"),
})

const subscribeDepositSchema = Yup.object().shape({
    depositValue: Yup.number().required('Enter Subscription Amount').min(0.0001, "Should be greater than 0"),
})

const depositValue = {
    depositValue: '',
}

const withdrawSchema = Yup.object().shape({
    withdrawValue: Yup.number().required('Enter Withdraw Amount').min(0.0001, "Should be greater than 0"),
})

const withdrawValue = {
    withdrawValue: '',
}

interface Props {
    token: string
    // yieldPercentage: number
    borderColor: string
    // normalYield: number
    miningWeight: number
    isNew?: boolean
}

const ExchangeFormSubs = (props: Props) => {
    const {
        token,
        // yieldPercentage,
        borderColor,
        miningWeight,
        isNew
    } = props

    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [balance, setBalance] = useState(`0 ${token}`)
    const [subscribeLoading, setSubscribeLoading] = useState(false)
    const [subsDepositLoading, setSubsDepositLoading] = useState(false)
    const [withdrawLoading, setWithdrawLoading] = useState(false)
    const [dBalance, setDbalance] = useState(`0 ${token}`)

    useEffect(() => {
        const getBalances = async () => {
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                getBalance()
            }
        }

        if (walletConnected) {
            getBalances()
            getDbalance()
        }
    }, [walletConnected])

    const setBalanceContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosioTokenContract
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
                // console.log('user balance', balance)
                if (balance.rows.length) {
                    setBalance(balance.rows[0].balance)
                } else {
                    setBalance(`0 ${token}`)
                }
            }

        } catch (e) {
            console.log('something went wrong in getting balance ', e)
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
            default:
                return ContractNames.eosioTokenContract
        }
    }


    const setPrecision = (): number => {
        switch (token) {
            case 'EOS':
                return 4
            default:
                return 4
        }
    }

    const handleSubsDepositAmount = async (values: any) => {

        try {
            setSubsDepositLoading(true)
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
                                to: ContractNames.rafflePoolContract,
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
                dispatch(showNotification({ notificationText: 'Subscription Successful', notificationType: 1 }))
            }

        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Subscription Failed'), notificationType: 2 }))
        } finally {
            setSubsDepositLoading(false)
        }
    }

    const getDbalance = async () => {
        try {
            const wallet = WalletProvider.getWallet()
            
            if (!!wallet) {
                const balances = await wallet.eosApi.rpc.get_table_rows({
                    code: ContractNames.raffleDepositContract,
                    table: ContractTable.raffleUserDeposit,
                    scope: ContractNames.raffleDepositContract,
                })
                // console.log('balancesfsddfdfdffsd----', balances)
                if (balances.rows.length) {
                   
                    const bal = balances.rows.find((element: any) => element.account == wallet.auth?.accountName)
                    if (bal) {
                        setDbalance(bal.balance)
                    } else {
                        setDbalance(`0 ${token}`)
                    }
                }
            }
        } catch (e) {
            console.log('something went wrong in getting d balance ', e)
        }
    }



    const handleWithdrawAmount = async (values: any) => {
        try {
            setWithdrawLoading(true)
            const { withdrawValue } = values
            const tokenValue = `${parseFloat(withdrawValue).toFixed(setPrecision())} ${token}`
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.rafflePoolContract,
                            name: 'withdrawsubs',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                account: wallet?.auth?.accountName,
                                amount: tokenValue
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

    const calculatePercentageOfDBalance = (percent: number): string => {
        return `${(parseFloat(dBalance.split(' ')[0]) * percent / 100).toFixed(setPrecision())}`
    }

    const handleSubscribeAmount = async (values: any) => {

        try {
            setSubscribeLoading(true)
            const { depositValue } = values

            const tokenValue = `${parseFloat(depositValue).toFixed(setPrecision())} ${token}`

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.rafflePoolContract,
                            name: 'subscribe',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                account: wallet?.auth?.accountName,
                                dailylimit: tokenValue,
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
                dispatch(showNotification({ notificationText: 'Deposit Successful', notificationType: 1 }))
            }

        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Subscribe Failed'), notificationType: 2 }))
        } finally {
            setSubscribeLoading(false)
        }
    }

    const calculatePercentageOfBalance = (percent: number): string => {
        return `${(parseFloat(balance.split(' ')[0]) * percent / 100).toFixed(setPrecision())}`
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
                            validationSchema={subscribeSchema}
                            onSubmit={handleSubscribeAmount}
                        >
                            {({ }) => (
                                <Form>
                                    <LabelContainer>
                                        <LabelValue>
                                            Subscribe to auto-enroll
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="enter daily amount" name="depositValue" />

                                        <FormButton type="submit" disabled={subscribeLoading}>
                                            {subscribeLoading ? <Loader color={'#fff'} /> : 'Subscribe'}
                                        </FormButton>
                                    </InputContainer>

                                    <FormError>
                                        <ErrorMessage name="depositValue" />
                                    </FormError>
                                </Form>
                            )}
                        </Formik>
                    </FormContainer>
                </FormWrapper>
                <FormWrapper>
                    <FormContainer>
                        <Formik
                            initialValues={depositValue}
                            validationSchema={subscribeDepositSchema}
                            onSubmit={handleSubsDepositAmount}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <LabelContainer>
                                        <LabelValue>
                                            Deposit to subscription fund
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="enter deposit amount" name="depositValue" />

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

                                        <FormButton type="submit" disabled={subsDepositLoading}>
                                            {subsDepositLoading ? <Loader color={'#fff'} /> : 'Deposit'}
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
                                            Withdraw from subscription fund:
                                        </Label>
                                        <LabelValue>
                                            {dBalance}
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="enter withdrawl amount" name="withdrawValue" />

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

                                    {/* <FeesContainer>
                                        Withdraw fees: 0.2%
                                    </FeesContainer> */}
                                    <FeesContainer>
                                        Mining Weight : {miningWeight}
                                    </FeesContainer>

                                </Form>
                            )}

                        </Formik>
                    </FormContainer>
                </FormWrapper>
                <BottomLine />
                {/* { rate !== '' ? (
                    <NoteText>
                        {`Note: 1 DPP${token} = ${parseFloat(rate).toFixed(4)} ${token}`}
                    </NoteText>
                ) : null} */}
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
                            Auto-enroll in daily raffle (maximize DAD mining)
                        </YieldText>

                        {/* <YieldPercent>
                            {`${yieldPercentage.toFixed(2)} %`}
                        </YieldPercent> */}
                    </YieldTexTContainer>
                </TokenWrapper>

                <ToggleButton
                    onClick={() => setShow(!show)}
                    show={show}
                >
                    {show ? "Cancel" : "Subscribe"}
                </ToggleButton>

            </Container>

            {renderForm()}

        </Wrapper>
    )
}

export default ExchangeFormSubs