import * as React from 'react'
import {
    ButtonBlock,
    CloseBtnContainer,
    Container,
    FormInput,
    ModalHeader,
    NewProposalBtn,
    NoteText,
    WalletContainer
} from './style'
import {CloseBtnIcon} from '../../../../images'
import {Loader} from '../../../../shared'
import {useDispatch} from 'react-redux'
import WalletProvider from "../../../../utils/wallet";
import {showNotification} from "../../../../logic/actions/actions";
import {ErrorMessage, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {FormError} from "../../../deposit/components/exchange-form/style";
import {CreateProposalTable} from "../../../../utils/constants";
import { generateError } from '../../../../utils/helpers'

const {useState} = React

interface Props {
    closeModal: () => void
}

const createProposalInitialSchema = {
    title: '',
    summary: ''
}

const createProposalValidationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter title'),
    summary: Yup.string().required('Please enter Summary')
})

const CreateProposalModal = (props: Props) => {

    const {closeModal} = props
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const handleCreateProposal = async (values: any) => {

        try {
            setLoading(true)
            const wallet = WalletProvider.getWallet()
            const {title, summary} = values

            if (!!wallet) {
                const response = await wallet.eosApi.transact({
                        actions: [
                            {
                                account: CreateProposalTable.account,
                                name: CreateProposalTable.name,
                                authorization: [
                                    {
                                        actor: wallet?.auth?.accountName,
                                        permission: wallet?.auth?.permission
                                    }
                                ],
                                data: {
                                    proposer: wallet?.auth?.accountName,
                                    title: title,
                                    summary: summary,
                                    ipfsurl: ' '
                                }
                            }
                        ]
                    },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    })

                console.log('response ', response)

                dispatch(showNotification({notificationText: 'Create Proposal Successful', notificationType: 1}))
            }
        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({notificationText: generateError(e, "Failed to create proposal"), notificationType: 2}))
        } finally {
            setLoading(false)
        }

    }

    return (
        <Container>
            <ModalHeader>
                Create Proposal
                <CloseBtnContainer onClick={closeModal}>
                    <img src={CloseBtnIcon} alt="CloseBtnIcon"/>
                </CloseBtnContainer>
            </ModalHeader>

            <WalletContainer>

                <Formik initialValues={createProposalInitialSchema}
                        validationSchema={createProposalValidationSchema}
                        onSubmit={handleCreateProposal}
                >
                    <Form>
                        <FormInput placeholder="Title" name="title"/>
                        <FormError>
                            <ErrorMessage name="title"/>
                        </FormError>

                        <FormInput placeholder="Summary" name="summary" component="textarea" rows={5}/>
                        <FormError>
                            <ErrorMessage name="summary"/>
                        </FormError>

                        <ButtonBlock>
                            <NewProposalBtn type="submit" disabled={loading}>
                                {loading ? <Loader color={"#E63956"}/> : "Create Proposal"}
                            </NewProposalBtn>
                        </ButtonBlock>

                        <NoteText>
                            Note: Contract charges a withdrawal fee of 20.000000 DAD tokens, Fees will be returned to
                            the user once the proposal receives 2% votes out of total supply.
                        </NoteText>

                    </Form>


                </Formik>


            </WalletContainer>

        </Container>
    )
}

export default CreateProposalModal
