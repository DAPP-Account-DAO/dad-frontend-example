import * as React from 'react'
import {
    TextContainer,
    Balance,
    Container,
    FormContainer,
    FormHeader,
    FormSubmitBtn,
    FormError,
    FormInput,
    Header
} from './style'
import { useSelector, useDispatch } from 'react-redux'
import WalletProvider from '../../utils/wallet'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Loader } from '../../shared'
import { showNotification } from '../../logic/actions/actions'
import { ContractNames, ContractTable } from '../../utils/constants'
import { generateError } from '../../utils/helpers'

const { useState, useEffect } = React

const stakeSchema = Yup.object().shape({
    stakeValue: Yup.number().required('Enter Stake Amount').min(0.0001, "Should be greater than 0"),
})

const stakeInitial = {
    stakeValue: '',
}

const unstakeSchema = Yup.object().shape({
    unstakeValue: Yup.number().required('Enter Unstake Amount').min(0.0001, "Should be greater than 0"),
})

const unstakeInitial = {
    unstakeValue: '',
}

const Governance = () => {

    const [stakeBalance, setStakeBalance] = useState('0.000000 DAD')
    const [disableStake, setDisableStake] = useState(false)
    const [disableUnstake, setDisableUnstake] = useState(false)
    const [dadToken, setDadToken] = useState('0.000000 DAD')

    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()

    const getBalance = async () => {

        try {
            const wallet = WalletProvider.getWallet()

            if (!!wallet && walletConnected) {

                const balances = await wallet.eosApi.rpc.get_table_rows({
                    code: ContractNames.dadGovernanceContract,
                    table: ContractTable.stakeTable,
                    scope: ContractNames.dadGovernanceContract,
                    limit: 1,
                    lower_bound: wallet.auth?.accountName
                })

                if (balances.rows.length) {

                    if (balances.rows[0].account === wallet.auth?.accountName) {
                        setStakeBalance(balances.rows[0].balance)
                    }
                }
            }
        } catch (e) {
            console.log('something went wrong in getting stake balance ', e)
        }
    }

    useEffect(() => {

        const getBalance = async () => {
            if (walletConnected) {

                try {
                    const wallet = WalletProvider.getWallet()

                    if (!!wallet) {

                        const stakeBalance = await wallet.eosApi.rpc.get_table_rows({
                            code: ContractNames.dadGovernanceContract,
                            table: ContractTable.stakeTable,
                            scope: ContractNames.dadGovernanceContract,
                            limit: 1,
                            lower_bound: wallet.auth?.accountName
                        })

                        if (stakeBalance.rows.length) {

                            if (stakeBalance.rows[0].account === wallet.auth?.accountName) {
                                setStakeBalance(stakeBalance.rows[0].balance)
                            }
                        }

                        const dadBalance = await wallet.eosApi.rpc.get_table_rows({
                            code: ContractNames.dadTokenContract,
                            table: 'accounts',
                            scope: wallet.auth?.accountName
                        })

                        if (dadBalance.rows.length) {
                            setDadToken(dadBalance.rows[0].balance)
                        }
                    }
                } catch (e) {
                    console.log('something went wrong in getting balances ', e)
                }
            }
        }

        getBalance()
    }, [walletConnected])

    const handleStake = async (values: any) => {

        try {
            setDisableStake(true)
            const { stakeValue } = values
            const token = `${parseFloat(stakeValue).toFixed(6)} DAD`

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.dadTokenContract,
                            name: 'transfer',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                from: wallet?.auth?.accountName,
                                to: ContractNames.dadGovernanceContract,
                                quantity: token,
                                memo: 'stake DAD token'
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

                dispatch(showNotification({ notificationText: 'Stake Successful', notificationType: 1 }))
                getBalance()
                getDadBalance()
            }
        } catch (e) {
            console.log('something went wrong in stake', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Stake Failed'), notificationType: 2 }))
        } finally {
            setDisableStake(false)
        }
    }

    const getDadBalance = async () => {
        try {

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const balance = await wallet.eosApi.rpc.get_table_rows({
                    code: ContractNames.dadTokenContract,
                    table: 'accounts',
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

    const handleUnstake = async (values: any) => {

        try {
            setDisableUnstake(true)

            const { unstakeValue } = values
            const token = `${parseFloat(unstakeValue).toFixed(6)} DAD`
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.dadGovernanceContract,
                            name: 'unstake',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                receiver: wallet?.auth?.accountName,
                                quantity: token,
                                memo: 'unstake DAD token'
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

                dispatch(showNotification({ notificationText: 'Unstake Successful', notificationType: 1 }))
                getBalance()
                getDadBalance()
            }

        } catch (e) {
            console.log('something went wrong in unstake ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Unstake Failed'), notificationType: 2 }))
        } finally {
            setDisableUnstake(false)
        }
    }

    return (
        <div>
            <Header>
                Governance
            </Header>
            <TextContainer>
                <Balance>
                    Stake Balance :
                </Balance>
                <Balance>
                    {stakeBalance}
                </Balance>
            </TextContainer>
            <TextContainer>
                <Balance>
                    DAD Balance :
                </Balance>
                <Balance>
                    {dadToken}
                </Balance>
            </TextContainer>

            <Container>
                <FormContainer>
                    <FormHeader>
                        Stake DAD Token
                    </FormHeader>
                    <Formik
                        initialValues={stakeInitial}
                        validationSchema={stakeSchema}
                        onSubmit={handleStake}
                    >
                        <Form>
                            <FormInput placeholder="Enter Stake Amount" name="stakeValue" />

                            <FormError>
                                <ErrorMessage name="stakeValue" />
                            </FormError>

                            <FormSubmitBtn disabled={disableStake} type="submit">
                                {disableStake ? <Loader color={"white"} /> : "Stake"}
                            </FormSubmitBtn>
                        </Form>

                    </Formik>
                </FormContainer>

                <FormContainer>
                    <FormHeader>
                        Unstake DAD Token
                    </FormHeader>
                    <Formik
                        initialValues={unstakeInitial}
                        validationSchema={unstakeSchema}
                        onSubmit={handleUnstake}
                    >
                        <Form>
                            <FormInput placeholder="Enter Unstake Amount" name="unstakeValue" />

                            <FormError>
                                <ErrorMessage name="unstakeValue" />
                            </FormError>

                            <FormSubmitBtn disabled={disableUnstake} type="submit">
                                {disableUnstake ? <Loader color={"white"} /> : "Unstake"}
                            </FormSubmitBtn>
                        </Form>

                    </Formik>
                </FormContainer>
            </Container>
        </div>
    )
}

export default Governance