import styled from 'styled-components'
import {Field} from "formik";

export const Container = styled.div`
    width: 531px;
    background: white;
    margin: 62px auto 0 auto;
    padding-bottom: 50px;

    @media (max-width: 700px) {
        width: 95%;
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
`

export const WalletContainer = styled.div`
    margin-top: 26px;
    padding: 0 38px;
    display: block;
    justify-content: space-between;
    align-items: center;
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

export const NewProposalBtn = styled.button`
    cursor: pointer;
    background: #E63956;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    width: 182px;
    height: 46px;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #ffffff;
    border: 1px solid #E63956;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: 300ms all;
    margin:auto;

  :disabled {
    background-color: rgba(230,57,86,0.5);
    cursor: not-allowed;
  }
`
export const FormInput = styled(Field)`
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    box-sizing: border-box;
    border-radius: 3px;
    width: 100%;
    height: 100%;
    padding: 19px;
    margin-top:25px;

    ::placeholder {
        color: #1C1C1C;
        opacity: 0.6;
        fonts-size: 16px;
    }

    @media (max-width: 500px){
      width: 100%;
    }
`
export const NoteText = styled.div`
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
    position: relative;
    padding: .75rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;

`