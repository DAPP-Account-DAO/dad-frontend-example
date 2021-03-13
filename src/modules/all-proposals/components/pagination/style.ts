import styled from 'styled-components'
import { Field } from 'formik'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 700px) {
    justify-content: center;
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 67px;

  @media (max-width: 700px) {
    padding-right: 0px;

    flex-direction: column;
    align-items: center;
  }
`

interface PageSwitchBtnProps {
  inactive: boolean
}

export const PageSwitchBtn = styled.div<PageSwitchBtnProps>`
  width: 29px;
  height: 29px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => (props.inactive ? 'not-allowed' : 'pointer')};
  transition: background 300ms;
  background: white;
`

export const GoToPage = styled.div`
  margin-left: 42px;
  font-size: 17px;
  color: #394042;
  opacity: 0.7;

  @media (max-width: 700px) {
    margin-left: 0px;
  }
`

export const Switch = styled.div`
  margin: 0px 14px;
  display: flex;
  align-items: center;
`

interface PageIndicatorProps {
  active: boolean
}

export const PageIndicator = styled.div<PageIndicatorProps>`
  width: 33px;
  height: 33px;
  background: ${props => (props.active ? `#E63956` : `white`)};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  color: ${props => (props.active ? `white` : `#394042`)};
  transition: background 300ms, color 300ms;
`

export const ThreeDots = styled.div`
  margin: 0 14px;
`

export const FormError = styled.div`
  margin: 0 10px;
  font-size: 14px;
  color: red;
  font-weight: 500;
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
`

export const InputField = styled(Field)`
  background: white;
  width: 37px;
  height: 34px;
  background: white;
  border: 1px solid #E63956;
  border-radius: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0 19px;
  text-align: center;
  color:#E63956;
`

export const GoToButton = styled.button`
 color: #E63956;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  margin-right:5px;

  img {
    margin-left: 5px;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 700px) {
    margin-top: 30px;
  }
`
