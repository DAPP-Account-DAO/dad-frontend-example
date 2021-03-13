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
import { Loader } from '../../../../shared'
import { showNotification } from '../../../../logic/actions/actions'
import { ContractNames, ContractTable } from '../../../../utils/constants'
import { generateError } from '../../../../utils/helpers'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import WalletProvider from '../../../../utils/wallet'

const { useState, useEffect } = React

interface Props {
    token: string
    yieldPercentage: number
    borderColor: string
    miningWeight: number
}

const stakeSchema = Yup.object().shape({
    stakeValue: Yup.number().required('Enter Deposit Amount').min(0.0001, "Should be greater than 0"),
})

const stakeValue = {
    stakeValue: '',
}

const unstakeSchema = Yup.object().shape({
    unstakeValue: Yup.number().required('Enter Withdraw Amount').min(0.0001, "Should be greater than 0"),
})

const unstakeValue = {
    unstakeValue: '',
}

const StakeForm = (props: Props) => {

    const { token, yieldPercentage, borderColor, miningWeight } = props

    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()

    const setBalanceContract = (): string => {
        switch (token) {
            case 'DAD':
                return ContractNames.dadTokenContract
            case 'BOXVP':
                return ContractNames.boxvpContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setStakeContract = (): string => {
        switch (token) {
            case 'DAD':
                return ContractNames.dadGovernanceContract
            case 'BOXVP':
                return ContractNames.boxvpStakeContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setPrecision = (): number => {
        switch (token) {
            case 'DAD':
                return 6
            case 'BOXVP':
                return 0
            default:
                return 4
        }
    }

    const setStakeActionContract = (): string => {
        switch (token) {
            case 'DAD':
                return ContractNames.dadTokenContract
            case 'BOXVP':
                return ContractNames.boxvpContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const setStakeSendContract = (): string => {
        switch (token) {
            case 'DAD':
                return ContractNames.dadGovernanceContract
            case 'BOXVP':
                return ContractNames.boxvpStakeContract
            default:
                return ContractNames.eosioTokenContract
        }
    }

    const [show, setShow] = useState(false)
    const [userBalance, setUserBalance] = useState(`${parseFloat('0.0000').toFixed(setPrecision())} ${token}`)
    const [stakeBalance, setStakeBalance] = useState(`${parseFloat('0.0000').toFixed(setPrecision())} ${token}`)
    const [stakeLoading, setStakeLoading] = useState(false)
    const [unstakeLoading, setUnstakeLoading] = useState(false)

    useEffect(() => {

        const getInitialBalance = async () => {
            try {

                const wallet = WalletProvider.getWallet()
                if (!!wallet) {
                    const requests = [
                        wallet.eosApi.rpc.get_table_rows({
                            code: setStakeContract(),
                            table: ContractTable.stakeTable,
                            scope: setStakeContract(),
                            limit: 1,
                            lower_bound: wallet.auth?.accountName
                        }),
                        wallet.eosApi.rpc.get_table_rows({
                            code: setBalanceContract(),
                            table: ContractTable.balanceTable,
                            scope: wallet.auth?.accountName
                        })
                    ]

                    const responses = await axios.all(requests)
                    const stakeBalance = responses[0]
                    const userBalance = responses[1]

                    if (stakeBalance.rows.length) {
                        if (stakeBalance.rows[0].account === wallet.auth?.accountName) {
                            setStakeBalance(stakeBalance.rows[0].balance)
                        }
                    }

                    if (userBalance.rows.length) {

                        if (setBalanceContract() === ContractNames.boxvpContract) {
                            for (let i = 0; i < userBalance.rows.length; i++) {
                                let symbol = userBalance.rows[i].balance.split(' ')[1]
                                if (symbol === 'BOXVP') {
                                    setUserBalance(userBalance.rows[i].balance)
                                }
                            }

                        } else {
                            setUserBalance(userBalance.rows[0].balance)
                        }
                    }
                }
            } catch (e) {
                console.log('something went wrong in getting initial value', e)
            }
        }

        if (walletConnected) {
            getInitialBalance()
        }

    }, [walletConnected])

    const getStakeBalance = async () => {
        try {

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                const stakeBalance = await wallet.eosApi.rpc.get_table_rows({
                    code: setStakeContract(),
                    table: ContractTable.stakeTable,
                    scope: setStakeContract(),
                    limit: 1,
                    lower_bound: wallet.auth?.accountName
                })

                if (stakeBalance.rows.length) {
                    if (stakeBalance.rows[0].account === wallet.auth?.accountName) {
                        setStakeBalance(stakeBalance.rows[0].balance)
                    }
                }
            }

        } catch (e) {
            console.log('something went wrong in getting stake balance ', e)
        }
    }

    const getUserBalance = async () => {
        try {

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                const userBalance = await wallet.eosApi.rpc.get_table_rows({
                    code: setBalanceContract(),
                    table: ContractTable.balanceTable,
                    scope: wallet.auth?.accountName
                })

                if (userBalance.rows.length) {
                    if (setBalanceContract() === ContractNames.boxvpContract) {
                        for (let i = 0; i < userBalance.rows.length; i++) {
                            let symbol = userBalance.rows[i].balance.split(' ')[1]
                            if (symbol === 'BOXVP') {
                                setUserBalance(userBalance.rows[i].balance)
                            }
                        }

                    } else {
                        setUserBalance(userBalance.rows[0].balance)
                    }
                }
            }

        } catch (e) {
            console.log('something went wrong in getting user balance ', e)
        }
    }

    const handleStake = async (values: any) => {

        try {
            const { stakeValue } = values
            const tokenVal = `${parseFloat(stakeValue).toFixed(setPrecision())} ${token}`
            console.log('token val ', tokenVal)
            setStakeLoading(true)

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                await wallet.eosApi.transact({
                    actions: [
                        {
                            account: setStakeActionContract(),
                            name: 'transfer',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                from: wallet?.auth?.accountName,
                                to: setStakeSendContract(),
                                quantity: tokenVal,
                                memo: `staking ${token} token`
                            }
                        }
                    ]
                },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    }
                )

                dispatch(showNotification({ notificationText: 'Deposit Successful', notificationType: 1 }))
                getStakeBalance()
                getUserBalance()
            }
        } catch (e) {
            console.log('something went wrong in handle stake', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Deposit Failed'), notificationType: 2 }))
        } finally {
            setStakeLoading(false)
        }
    }

    const handleUnstake = async (values: any) => {

        try {
            const { unstakeValue } = values
            const tokenVal = `${parseFloat(unstakeValue).toFixed(setPrecision())} ${token}`
            console.log('token val ', tokenVal)
            setUnstakeLoading(true)

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                await wallet.eosApi.transact({
                    actions: [
                        {
                            account: setStakeContract(),
                            name: 'unstake',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                receiver: wallet?.auth?.accountName,
                                quantity: tokenVal,
                                memo: `unstaking ${token} token`
                            }
                        }
                    ]
                },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    }
                )

                dispatch(showNotification({ notificationText: 'Withdraw Successful', notificationType: 1 }))
                getStakeBalance()
                getUserBalance()
            }
        } catch (e) {
            console.log('something went wrong in handle unstake ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Withdraw Failed'), notificationType: 2 }))
        } finally {
            setUnstakeLoading(false)
        }
    }

    const calculatePercentageOfStake = (percent: number): string => {
        return `${(parseFloat(userBalance.split(' ')[0]) * percent / 100).toFixed(setPrecision())}`
    }

    const calculatePercentageOfUnstake = (percent: number): string => {
        return `${(parseFloat(stakeBalance.split(' ')[0]) * percent / 100).toFixed(setPrecision())}`
    }

    const renderForm = () => {
        if (!show) return null

        return (
            <div>
                <Line />
                <FormWrapper>

                    <FormContainer>
                        <Formik
                            initialValues={stakeValue}
                            validationSchema={stakeSchema}
                            onSubmit={handleStake}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <LabelContainer>
                                        <Label>
                                            Balance:
                                        </Label>
                                        <LabelValue>
                                            {userBalance}
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="Input Amount" name="stakeValue" />

                                        <ResponsivePercentageContainer>
                                            <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(25))}>
                                                25%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(50))}>
                                                50%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(75))}>
                                                75%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(100))}>
                                                100%
                                            </PercentBox>
                                        </ResponsivePercentageContainer>

                                        <FormButton type="submit" disabled={stakeLoading}>
                                            {stakeLoading ? <Loader color={'#fff'} /> : 'Deposit'}
                                        </FormButton>
                                    </InputContainer>

                                    <PercentageContainer>
                                        <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(25))}>
                                            25%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(50))}>
                                            50%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(75))}>
                                            75%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("stakeValue", calculatePercentageOfStake(100))}>
                                            100%
                                        </PercentBox>
                                    </PercentageContainer>

                                    <FormError>
                                        <ErrorMessage name="stakeValue" />
                                    </FormError>
                                </Form>
                            )}
                        </Formik>

                    </FormContainer>

                    <FormContainer>

                        <Formik
                            initialValues={unstakeValue}
                            validationSchema={unstakeSchema}
                            onSubmit={handleUnstake}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <LabelContainer>
                                        <Label>
                                            Balance:
                                        </Label>
                                        <LabelValue>
                                            {stakeBalance}
                                        </LabelValue>
                                    </LabelContainer>

                                    <InputContainer>
                                        <FormInput placeholder="Input Amount" name="unstakeValue" />

                                        <ResponsivePercentageContainer>
                                            <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(25))}>
                                                25%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(50))}>
                                                50%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(75))}>
                                                75%
                                            </PercentBox>
                                            <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(100))}>
                                                100%
                                            </PercentBox>
                                        </ResponsivePercentageContainer>

                                        <FormButton type="submit" disabled={unstakeLoading}>
                                            {unstakeLoading ? <Loader color={'#fff'} /> : 'Withdraw'}
                                        </FormButton>
                                    </InputContainer>

                                    <PercentageContainer>
                                        <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(25))}>
                                            25%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(50))}>
                                            50%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(75))}>
                                            75%
                                        </PercentBox>
                                        <PercentBox onClick={() => setFieldValue("unstakeValue", calculatePercentageOfUnstake(100))}>
                                            100%
                                        </PercentBox>
                                    </PercentageContainer>

                                    <FormError>
                                        <ErrorMessage name="unstakeValue" />
                                    </FormError>
                                    <FeesContainer>
                                        Mining Weight : {miningWeight}
                                    </FeesContainer>

                                </Form>
                            )}

                        </Formik>

                    </FormContainer>
                </FormWrapper>
                <BottomLine />
            </div>
        )
    }

    const setSrouce = (symbol: string): string => {
        switch (symbol) {
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

    return (
        <Wrapper>
            <SideBar background={borderColor} />

            <Container>
                <TokenWrapper>

                    <TokenTextContainer>

                        <TokenIconContainer>
                            <TokenImg src={setSrouce(token)} alt="token" />
                        </TokenIconContainer>
                        <TokenText>
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

export default StakeForm