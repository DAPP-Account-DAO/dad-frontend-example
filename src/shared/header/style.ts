import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100%;
    height: 65px;
    background: #ffffff;
    border-bottom: 1px solid #ebebeb;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1000px) {
        flex-direction: column;
        height: unset;
        padding: 0 16px 16px 16px;
    }
`

export const InputContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 1000px) {
        width: 100%;
        justify-content: space-between;
        padding: 15px 0;
    }
`

export const DappAccountText = styled.div`
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    text-transform: uppercase;
    color: #394042;
`

export const Bar = styled.div`
    height: 26px;
    width: 2px;
    background: #F4F4F4;
    margin-left: 83px;

    @media (max-width: 1000px) {
        display: none;
    }
`

export const ConnectContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 1000px) {
        width: 100%;
        justify-content: space-between;
    }
`

export const Dropdown = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #f4f4f4;
`

export const UserName = styled.div`
    width: 100px;
    font-size: 15px;
    line-height: 20px;
    color: #394042;
    opacity: 0.6;
    text-align: left;
`

export const ProfilePhoto = styled.div`
    width: 35px;
    height: 35px;
    margin-right: 19px;
    border-radius: 50%;
    background: #f4f4f4;
`

export const Bar2 = styled.div`
    height: 26px;
    width: 2px;
    background: #F4F4F4;
    margin-right: 26px;

    @media (max-width: 1000px) {
        display: none;
    }
`

export const NotificationContainer = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 25px;
`

export const Bar3 = styled.div`
    height: 26px;
    width: 2px;
    background: #F4F4F4;
    margin-right: 38px;
`

export const ConnectBtn = styled.button`
    width: 130px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #E63956;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #E63956;
    margin-left: 24px;
    background: #ffffff;

    @media (max-width: 1000px) {
        margin-right: 0px;
    }
`

export const StakeBtn = styled.button`
    width: 130px;
    height: 40px;
    border-radius: 2px;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    border: 1px solid #E63956;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    margin-right: 12px;
    background: #E63956;
    box-shadow: 0px 2px 10px rgba(231, 162, 15, 0.35);
`

export const MenuIconImg = styled.img`
    display: none;

    @media (max-width: 1000px) {
        display: block;
        cursor: pointer;
    }
`