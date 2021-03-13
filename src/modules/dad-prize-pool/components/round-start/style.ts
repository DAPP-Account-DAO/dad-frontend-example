import styled from "styled-components";

export const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;

    @media (max-width: 500px) {
      flex-direction: column;
    }
`

export const RoundStartBtn = styled.button`
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

  @media (max-width: 500px) {
    margin-top: 30px;
    width: 100%;
  }
`