import * as React from 'react'
import {Table, TableCell, TableContainer, TableHead, TableHeading, TableRow,} from './style'
import {Pagination} from '../../components'
import {useHistory} from "react-router-dom";

const {useState} = React


const RejectedTable = (props: any) => {

    const rejectedData = props.data
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const currentCredit = 1
    const data = rejectedData.slice(firstIndex, lastIndex)
    const totalPage = Math.ceil(rejectedData.length / itemsPerPage)

    const history = useHistory()

    const switchPage = (page: number) => {
        setCurrentPage(page)
    }


    const renderTableContent = () => {
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <tr>
                            <TableHeading>Number</TableHeading>
                            <TableHeading>Title</TableHeading>
                            <TableHeading>Author</TableHeading>
                        </tr>
                    </TableHead>
                    <tbody>
                    {data.length > 0 && data.map((key: any, index: any) => (
                        <TableRow key={index} onClick={() => history.push(`/proposal-detail/${key.id}`)}>
                            <TableCell>{key.id}</TableCell>
                            <TableCell>{key.title}</TableCell>
                            <TableCell>{key.proposer}</TableCell>
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

export default RejectedTable
