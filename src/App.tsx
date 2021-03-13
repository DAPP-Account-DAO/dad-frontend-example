import * as React from 'react'
import { Header, SideBar, Footer } from './shared'
import { AppContainer, Layout, PageContainer } from './style'
import { AllProposals, Deposit, ProposalDetails,Stats } from './modules'
import { Paths } from './utils/constants'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Notification } from './shared'
import { useSelector } from 'react-redux'
import WalletProvider from './utils/wallet'
import { useDispatch } from 'react-redux'
import {
    login,
    showNotification
} from './logic/actions/actions'
import { StorageKey } from './utils/constants'
import DepositPrizePool from './modules/dad-prize-pool/index';
import RafflePrizePool from './modules/raffle-prize-pool'
const { useEffect } = React

function App() {

    const showSideBar = useSelector((state: any) => state.user.showSideBar)
    const dispatch = useDispatch()

    useEffect(() => {
        const connectWallet = async (walletType: number) => {

            try {

                await WalletProvider.login(walletType)
                const wallet = WalletProvider.getWallet()
               
                if (!!wallet) {
                    dispatch(login({ username: wallet?.auth?.accountName }))
                    dispatch(showNotification({ notificationText: 'Wallet Connected', notificationType: 1 }))
                }
            } catch (e) {
                console.log('something went wrong ', e)
                dispatch(showNotification({ notificationText: 'Failed to connect', notificationType: 2 }))
            }
        }

        const walletType = localStorage.getItem(StorageKey.walletType)

        if (!!walletType) {
            let wallet = parseInt(walletType)

            if (wallet >= 0) {
                connectWallet(wallet)
            }
        }
    }, [])

    return (
        <Router>
            <AppContainer>
                <Header />
                <Notification />
                <Layout>
                    <SideBar />
                    <PageContainer
                        showSideBar={showSideBar}
                    >
                        <Switch>
                            <Route exact path={Paths.home} component={Deposit} />
                            <Route exact path={Paths.allProposals} component={AllProposals} />
                            <Route exact path={`${Paths.proposalDetails}/:proposalId`} component={ProposalDetails} />
                            <Route exact path={Paths.prizepool} component={DepositPrizePool} />
                            <Route exact path={Paths.rafflepool} component={RafflePrizePool} />
                            <Route exact path={Paths.stats} component={Stats} />
                        </Switch>
                    </PageContainer>
                </Layout>
                <Footer />
            </AppContainer>
        </Router>
    );
}

export default App;
