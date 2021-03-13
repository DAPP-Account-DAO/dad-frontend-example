import styled from 'styled-components'

export const Container = styled.div`
    padding: 25px 33px;
    background: white;
    margin-top: -15px;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.06) 0px 0px 20px;

    @media (max-width: 500px) {
        padding: 25px 10px;
    }
`

export const Header = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #394042;
`

export const ValueItem = styled.div`
    flex: 1;

`

export const ValueContainer = styled.div`
    padding-top: 34px;
    display: flex;

    @media (max-width: 800px) {
        flex-direction: column;

        ${ValueItem}:not(:first-child){
            margin-top: 34px;
        }
    }
`

export const ValueItemHeader = styled.div`
    font-size: 16px;
    line-height: 22px;
    color: #394042;
    opacity: 0.8;
    text-transform: capitalize;
`

export const ValueItemText = styled.div`
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #394042;
    margin-top: 6px;
`

export const DadItem = styled.div`
    padding: 31px 33px 34px 33px;
    background: white;
    flex: 1;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.06) 0px 0px 20px;

    @media (max-width: 500px) {
        padding: 30px 10px;
    }
`

export const DadContainer = styled.div`
    display: flex;
    margin-top: 20px;

    ${DadItem}:first-child {
        margin-right: 10px;
    }

    ${DadItem}:last-child {
        margin-left: 10px;
    }

    @media (max-width: 800px) {
        flex-direction: column;

        ${DadItem}:first-child {
            margin-right: 0;
        }
    
        ${DadItem}:last-child {
            margin-left: 0;
            margin-top: 20px;
        }
    }
`

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PoolItem = styled.div`
    flex: 1;
    background: white;
    border-radius: 5px;
    padding: 31px 33px 34px 33px;
    box-shadow: rgba(0,0,0,0.06) 0px 0px 20px;
    margin: 0 10px;

    @media (max-width: 500px) {
        padding: 30px 10px;
    }
`

export const PoolContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    ${PoolItem}:first-child {
        margin-left: 0;
    }

    ${PoolItem}:last-child {
        margin-right: 0;
    }

    @media (max-width: 800px) {
        flex-direction: column;

        ${PoolItem}:not(:first-child) {
            margin: 20px 0 0 0;
        }

        ${PoolItem}:first-child {
            margin: 0;
        }
    }
    
`