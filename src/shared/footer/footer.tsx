import * as React from 'react'
import {
    FooterContainer
} from './style'
import { ContractNames } from '../../utils/constants'

const Footer = () => {
    return (
        <FooterContainer>
            This is a community driven project, send donation to { ContractNames.donationContract } to support this website
        </FooterContainer>
    )
}

export default Footer