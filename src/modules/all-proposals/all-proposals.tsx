import * as React from 'react'
import {BtnContainer, Header, NewProposalBtn, ProposalContainer} from './style'
import {AccountHistory, CreateProposalModal} from "./components";
import {Modal} from '../../shared'
const { Fragment } = React

const {useState} = React

const AllProposals = () => {

    const [show, setShow] = useState(false)

    const closeModal = () => {
        setShow(false)
    }

    return (
        <Fragment>
            <BtnContainer>
                <Header>
                    Proposals
                </Header>

                <NewProposalBtn onClick={() => setShow(true)}>
                    create proposal
                </NewProposalBtn>

            </BtnContainer>

            <AccountHistory/>

            <Modal show={show}>
                <CreateProposalModal closeModal={closeModal}/>
            </Modal>

        </Fragment>
    )
}

export default AllProposals
