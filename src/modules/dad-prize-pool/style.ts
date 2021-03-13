import styled from 'styled-components'

export const Balance = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #394042;
`

export const Round = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #394042;
  margin: 0 5px 0 5px;
`

export const Header = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #394042;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%
`

export const TransferContainer = styled.div`
    padding-top: 23px;
`

export const ClaimBtnContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ClaimTokenText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #394042;
  margin-right: 20px;
`

export const ClaimBtn = styled.button`
    cursor: pointer;
    background: #E63956;
    box-shadow: 0px 2px 10px rgba(230, 57, 86, 0.2);
    border-radius: 2px;
    width: 182px;
    height: 46px;
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

  :disabled {
    cursor: not-allowed;
    background: rgba(230,57,86,0.5);
  }
`

export const TextContainer = styled.div`
  display: flex;
  margin: 5px 0;
  justify-content: space-between;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`

export const RoundContainer = styled.div`
    display: flex;
    margin: 5px 0;
    ${Round}:first-child {
      margin-left: 10px;
    }
`

export const BalanceContainer = styled.div`
    display: flex;
    margin: 5px 0;
    ${Balance}:first-child {
      margin-right: 15px;
    }
`

export const PrizeContainer = styled.div`
    display: flex;
    margin-top: 15px;
    ${Balance}:first-child {
      margin-right: 15px;
    }
`

export const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 500px) {
      flex-direction: column;
    }
`
export const Title = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #394042;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%
`

export const Select = styled.select`
  border-radius: 2px;
  box-shadow: 0px 1px 5px rgba(230, 57, 86, 0.2);
  width: 200px;
  height: 46px;
  font-weight: 600;
  line-height: 18px;
  color: #E63956;
  border: 0;
  align-items: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-right: 10px;
  padding: 10px;
`
export const Option = styled.option`
    background: none;
    padding: 2px;
`