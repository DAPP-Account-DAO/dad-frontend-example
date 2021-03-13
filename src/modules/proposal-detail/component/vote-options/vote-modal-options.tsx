import * as React from 'react'
import { useEffect } from 'react'
import {
    CloseBtnContainer,
    Container,
    ModalHeader,
    OptionsBlock,
    OptionsImage,
    OptionText,
    WalletContainer
} from './styles'
import { CloseBtnIcon, NotSureVoteIcon, ThumbsDown, ThumbsUp } from '../../../../images'
import { useDispatch } from 'react-redux'
import WalletProvider from "../../../../utils/wallet";
import { showNotification } from "../../../../logic/actions/actions";
import { Loader } from "../../../../shared";
import { GetVoteStatus, VoteTable } from "../../../../utils/constants";
import { generateError } from '../../../../utils/helpers'

const { useState } = React

interface Props {
    closeModal: () => void
    proposalId: number
}


const VoteOptionsModal = (props: Props) => {

    const { closeModal } = props
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [voteLoading, setVoteLoading] = useState(false)
    const [voteIndex, setVoteIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(3) // 0 ,1 ,2 is in use


    const handleVoteClick = async (voteSide: number) => {

        try {
            setVoteIndex(voteSide)
            setVoteLoading(true)
            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                const response = await wallet.eosApi.transact({
                    actions: [
                        {
                            account: VoteTable.account,
                            name: VoteTable.name,
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                voter: wallet?.auth?.accountName,
                                proposal_id: props.proposalId,
                                vote_side: voteSide
                            }
                        }
                    ]
                },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    })

                dispatch(showNotification({ notificationText: 'Vote Successful', notificationType: 1 }))
                getVoteCondition() // calling change of get vote conditions
            }
        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e, 'Voting Failed'), notificationType: 2 }))
        } finally {
            setVoteLoading(false)
        }

    }

    const getVoteCondition = async () => {
        try {

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {

                const voteRows = await wallet.eosApi.rpc.get_table_rows({
                    code: GetVoteStatus.code,
                    table: GetVoteStatus.table,
                    scope: props.proposalId,
                })

                if (voteRows) {
                    const finalVoteRows = voteRows.rows
                    console.log('voter name', wallet?.auth?.accountName)
                    console.log('total vote rows', finalVoteRows)
                    const voteFilterRow = finalVoteRows.filter((key: { voter: string; }) => {
                        return key.voter == wallet?.auth?.accountName
                    })
                    console.log('user vote', voteFilterRow)

                    if (voteFilterRow.length > 0) {
                        setActiveIndex(voteFilterRow[0].vote_side)
                    }

                }
            }

        } catch (e) {
            console.log('vote rows not found', e)
        }
    }

    useEffect(() => {
        getVoteCondition()
    }, [])


    return (
        <Container>
            <ModalHeader>
                Please select Vote
                <CloseBtnContainer onClick={closeModal}>
                    <img src={CloseBtnIcon} alt="CloseBtnIcon" />
                </CloseBtnContainer>
            </ModalHeader>

            <WalletContainer>

                <OptionsBlock onClick={() => handleVoteClick(1)} active={activeIndex === 1}>
                    <OptionsImage src={ThumbsUp} alt="Yes" />
                    <OptionText>
                        Yes {voteLoading && voteIndex === 1 && <Loader color={"#E63956"} />}
                    </OptionText>
                </OptionsBlock>
                <OptionsBlock onClick={() => handleVoteClick(0)} active={activeIndex === 0}>
                    <OptionsImage src={ThumbsDown} alt="Yes" />
                    <OptionText>No
                        {voteLoading && voteIndex === 0 && <Loader color={"#E63956"} />}
                    </OptionText>
                </OptionsBlock>
                <OptionsBlock onClick={() => handleVoteClick(2)} active={activeIndex === 2}>
                    <OptionsImage src={NotSureVoteIcon} alt="Yes" />
                    <OptionText>Not Sure
                        {voteLoading && voteIndex === 2 && <Loader color={"#E63956"} />}
                    </OptionText>
                </OptionsBlock>


            </WalletContainer>

        </Container>
    )
}

export default VoteOptionsModal