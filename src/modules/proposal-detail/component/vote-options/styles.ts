import styled from 'styled-components'
import {Field} from "formik";

export const Container = styled.div`
    width: 531px;
    background: white;
    margin: 62px auto 0 auto;
    padding-bottom: 50px;
`

export const ModalHeader = styled.div`
    padding: 17px 0;
    text-align: center;
    background: #FAFAFA;
    font-size: 20px;
    line-height: 27px;
    color: #394042;
    position: relative;
`

export const WalletContainer = styled.div`
    margin-top: 26px;
    padding: 0 38px;
    display: block;
    justify-content: space-between;
    align-items: center;
    display:inline-flex;
    width:100%;
`

export const ButtonBlock = styled.div`
    display:block;
    margin:25px;
`

export const ConnectBtn = styled.button`
    width: 60%;
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
    padding:25px;
    margin:auto;

    :disabled {
        cursor: not-allowed;
        border-color: rgba(230,57,86,0.05);
        background: rgba(230,57,86,0.05);
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
`
export const TextArea = styled.textarea`
    width:100%;
    padding:15px 15px;
`

interface VoteProps {
    active: boolean
}

export const OptionsBlock = styled.div<VoteProps>`
   width:30%;
   border-radius: 2px;
   box-shadow: 0 1px 6px rgba(57,73,76,.35);
   cursor:pointer;
   margin:3%;
   margin:auto;
   padding:15px;
   border:${props => (props.active ? `2px solid green` : ``)};
   
`
export const OptionsImage = styled.img`
   height:45px;
   display:inline-flex;
   text-align:center;
    margin-left: 30%;
    margin-right: 30%;
    margin-bottom:15px;
`
export const OptionText = styled.p`
  font-size:17px;
  text-align:center;
  font-weight:600;
`