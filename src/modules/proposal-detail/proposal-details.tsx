import * as React from 'react'
import { useEffect, useState } from 'react'
import {
    BoxContainer3,
    BoxContainer4,
    BoxDescription,
    BoxHeading,
    Horizontal,
    PropMarginBox,
    ProposalBreadCrumb,
    ProposalDesc,
    ProposalInlineBox,
    ProposalMainHeading,
    SpanRed,
    VoteButton,
    AuthorContainer,
    BtnContainer,
    TallyBtn
} from "./style";
import WalletProvider from "../../utils/wallet";
import { useDispatch } from "react-redux";
import { Loader, Modal } from "../../shared";
import { VoteOptionsModal } from "./component";
import { ProposerMetaTable, ProposerTable, ContractNames, eosjsEndPoint } from '../../utils/constants';
import { generateError } from '../../utils/helpers'
import { showNotification } from '../../logic/actions/actions'
//@ts-ignore
import EosApi from 'eosjs-api'
const { Fragment } = React

interface Props {
    match: any;
}

const options = {
    httpEndpoint: eosjsEndPoint
}

const eos = EosApi(options)

const ProposalDetails = (props: Props) => {

    const proposalId: number = props.match.params.proposalId
    const dispatch = useDispatch()

    const [tableData, setTableData] = useState({
        id: undefined,
        status: undefined,
        proposer: undefined,
        title: undefined,
        created_at: undefined,
        summary: undefined
    })

    const [metaData, setMetaData] = useState({
        vote_yes: undefined,
        vote_no: undefined,
        total_votes: undefined
    })

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeModal = () => {
        setShow(false)
    }

    const getTableRows = async () => {
        try {

            const tableRows = await eos.getTableRows({
                code: ProposerTable.code,
                table: ProposerTable.table,
                scope: ProposerTable.scope,
                json: 'true',
                limit:100
            })

            if (tableRows) {
                const finalRows = tableRows.rows
                const proposedDataRow = finalRows.filter((key: { id: number; }) => {
                    return key.id == proposalId
                })

                if (proposedDataRow.length > 0) {
                    setTableData(proposedDataRow[0])
                }
            }

        } catch (e) {
            console.log('something went wrong in getting proposal token', e)
        }
    }

    const getTableRowsMeta = async () => {
        try {

            const tableRowsMeta = await eos.getTableRows({
                code: ProposerMetaTable.code,
                table: ProposerMetaTable.table,
                scope: ProposerMetaTable.scope,
                json: 'true',
                limit:100
            })

            if (tableRowsMeta) {
                const finalRowsMeta = tableRowsMeta.rows

                const metaDataRow = finalRowsMeta.filter((key: { proposal_id: number; }) => {
                    return key.proposal_id == proposalId
                })

                if (metaDataRow.length > 0) {
                    console.log('meta Data', metaDataRow[0])
                    setMetaData(metaDataRow[0])
                }

            }

        } catch (e) {
            console.log('something went wrong in getting Proposal meta data', e)
        }
    }


    const handleVoteClick = async () => {
        setShow(true)
    }


    useEffect(() => {
        getTableRows()
        getTableRowsMeta()
    }, [])

    const handleUpdateTally = async () => {
        const { id } = tableData

        try {
            setLoading(true)

            const wallet = WalletProvider.getWallet()

            if (!!wallet) {
                await wallet.eosApi.transact({
                    actions: [
                        {
                            account: ContractNames.dadGovernanceContract,
                            name: 'updatetally',
                            authorization: [
                                {
                                    actor: wallet?.auth?.accountName,
                                    permission: wallet?.auth?.permission
                                }
                            ],
                            data: {
                                proposal_id: id
                            }
                        }
                    ]
                },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    }
                )

                dispatch(showNotification({ notificationText: 'Tally Updated', notificationType: 1 }))
            }

        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({ notificationText: generateError(e,'Something went wrong'), notificationType: 2 }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <ProposalBreadCrumb>
                All Propsals / <SpanRed> {tableData.id} </SpanRed>
            </ProposalBreadCrumb>

            <PropMarginBox>
                <ProposalMainHeading>
                    {tableData.id} : {tableData.title}
                </ProposalMainHeading>

                <ProposalDesc>
                    {tableData.summary}
                </ProposalDesc>

                <ProposalInlineBox>
                    <BoxContainer3>
                        <BoxHeading>
                            Created
                        </BoxHeading>
                        <BoxDescription>
                            {tableData.created_at}
                        </BoxDescription>
                    </BoxContainer3>
                    <BoxContainer3>
                        <BoxHeading>
                            Status
                        </BoxHeading>
                        <BoxDescription>
                            {tableData.status}
                        </BoxDescription>
                    </BoxContainer3>
                    <BoxContainer3>
                        {/*<BoxHeading>
                            Discussions-To
                        </BoxHeading>
                        <BoxDescription>

                        </BoxDescription>*/}
                    </BoxContainer3>
                </ProposalInlineBox>
                <Horizontal />
                <AuthorContainer>
                    <div>
                        <BoxHeading>
                            Author : {tableData.proposer}
                            {/*<AnchorText>
                                Joe Mahon, franklin501, Michael Anderson, Vance Spencer
                            </AnchorText>*/}
                        </BoxHeading>
                    </div>
                    <BtnContainer>
                        <TallyBtn onClick={() => handleUpdateTally()} disabled={loading}>
                            {loading ? <Loader color={"#ffffff"} /> : "Update Tally"}
                        </TallyBtn>
                        <VoteButton onClick={() => handleVoteClick()}>
                            Vote
                        </VoteButton>
                    </BtnContainer>

                </AuthorContainer>
            </PropMarginBox>


            {/*<PropMarginBox>
                <ProposalMainHeading>
                    Abstract
                </ProposalMainHeading>
                <ProposalDesc>
                    Add Synthetix (SNX) as the second volatile asset to be used as collateral in delegated yVaults.
                </ProposalDesc>

                <ProposalMainHeading>
                    Motivation
                </ProposalMainHeading>
                <ProposalDesc>
                    Additional assets are necessary in order to generate more revenue for the protocol and grow the
                    ecosystem. This proposal nominates SNX as the second volatile asset to be used as collateral. While
                    other tokens have polled higher, the strategy for SNX has already been developed and will be quicker
                    to
                    launch.
                </ProposalDesc>
                <ProposalDesc2>
                    <BoldText>
                        FOR :
                    </BoldText>
                    Add SNX as the second volatile asset to be used in delegated yVaults.
                </ProposalDesc2>
                <ProposalDesc2>
                    <BoldText>
                        AGAINST:
                    </BoldText>
                    Don’t add SNX.
                </ProposalDesc2>
            </PropMarginBox>

            <PropMarginBox>
                <ProposalMainHeading>
                    Overview
                </ProposalMainHeading>
                <ProposalDesc>
                    Adding SNX as a collateral option to delegated yVaults will enable SNX holders to deposit tokens to
                    the
                    vault, which will increase the total value locked (TVL) and generate more fees for the protocol.
                </ProposalDesc>
                <ProposalMainHeading>
                    Rationale
                </ProposalMainHeading>
                <ProposalDesc>
                    Synthetix stakers currently incur regularly high gas costs when claiming minted SNX rewards on a
                    weekly
                    basis. With the addition of SNX to yVaults, smaller SNX holders will be able to either allow their
                    rewards to compound or claim them on a regular basis at very low gas costs. This inclusive model
                    will
                    likely draw small and large SNX holders alike, further increasing AUM and driving fee generation for
                    YFI
                    holders. While other tokens have polled higher, the strategy for SNX has already been developed and
                    will
                    be quicker to launch as a vault.
                </ProposalDesc>
            </PropMarginBox>*/}

            <PropMarginBox>
                <ProposalMainHeading>
                    Metadata
                </ProposalMainHeading>

                <ProposalInlineBox>

                    <BoxContainer4>
                        <BoxHeading>
                            Total Votes
                        </BoxHeading>
                        <BoxDescription>
                            {metaData.total_votes}
                        </BoxDescription>
                    </BoxContainer4>

                    <BoxContainer4>
                        <BoxHeading>
                            Total for votes
                        </BoxHeading>
                        <BoxDescription>
                            {metaData.vote_yes}
                        </BoxDescription>
                    </BoxContainer4>
                    <BoxContainer4>
                        <BoxHeading>
                            Total against votes
                        </BoxHeading>
                        <BoxDescription>
                            {metaData.vote_no}
                        </BoxDescription>
                    </BoxContainer4>


                    <BoxContainer4>
                        <BoxHeading>
                            Proposed By
                        </BoxHeading>
                        <BoxDescription>
                            {tableData.proposer}
                        </BoxDescription>
                    </BoxContainer4>

                </ProposalInlineBox>


            </PropMarginBox>


            <Modal show={show}>
                <VoteOptionsModal closeModal={closeModal} proposalId={proposalId} />
            </Modal>

        </Fragment>
    )
}

export default ProposalDetails
