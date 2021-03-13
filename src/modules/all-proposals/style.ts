import styled from 'styled-components'

export const ProposalContainer = styled.div`
    flex: 1;
    margin: 0 17px;
    padding-top: 19px;
    width:95%
   
`

export const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;

    @media (max-width: 500px) {
      flex-direction: column;
    }
`

export const Header = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #394042;
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

  :disabled {
    background-color: rgba(103, 136, 255, 0.5);
    cursor: not-allowed;
  }

  @media (max-width: 500px) {
    margin-top: 30px;
    width: 100%;
  }
`