import * as React from 'react'
import {
    SideBarContainer,
    LinkContainer,
    IconContainer,
    LinkText
} from './style'
import {
    AllProposalIcon,
    DepositIcon,
    GovernanceIcon,
    StatsIcon
} from '../../images'
import { Paths } from '../../utils/constants'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar } from '../../logic/actions/actions'
import { useLocation } from 'react-router-dom'

const SideBar = () => {

    const { pathname } = useLocation()

    const history = useHistory()
    const showSideBar = useSelector((state: any) => state.user.showSideBar)
    const dispatch = useDispatch()

    const goTo = (path: string) => {
        history.push(path)
        if (showSideBar) {
            dispatch(toggleSideBar())
        }
    }

    return (
        <SideBarContainer
            showSideBar={showSideBar}
        >
            <LinkContainer onClick={() => goTo(Paths.home)} active={pathname === Paths.home}>
                <IconContainer>
                    <img src={DepositIcon} alt="DepositIcon" />
                </IconContainer>
                <LinkText>
                    Deposit
                </LinkText>
            </LinkContainer>
            <LinkContainer onClick={() => goTo(Paths.prizepool)} active={pathname === Paths.prizepool}>
                <IconContainer>
                    <img src={DepositIcon} alt="DepositIcon" />
                </IconContainer>
                <LinkText>
                DAD Prize Pool
                </LinkText>
            </LinkContainer>
            <LinkContainer onClick={() => goTo(Paths.rafflepool)} active={pathname === Paths.rafflepool}>
                <IconContainer>
                    <img src={DepositIcon} alt="DepositIcon" />
                </IconContainer>
                <LinkText>
                DAD Daily Raffle
                </LinkText>
            </LinkContainer>
            <LinkContainer onClick={() => goTo(Paths.allProposals)} active={pathname === Paths.allProposals}>
                <IconContainer>
                    <img src={AllProposalIcon} alt="AllProposalIcon" />
                </IconContainer>
                <LinkText>
                    All proposal
                </LinkText>
            </LinkContainer>
            {/* <LinkContainer onClick={() => goTo(Paths.governance)} active={pathname === Paths.governance}>
                <IconContainer>
                    <img src={GovernanceIcon} alt="GovernanceIcon" />
                </IconContainer>
                <LinkText>
                    Governance
                </LinkText>
            </LinkContainer> */}
            <LinkContainer onClick={() => goTo(Paths.stats)} active={pathname === Paths.stats}>
                <IconContainer>
                    <img src={StatsIcon} alt="StatsIcon" />
                </IconContainer>
                <LinkText>
                    Stats
                </LinkText>
            </LinkContainer>
        </SideBarContainer>
    )
}

export default SideBar