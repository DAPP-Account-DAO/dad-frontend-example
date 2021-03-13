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
    // normalYield: number
    miningWeight: number
    isNew?: boolean
}

const ExchangeForm = (props: Props) => {
    const {
        token,
        yieldPercentage,
        borderColor,
        // normalYield,
        miningWeight,
        isNew
    } = props

    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [balance, setBalance] = useState(`0 ${token}`)
    const [dBalance, setDbalance] = useState(`0 DPP${token}`)
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
                return ContractNames.eosPrizePoolContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setBalanceContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosioTokenContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setDBalanceContract = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.dppeosTokenContract
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
                 if (balance.rows.length) {
                        setBalance(balance.rows[0].balance)
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

                if (dBalance.rows.length) {
                    if(token === 'EOS'){
                        const dppEosRow = dBalance.rows.filter((v: any) => v.balance.split(' ')[1] === 'DPPEOS')

                        if (dppEosRow) {
                            setDbalance(dppEosRow[0].balance)
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
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const handleDepositAccount = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosPrizeDepositContract
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
                return ContractNames.dppeosTokenContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const handleWithdrawAccount = (): string => {
        switch (token) {
            case 'EOS':
                return ContractNames.eosPrizeDepositContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const handleWithdrawAmount = async (values: any) => {

        try {
            setWithdrawLoading(true)
            const { withdrawValue } = values
            const tokenValue = `${parseFloat(withdrawValue).toFixed(setPrecision())} DPP${token}`
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
                { rate !== '' ? (
                    <NoteText>
                        {`Note: 1 DPP${token} = ${parseFloat(rate).toFixed(4)} ${token}`}
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

                    {/* <YieldTexTContainer>
                        <YieldText>
                            Yield:
                        </YieldText>

                        <YieldPercent>
                            {`${normalYield.toFixed(2)} %`}
                        </YieldPercent>
                    </YieldTexTContainer> */}

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