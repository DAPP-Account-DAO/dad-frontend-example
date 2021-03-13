import styled from 'styled-components'

export const ProposalContainer = styled.div`
    flex: 1;
    margin: 0 17px;
    padding:25px
`
export const ProposalBreadCrumb = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
`
export const SpanRed = styled.span`
    color:#E63956;
`
export const ProposalMainHeading = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #394042;
    margin-top:25px;
    margin-bottom:5px;
`
export const ProposalDesc = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #394042;
    opacity: 0.8;
    margin-bottom:25px;
    padding-bottom:15px;
    `
export const ProposalInlineBox = styled.div`
    display:inline-flex;
    width:100%;
    margin-top:45px;
    margin-bottom:45px;
  `
export const BoxContainer3 = styled.div`
   width:33.33%
`
export const BoxContainer4 = styled.div`
   width:25%
`

export const BoxHeading = styled.h6`
    color: #394042;
    opacity: 0.8;
    font-size:16px;
    font-style: normal;
    font-weight: normal;
    `
export const BoxDescription = styled.p`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #394042;
    `
export const Horizontal = styled.hr`
  width:100%;
  border: 1px solid #F4F4F4;
`
export const PropMarginBox = styled.div`
    margin-top:35px;
    margin-bottom:35px;
    background: white;
    padding: 15px 25px;
 `
export const BoldText = styled.span`
 font-weight: 600
`
export const ProposalDesc2 = styled.p`
    font-size:16px;
    font-weight:400;
    color: #394042;
    opacity: 0.8;
    margin-bottom:8px;
    `
export const VoteButton = styled.button`
    border: 1px solid #E63956;
    box-sizing: border-box;
    border-radius: 2px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #E63956;
    padding:12px 45px;
    background:white;
    cursor:pointer;
    margin-left: 10px;
    `
export const Width80 = styled.div`
    width:80%;
    `
export const Width20 = styled.div`
    width:20%;
    `
export const AnchorText = styled.a`
    display:inline-flex;
    color:#1616ac;
    cursor:pointer;
    `

export const AuthorContainer = styled.div`
    margin-top:45px;
    margin-bottom:45px;
    display: flex;
    justify-content: space-between;
    align-items: center
`

export const BtnContainer = styled.div`
    display: flex;
    align-items: center;
`

export const TallyBtn = styled.button`
    cursor: pointer;
    background: #E63956;
    box-shadow: 0px 2px 10px rgba(230, 57, 86, 0.2);;
    border-radius: 2px;
    width: 130px;
    height: 42px;
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