import styled from 'styled-components'
import { Field } from 'formik'

interface SideBarProps {
    background: string
}

export const SideBar = styled.div<SideBarProps>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background: ${props => props.background};
`

export const Wrapper = styled.div`
    position: relative;
    background: white;
    margin-top: 9px;
    padding: 16px 0;
`

export const Container = styled.div`
    background: white;
    border-radius: 5px;
    padding: 0px 28px 0px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    @media (max-width: 700px){
      flex-direction: column;
      padding: 0 10px;
    }

   
`

export const TokenWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
    }
`

export const TokenTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 150px;

    @media (max-width: 800px) {
      justify-content: space-around;
    }
`

export const TokenIconContainer = styled.div`
    width: 34px;
    height: 34px;
`

export const TokenImg = styled.img`
    width: 100%;
    height: 100%;
`

export const TokenText = styled.div`
    font-size: 20px;
    line-height: 24px;
    color: black;
    margin-left: 15px;
    font-weight: 500;
`

export const YieldTexTContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;

    @media (max-width: 800px){
      margin-top: 20px;
      margin-left: 0;
    }
`

export const YieldText = styled.div`
    font-size: 18px;
    line-height: 24px;
    color: black;
`

export const YieldPercent = styled.div`
    margin-left: 5px;
    font-size: 20px;
    line-height: 24px;
    color: #E63956;
`

interface Props {
    show?: boolean
}

export const ToggleButton = styled.button<Props>`
  cursor: pointer;
  background: ${props => props.show ? "#ffffff" : "#E63956"};
  box-shadow: 0px 2px 10px rgba(230, 57, 86, 0.2);
  border-radius: 2px;
  width: 140px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  border: 1px solid #E63956;
  color: ${props => props.show ? "#E63956" : "#ffffff"};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  transition: 300ms all;

  :disabled {
    cursor: not-allowed;
    background: rgba(230,57,86,0.5);
  }

  @media (max-width: 700px) {
    margin-top: 20px;
    width: 100%;
  }

  
`

export const Line = styled.div`
  height: 2px;
  background: #e0e0e0;
  margin: 35px 56px 40px 28px;

  @media (max-width: 500px){
    margin: 35px 10px 40px 10px;
  }
`

export const BottomLine = styled.div`
  height: 2px;
  background: #e0e0e0;
  margin: 28px 56px 28px 28px;

  @media (max-width: 500px){
    margin: 35px 10px 40px 10px;
  }
`

export const NoteText = styled.div`
  margin-left: 48px;
  font-size: 16px;
  color: black;
  opacity: 0.6;

  @media (max-width: 500px){
    margin-left: 10px;
  }
`

export const FormWrapper = styled.div`
  margin: 0 56px 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 900px){
    flex-direction: column;
  }

  @media (max-width: 500px){
    margin: 0 10px;
  }
`

export const FormContainer = styled.div`
  width: 45%;

  @media (max-width: 900px){
    width: 100%;
    margin-top: 20px;
  }
`

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Label = styled.div`
  font-size: 18px;
  line-height: 22px;
  color: black;
`

export const LabelValue = styled.div`
  margin-left: 8px;
  font-size: 18px;
  line-height: 22px;
  color: black;
  font-weight: 500;
`

export const InputContainer = styled.div`
  margin-top: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 500px){
    flex-direction: column;
    align-items: flex-start;
  }
`

export const FormInput = styled(Field)`
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    box-sizing: border-box;
    border-radius: 3px;
    width: 58%;
    height: 48px;
    padding: 10px;

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

export const PercentBox = styled.div`
  width: 45px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(230,57,86, 0.05);
  border-radius: 3px;
  font-size: 12px;
  color: #E63956;
  cursor: pointer;
  font-weight: 500;
`

export const PercentageContainer = styled.div`
  margin-top: 22px;
  display: flex;
  align-item: center;

  ${PercentBox}:not(:first-child){
      margin-left: 16px;
  }

  @media (max-width: 500px){
    display: none;
  }
`

export const ResponsivePercentageContainer = styled.div`
  margin-top: 22px;
  display: flex;
  align-item: center;
  display: none;

  ${PercentBox}:not(:first-child){
      margin-left: 8px;
  }

  @media (max-width: 500px){
    display: flex;
  }
`

export const FormButton = styled.button`
  cursor: pointer;
  background: #E63956};
  box-shadow: 0px 2px 10px rgba(230, 57, 86, 0.2);
  border-radius: 2px;
  width: 37%;
  height: 48px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff};
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  transition: 300ms all;

  :disabled {
    cursor: not-allowed;
    background: rgba(230,57,86,0.5);
  }

  @media (max-width: 500px){
    width: 100%;
    margin-top: 20px;
  }
`

export const FeesContainer = styled.div`
  margin: 20px 0;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #394042;
`
