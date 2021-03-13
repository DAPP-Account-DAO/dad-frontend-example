import styled from 'styled-components'

interface Props {
    showSideBar: boolean
}

export const SideBarContainer = styled.div<Props>`
    min-height: 100vh;
    width: 212px;
    min-width: 212px;
    background: white;
    margin: 10px 0 10px 15px;
    border: 1px solid #EBEBEB;
    transition: all 300ms;

    @media (max-width: 1000px) {
        margin: ${props => props.showSideBar ? '10px 15px 10px 15px' : '0'};
        border: ${props => props.showSideBar ? '1px solid #EBEBEB' : '0'};
        opacity: ${props => props.showSideBar ? '1' : '0'};
        width: ${props => props.showSideBar ? '100%' : '0'};
        min-width: unset;
    }
`
export const LinkText = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
`

interface LinkContainerProps {
    active: boolean
}

export const LinkContainer = styled.div<LinkContainerProps>`
    padding-top: 31px;
    padding-left: 17px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${props => props.active ? "#E63956" : "#394042"};
    transition: 300ms all;

    img {
        filter: ${props => props.active ? "invert(29%) sepia(55%) saturate(2685%) hue-rotate(328deg) brightness(95%) contrast(89%)" : ""};
    }
`

export const IconContainer = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 13px;

    img {
        transition: 300ms all;
    }
`