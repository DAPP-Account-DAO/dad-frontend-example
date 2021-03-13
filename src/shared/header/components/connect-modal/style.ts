import styled from 'styled-components'

export const Container = styled.div`
    width: 531px;
    background: white;
    margin: 62px auto 0 auto;
    padding-bottom: 50px;

    @media (max-width: 600px) {
        width: 95%;
        margin: 62px auto 0 auto;
    }
`

export const ModalHeader = styled.div`
    padding: 17px 0;
    text-align: center;
    background: #FAFAFA;
    font-size: 20px;
    line-height: 27px;
    color: #394042;
    position: relative;

    @media (max-width: 600px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px;
    }
`

export const WalletContainer = styled.div`
    margin-top: 26px;
    padding: 0 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
`

export const WalletIcon = styled.div`
    width: 33px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 11px;

    img {
        width: 100%;
        height: 100%;
    }
`

export const WalletName = styled.div`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #394042;
`

export const ConnectBtn = styled.button`
    width: 92px;
    height: 32px;
    border-radius: 2px;
    border: 1px solid #E63956;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: #E63956;
    background: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms all;

    :disabled {
        cursor: not-allowed;
    }
`

export const CloseBtnContainer = styled.div`
    width: 28px;
    height: 28px;
    position: absolute;
    right: 37px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    @media (max-width: 600px) {
        position: static;
        transform: translateY(0);
    }
`