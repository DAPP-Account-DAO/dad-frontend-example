import styled from 'styled-components'


export const Table = styled.table`
  min-width: 1250px;
  border-radius: 5px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; 
  thead {
      
    tr:first-child th:first-child {
      border-top-left-radius: 5px;
    }
    tr:first-child th:last-child {
      border-top-right-radius: 5px;
    }
    tr:nth-child(2){
    text-decoration:underline;
     cursor:pointer;
    }
   
    tr:last-child th:first-child {
      border-bottom-left-radius: 5px;
      width:200px;
    }
    tr:last-child th:last-child {
      border-bottom-right-radius: 5px;
    }
  }
  margin-bottom: 54px;
`

export const TableHead = styled.thead``

export const TableHeading = styled.th`
  padding: 35px 25px;
  background: white;
  color: #394042;
  font-weight: 700;
  font-size: 16px;
  box-sizing: border-box;
  text-align: left;
  text-transform:uppercase;
  margin-top:45px;
  text-align:center;
 
  th:first-child{
  width:200px;
  }
  
`
export const TableRow = styled.tr`
  cursor:pointer;

`







export const NoTableDate = styled.div`
  padding: 70px 0px 100px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NoDataText = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-top: 42px;
  text-align: center;
`

export const NoDataDesc = styled.div`
  margin-top: 16px;
  color: #333;
  font-weight: 300;
  font-size: 15px;
  text-align: center;
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const PayloadValue = styled.div`
  font-weight: bold;
  margin-left: 10px;
  width: 180px;
  word-wrap: break-word;
`

export const PayloadKey = styled.div`
  width: 100px;
`

export const PayloadItem = styled.div`
  display: flex;
  align-items: center;
`

export const TableCell = styled.td`
  padding: 36px 5px 23px 20px;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.01em;
  color: #333;
  text-align:center;
  width:100%;
  ${PayloadItem} {
    :not(:first-child) {
      margin-top: 10px;
    }
  }
`

export const TableContainer = styled.div`
  padding-bottom: 35px;
  width: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
