import styled from 'styled-components'

export const AppContainer = styled.div`
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    background-color: #FAFAFA;
    min-height: 100vh;
`

export const Layout = styled.div`
    display: flex;
`

interface PageContainerProps {
    showSideBar: boolean
}

export const PageContainer = styled.div<PageContainerProps>`
    margin: 0 17px;
    flex: 1;
    padding: 25px 0;
    transition: 300ms all;
    transition-delay: ${props => props.showSideBar ? '0' : '300ms'};
    overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    @media (max-width: 1000px) {
        display: ${props => props.showSideBar ? 'none' : 'block'};
        flex: ${props => props.showSideBar ? '0' : '1'};
        opacity: ${props => props.showSideBar ? '0' : '1'};
        width: ${props => props.showSideBar ? '0' : '100%'};
        margin: ${props => props.showSideBar ? '0' : '0 17px'};
    }
`