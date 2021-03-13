import * as React from 'react'
import {
    Container,
    ModalHeader,
    WalletContainer,
    IconContainer,
    WalletIcon,
    WalletName,
    ConnectBtn,
    CloseBtnContainer
} from './style'

import {
    ScatterIcon,
    CloseBtnIcon,
    TokenPocketIcon,
    AnchorWalletIcon
} from '../../../../images'
import { Loader } from '../../../../shared'
import WalletProvider from '../../../../utils/wallet'
import { login, showNotification } from '../../../../logic/actions/actions'
import { useDispatch } from 'react-redux'
import { StorageKey } from '../../../../utils/constants'

const { useState } = React

interface Props {
    closeModal: () => void
}

const ConnectModal = (props: Props) => {

    const { closeModal } = props
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(-1)

    const connectWallet = async (index: number) => {

        try {
            setActive(index)
            setLoading(true)
            await WalletProvider.login(index)
            const wallet = WalletProvider.getWallet()
            dispatch(login({ username: wallet?.auth?.accountName }))
            dispatch(showNotification({ notificationText: 'Wallet Connected', notificationType: 1 }))
            localStorage.setItem(StorageKey.walletType, index.toString())
            closeModal()

        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: 'Failed to connect', notificationType: 2 }))
        } finally {
            setLoading(false)
            setActive(-1)
        }
    }

    return (
        <Container>
            <ModalHeader>
                Connect wallet to login

                <CloseBtnContainer onClick={closeModal}>
                    <img src={CloseBtnIcon} alt="CloseBtnIcon" />
                </CloseBtnContainer>
            </ModalHeader>

            <WalletContainer>
                <IconContainer>
                    <WalletIcon>
                        <img src={ScatterIcon} alt="ScatterIcon" />
                    </WalletIcon>
                    <WalletName>
                        Scatter
                    </WalletName>
                </IconContainer>
                <ConnectBtn onClick={() => connectWallet(0)} disabled={loading}>
                    {loading && active === 0 ? <Loader color={"#E63956"} /> : "Connect"}
                </ConnectBtn>
            </WalletContainer>

            <WalletContainer>
                <IconContainer>
                    <WalletIcon>
                        <img src={TokenPocketIcon} alt="TokenPocketIcon" />
                    </WalletIcon>
                    <WalletName>
                        Token Pocket
                    </WalletName>
                </IconContainer>
                <ConnectBtn onClick={() => connectWallet(1)} disabled={loading}>
                    {loading && active === 1 ? <Loader color={"#E63956"} /> : "Connect"}
                </ConnectBtn>
            </WalletContainer>

            <WalletContainer>
                <IconContainer>
                    <WalletIcon>
                        <img src={AnchorWalletIcon} alt="AnchorWalletIcon" />
                    </WalletIcon>
                    <WalletName>
                        Anchor
                    </WalletName>
                </IconContainer>
                <ConnectBtn onClick={() => connectWallet(2)} disabled={loading}>
                    {loading && active === 2 ? <Loader color={"#E63956"} /> : "Connect"}
                </ConnectBtn>
            </WalletContainer>


        </Container>
    )
}

export default ConnectModal