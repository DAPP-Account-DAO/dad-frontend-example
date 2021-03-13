import * as React from 'react'
import {
    HeaderContainer,
    InputContainer,
    DappAccountText,
    ConnectContainer,
    UserName,
    ConnectBtn,
    MenuIconImg
} from './style'
import {
    MenuIcon
} from '../../images'
import { Modal } from '../../shared'
import {
    ConnectModal
} from './components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar, showNotification, logout } from '../../logic/actions/actions'
import WalletProvider from '../../utils/wallet'
import { StorageKey } from '../../utils/constants'

const { useState } = React

const Header = () => {

    const [show, setShow] = useState(false)
    const username = useSelector((state: any) => state.user.username)
    const walletConnected = useSelector((state: any) => state.user.walletConnected)
    const dispatch = useDispatch()

    const closeModal = () => {
        setShow(false)
    }

    const handleConnectBtnClick = async () => {
        if (walletConnected) {

            try {
                const wallet = WalletProvider.getWallet()

                if (!!wallet) {
                    await WalletProvider.disconnectWallet()
                    dispatch(logout())
                    dispatch(showNotification({notificationText: 'Logout Successful', notificationType: 1}))
                    localStorage.removeItem(StorageKey.walletType)
                }
            } catch (e) {
                console.log('something went wrong ', e)
                dispatch(showNotification({notificationText: 'Something went wrong', notificationType: 2}))
            }
        } else {
            setShow(true)
        }
    }

    return (
        <React.Fragment>

            <HeaderContainer>
                <InputContainer>
                    <div onClick={() => dispatch(toggleSideBar())}>
                        <MenuIconImg
                            src={MenuIcon}
                            alt="Menu icon"
                        />
                    </div>

                    <DappAccountText>
                        DAD
                    </DappAccountText>
                </InputContainer>

                <ConnectContainer>
                    <UserName>
                        {username}
                    </UserName>
                    <ConnectBtn onClick={handleConnectBtnClick}>
                        {walletConnected ? 'logout' : 'connect'}
                    </ConnectBtn>
                </ConnectContainer>
            </HeaderContainer>
            <Modal
                show={show}
            >
                <ConnectModal
                    closeModal={closeModal}
                />
            </Modal>
        </React.Fragment>
    )
}

export default Header