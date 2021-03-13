import styled from 'styled-components'
import { Field } from 'formik'

export const Balance = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #394042;
`

export const TextContainer = styled.div`
  display: flex;
  margin: 20px 0;

  ${Balance}:first-child {
    margin-right: 15px;
  }

  @media (max-width: 450px) {
    flex-direction: column;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

export const FormContainer = styled.div`
  padding: 20px 28px 20px 28px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 20px; 
  border-radius: 5px;
  width: 49%;

  @media (max-width: 700px) {
    width: 100%;
    margin-top: 20px;
    padding: 20px 10px;
  }
`

export const FormHeader = styled.div`
  font-size: 18px;
  color: #E63956;
  font-weight: 500;
`

export const FormSubmitBtn = styled.button`
    cursor: pointer;
    background: #E63956;
    box-shadow: 0px 2px 10px rgba(230, 57, 86, 0.2);;
    border-radius: 2px;
    width: 100%;
    height: 48px;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #ffffff;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: 300ms all;
    margin-top: 30px;

  :disabled {
    cursor: not-allowed;
    background: rgba(230,57,86,0.5);
  }
`

export const FormInput = styled(Field)`
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    box-sizing: border-box;
    border-radius: 3px;
    width: 100%;
    height: 48px;
    padding: 10px;
    margin-top: 30px;

    ::placeholder {
        color: #1C1C1C;
        opacity: 0.6;
        fonts-size: 16px;
    }

    @media (max-width: 500px){
      width: 100%;
    }
`

export const FormError = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: red;
  font-weight: 500;
`

export const Header = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #394042;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
