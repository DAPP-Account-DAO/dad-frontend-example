import * as React from 'react'
import {
    Container,
    Header,
    ValueContainer,
    ValueItem,
    ValueItemHeader,
    ValueItemText,
    DadContainer,
    DadItem,
    LoaderContainer,
    PoolContainer,
    PoolItem
} from './style'
import { ContractNames, ContractTable, eosjsEndPoint } from '../../utils/constants';
//@ts-ignore
import EosApi from 'eosjs-api'
import { Loader } from '../../shared'
import axios from 'axios'

const {
    Fragment,
    useState,
    useEffect
} = React

const options = {
    httpEndpoint: eosjsEndPoint
}

const eos = EosApi(options)

const Stats = () => {

    const [totalEos, setTotalEos] = useState('0.0000 EOS')
    const [totalDapp, setTotalDapp] = useState('0.0000 DAPP')
    const [totalDad, setTotalDad] = useState('0.000000 DAD')
    const [roundNumber, setRoundNumber] = useState(0)
    const [releasedDad, setReleasedDad] = useState('0.000000 DAD')
    const [totalBoxvp, setTotalBoxvp] = useState('0 BOXVP')
    const [totalBoxwq, setTotalBoxwq] = useState('0 BOXWQ')
    const [totalPrizeEos, setTotalPrizeEos] = useState('0.0000 EOS')
    const [loading, setLoading] = useState(true)
    const [dadRatio, setDadRatio] = useState(0)
    const [deosRatio, setDeosRatio] = useState(0)
    const [dappRatio, setDappRatio] = useState(0)
    const [boxvpRatio, setBoxvpRatio] = useState(0)
    const [boxwqRatio, setBoxwqRatio] = useState(0)
    const [ratioSum, setRatioSum] = useState(0)

    console.log('ratioSum ', ratioSum)

    useEffect(() => {
        const getStats = async () => {

            try {
                setLoading(true)
                const requests = [
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.roundTable
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: 'DAD',
                        table: ContractTable.dadStats
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.eosPoolContract,
                        scope: ContractNames.eosPoolContract,
                        table: ContractTable.eosPool
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dappPoolContract,
                        scope: ContractNames.dappPoolContract,
                        table: ContractTable.dappPool
                    }),
                    eos.getTableRows({
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.tokenDist,
                        json: 'true'
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.boxvpPoolContract,
                        scope: ContractNames.boxvpPoolContract,
                        table: ContractTable.dboxvpPool
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.dadTokenContract,
                        scope: ContractNames.dadTokenContract,
                        table: ContractTable.weightTable
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.boxwqStakeContract,
                        scope: ContractNames.boxwqStakeContract,
                        table: ContractTable.boxwqStake
                    }),
                    eos.getTableRows({
                        json: 'true',
                        code: ContractNames.eosPrizePoolContract,
                        scope: ContractNames.eosPrizePoolContract,
                        table: ContractTable.eosPool
                    }),
                ]

                const responses = await axios.all(requests)
                const roundTable = responses[0]
                const dadSupply = responses[1]
                const eosSupply = responses[2]
                const dappSupply = responses[3]
                const ratioTable = responses[4]
                const boxvpTable = responses[5]
                const weightTable = responses[6]
                const boxwqTable = responses[7]
                const eosPrizeTable = responses[8]

                if(weightTable.rows.length) {
                    setRatioSum(parseFloat(weightTable.rows[0].totweight))
                }

                if (roundTable.rows.length) {
                    setRoundNumber(roundTable.rows[0].currround)
                    setReleasedDad(roundTable.rows[0].currround_amount)
                }

                if (dadSupply.rows.length) {
                    setTotalDad(dadSupply.rows[0].supply)
                }

                if (eosSupply.rows.length) {
                    setTotalEos(eosSupply.rows[0].totalamountin)
                }

                if (dappSupply.rows.length) {
                    setTotalDapp(dappSupply.rows[0].totalamountin)
                }

                if (eosPrizeTable.rows.length) {
                    setTotalPrizeEos(eosPrizeTable.rows[0].totalamountin)
                }

                console.log('ratioTable ', ratioTable)

                if (ratioTable.rows.length) {

                    const dadTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '6,SDAD')
                    const dEosTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '4,DEOS')
                    const dappTokenRatio = ratioTable.rows.filter((v: any) => v.dtoken === '4,DDAPP')
                    const boxvpRatioRow = ratioTable.rows.filter((v: any) => v.dtoken === '0,DBOXVP')
                    const boxwqRatioRow = ratioTable.rows.filter((v: any) => v.dtoken === '0,DBOXWQ')

                    if (dadTokenRatio.length) {
                        setDadRatio(parseFloat(dadTokenRatio[0].weight))
                    }

                    if (dEosTokenRatio.length) {
                        setDeosRatio(parseFloat(dEosTokenRatio[0].weight))
                    }

                    if (dappTokenRatio.length) {
                        setDappRatio(parseFloat(dappTokenRatio[0].weight))

                    }

                    if(boxvpRatioRow.length) {
                        setBoxvpRatio(parseFloat(boxvpRatioRow[0].weight))
                    }

                    if(boxwqRatioRow.length) {
                        setBoxwqRatio(parseFloat(boxwqRatioRow[0].weight))
                    }
                }

                if (boxvpTable.rows.length) {
                    setTotalBoxvp(boxvpTable.rows[0].totalamountin)
                }

                if (boxwqTable.rows.length) {
                    setTotalBoxwq(boxwqTable.rows[0].totalamountin)
                }
            } catch (e) {
                console.log('something went wrong in getting stats ', e)
            } finally {
                setLoading(false)
            }
        }

        getStats()
    }, [])

    const numberWithCommas = (number: string, minFraction: number, maxFraction: number): string => {
        return parseFloat(number).toLocaleString('en', { style: 'decimal', minimumFractionDigits: minFraction, maximumFractionDigits: maxFraction })
    }

    if (loading) {
        return (
            <LoaderContainer>
                <Loader
                    color={'#E63956'}
                />
            </LoaderContainer>
        )
    }

    return (
        <Fragment>
            <Container>
                <Header>
                    Stats
            </Header>
                <ValueContainer>
                    <ValueItem>
                        <ValueItemHeader>
                            EOS pooled
                        </ValueItemHeader>
                        <ValueItemText>
                            {numberWithCommas(totalEos, 4, 4)}
                        </ValueItemText>
                    </ValueItem>
                    <ValueItem>
                        <ValueItemHeader>
                            DAPP pooled
                        </ValueItemHeader>
                        <ValueItemText>
                            {numberWithCommas(totalDapp, 4, 4)}
                        </ValueItemText>
                    </ValueItem>
                    {/*<ValueItem>
                        <ValueItemHeader>
                            Total DAD released
                        </ValueItemHeader>
                        <ValueItemText>
                            {numberWithCommas(totalDad, 6, 6)}
                        </ValueItemText>
                    </ValueItem>*/}
                    <ValueItem>
                        <ValueItemHeader>
                            BOXVP Pooled
                        </ValueItemHeader>
                        <ValueItemText>
                            {numberWithCommas(totalBoxvp, 0, 0)}
                        </ValueItemText>
                    </ValueItem>
                    <ValueItem>
                        <ValueItemHeader>
                            BOXWQ Pooled
                        </ValueItemHeader>
                        <ValueItemText>
                            {numberWithCommas(totalBoxwq, 0, 0)}
                        </ValueItemText>
                    </ValueItem>
                    <ValueItem>
                        <ValueItemHeader>
                            EOS in DAD Prize Pool
                        </ValueItemHeader>
                        <ValueItemText>
                            {numberWithCommas(totalPrizeEos, 4, 4)}
                        </ValueItemText>
                    </ValueItem>
                </ValueContainer>
            </Container>

            <DadContainer>
                <DadItem>
                    <ValueItemHeader>
                        Round Number
                    </ValueItemHeader>
                    <ValueItemText>
                        {roundNumber}
                    </ValueItemText>
                </DadItem>
                <DadItem>
                    <ValueItemHeader>
                       Total DAD released
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(totalDad, 6, 6)}
                    </ValueItemText>
                </DadItem>
                <DadItem>
                    <ValueItemHeader>
                        DAD releasing this hour
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(releasedDad, 6, 6)}
                    </ValueItemText>
                </DadItem>
            </DadContainer>

            <PoolContainer>
                <PoolItem>
                    <ValueItemHeader>
                        EOS Pool
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(`${(parseFloat(releasedDad.split(' ')[0]) * deosRatio / ratioSum).toFixed(4)}`, 6, 6)}
                    </ValueItemText>
                </PoolItem>
                <PoolItem>
                    <ValueItemHeader>
                        DAPP Pool
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(`${(parseFloat(releasedDad.split(' ')[0]) * dappRatio / ratioSum).toFixed(4)}`, 6, 6)}
                    </ValueItemText>
                </PoolItem>
                <PoolItem>
                    <ValueItemHeader>
                        DAD Pool
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(`${(parseFloat(releasedDad.split(' ')[0]) * dadRatio / ratioSum).toFixed(6)}`, 6, 6)}
                    </ValueItemText>
                </PoolItem>
                <PoolItem>
                    <ValueItemHeader>
                        DAD/EOS Pool
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(`${(parseFloat(releasedDad.split(' ')[0]) * boxvpRatio / ratioSum).toFixed(6)}`, 6, 6)}
                    </ValueItemText>
                </PoolItem>

                <PoolItem>
                    <ValueItemHeader>
                        DAD/DAPP Pool
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(`${(parseFloat(releasedDad.split(' ')[0]) * boxwqRatio / ratioSum).toFixed(6)}`, 6, 6)}
                    </ValueItemText>
                </PoolItem>
                <PoolItem>
                    <ValueItemHeader>
                        DAD Prize Pool
                    </ValueItemHeader>
                    <ValueItemText>
                        {numberWithCommas(`${(parseFloat(releasedDad.split(' ')[0]) * deosRatio / ratioSum).toFixed(4)}`, 6, 6)}
                    </ValueItemText>
                </PoolItem>
            </PoolContainer>
        </Fragment>
    )
}

export default Stats
