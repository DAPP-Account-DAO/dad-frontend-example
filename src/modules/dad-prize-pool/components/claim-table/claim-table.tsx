import * as React from 'react'
import {Table, TableCell, TableContainer, TableHead, TableHeading, TableRow,} from './style'
import { Pagination } from '../../../all-proposals/components';

const {useState} = React


const ClaimTable = (props: any) => {

    const claimedData = props.data
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const currentCredit = 1
    const data = claimedData.slice(firstIndex, lastIndex)
    const totalPage = Math.ceil(claimedData.length / itemsPerPage)

    console.log('accepted dAta---', claimedData,totalPage)

    // const history = useHistory()

    const switchPage = (page: number) => {
        setCurrentPage(page)
    }


    const renderTableContent = () => {
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <tr>
                            <TableHeading>ROUND</TableHeading>
                            <TableHeading>WINNER</TableHeading>
                            <TableHeading>AMOUNT</TableHeading>
                        </tr>
                    </TableHead>
                    <tbody>
                    {data.length > 0 && data.map((key: any, index: any) => (
                        <TableRow key={index}>
                            <TableCell>{key.round}</TableCell>
                            <TableCell>{key.winner}</TableCell>
                            <TableCell>{key.amount}</TableCell>
                        </TableRow>
                    ))}
                    </tbody>
                </Table>

                <Pagination totalPages={totalPage} switchPage={switchPage} currentPage={currentPage}/>

            </TableContainer>
        )
    }

    return <div>{renderTableContent()}</div>
}

export default ClaimTable
