import * as React from 'react'
import { AccountHistoryContainer, TabContainer, Tabs } from './style'
import {
    AcceptedTable,
    ApprovedTable,
    ImplementedTable,
    ProposedTable,
    RejectedTable,
    ImplementedProposalTable
} from '../../components'
import { ProposerTable, eosjsEndPoint } from '../../../../utils/constants';
//@ts-ignore
import EosApi from 'eosjs-api'

const options = {
    httpEndpoint: eosjsEndPoint
}

const eos = EosApi(options)

const { useState, useEffect } = React


function AccountHistory() {

    const [activeTab, setActiveTab] = useState(1)
    const [loading] = useState(true)
    const [acceptedData, setAcceptedData] = useState([])
    const [proposedData, setProposedData] = useState([])
    const [approvedData, setApprovedData] = useState([])
    const [rejectedData, setRejectedData] = useState([])
    const [implementedQueue, setImplementedQueue] = useState([])
    const [implemented, setImplemented] = useState([])

    const getTableRows = async () => {

        try {

            const tableRows = await eos.getTableRows({
                code: ProposerTable.code,
                table: ProposerTable.table,
                scope: ProposerTable.scope,
                json: 'true',
                limit: 100
            })

            console.log('table rows called', tableRows)
            if (tableRows) {

                const finalRows = tableRows.rows

                const createdDataRow = finalRows.filter((key: { status: string; }) => {
                    return key.status === 'Created'
                })

                const acceptedDataRow = finalRows.filter((key: { status: string; }) => {
                    return key.status === 'Accepted'
                })

                const approvedDataRow = finalRows.filter((key: { status: string; }) => {
                    return key.status === 'Approved'
                })

                const rejectedDataRow = finalRows.filter((key: { status: string; }) => {
                    return key.status === 'Rejected' || key.status === 'Expired'
                })

                const implementedDataQueue = finalRows.filter((key: { status: string; }) => {
                    return key.status === 'Implemention-Queue'
                })

                const implementedDataRow = finalRows.filter((key: { status: string; }) => {
                    return key.status === 'Implemented'
                })

                console.log('accepted Data', acceptedDataRow)
                console.log('approved Data', approvedDataRow)
                console.log('rejected Data', rejectedDataRow)
                console.log('implemented Data', implementedDataQueue)

                setAcceptedData(acceptedDataRow)
                // @ts-ignore
                setProposedData(createdDataRow)
                // @ts-ignore
                setApprovedData(approvedDataRow)
                // @ts-ignore
                setRejectedData(rejectedDataRow)
                setImplementedQueue(implementedDataQueue)
                setImplemented(implementedDataRow)

            }

        } catch (e) {
            console.log('something went wrong in getting dad token', e)
        }
    }


    const renderTable = () => {
        if (activeTab === 1) {
            return <AcceptedTable data={acceptedData} loading={loading} />
        }
        if (activeTab === 2) {
            return <ProposedTable data={proposedData} loading={loading} />
        }
        if (activeTab === 3) {
            return <ApprovedTable data={approvedData} loading={loading} />
        }
        if (activeTab === 4) {
            return <RejectedTable data={rejectedData} loading={loading} />
        }
        if (activeTab === 5) {
            return <ImplementedTable data={implementedQueue} loading={loading} />
        }
        if (activeTab === 6) {
            return <ImplementedProposalTable data={implemented} loading={loading} />
        }
    }

    useEffect(() => {
        getTableRows()
    }, [])

    return (
        <AccountHistoryContainer>
            <TabContainer>
                <Tabs onClick={() => setActiveTab(1)} active={activeTab === 1}>
                    Accepted
                </Tabs>
                <Tabs onClick={() => setActiveTab(2)} active={activeTab === 2}>
                    Created
                </Tabs>
                <Tabs onClick={() => setActiveTab(3)} active={activeTab === 3}>
                    Approved
                </Tabs>
                <Tabs onClick={() => setActiveTab(4)} active={activeTab === 4}>
                    Rejected/Expired
                </Tabs>
                <Tabs onClick={() => setActiveTab(5)} active={activeTab === 5}>
                    Implementation Queue
                </Tabs>
                <Tabs onClick={() => setActiveTab(6)} active={activeTab === 6}>
                    Implemented
                </Tabs>
            </TabContainer>
            {renderTable()}
        </AccountHistoryContainer>
    )
}

export default AccountHistory
