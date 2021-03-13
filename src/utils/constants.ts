export const Paths = {
    home: '/',
    allProposals: '/all-proposals',
    proposalDetails: '/proposal-detail',
    // governance: '/governance',
    stats: '/stats',
    prizepool: '/prizepool',
    rafflepool: '/rafflepool'
}

export const ContractNames = {
    dadGovernanceContract: 'dadgovernanc',
    dadTokenContract: 'dadtoken1111',
    didIssueContract: 'dadtokenissu',
    eosDepositContract: 'depositeos11',
    eosPrizeDepositContract: 'depositeos22',
    dappDepositContract: 'depositdapp1',
    eosPoolContract: 'depositpool1',
    eosPrizePoolContract: 'depositpool5',
    dappPoolContract: 'depositpool2',
    boxvpPoolContract: 'depositpool3',
    deosTokenContract: 'deostoken111',
    ddappTokenContract: 'ddapptoken11',
    eosioTokenContract: 'eosio.token',
    dappServicesContract: 'dappservices',
    donationContract: 'hellodaddy11',
    boxvpContract: 'lptoken.defi',
    boxvpStakeContract: 'depositdadlp',
    boxwqStakeContract: 'depositpool4',
    boxvpTokenContract: 'lptoken.defi',
    dboxvpTokenContract: 'dtokenissuer',
    dppeosTokenContract: 'dtokenissuer',
    boxvpDepositContract: 'depositboxvp',
    boxwqPoolContract: 'depositpool4',
    dboxwqTokenContract: 'dtokenissuer',
    boxwqTokenContract: 'lptoken.defi',
    boxwqDepositContract: 'depositboxwq',
    rafflePoolContract: 'rafsubscribe',
    raffleDepositContract: 'rafdeposit11'
}

export const ContractTable = {
    stakeTable: 'stake2',
    balanceTable: 'accounts',
    rateTable: 'pricestat',
    dadBalanceTable: 'claimtab2',
    roundTable: 'rounddet1',
    dadStats: 'stat',
    eosPool: 'tokenstat1',
    dappPool: 'tokenstat1',
    dboxvpPool: 'tokenstat1',
    tokenDist: 'tokdistr2',
    boxvpStake: 'totalstake',
    boxwqStake: 'tokenstat1',
    weightTable: 'tottokdistr',
    eosPrizeTable: 'prizemoney',
    prizeWinnerTable: 'winnerlist',
    prizeRoundTable: 'rounddet',
    totalTiketsTable: 'totaltickets',
    userTicketsTable: 'usertickets',
    raffleTotalStake: 'totalstake',
    raffleUserCount: 'userpool',
    raffleRoundTab: 'poolround',
    raffleUserDeposit: 'userdeposit',
}

export const StorageKey = {
    walletType: 'walletType'
}

export const ProposerTable = {
    code: 'dadgovernanc',
    table: 'proposal2',
    scope: 'dadgovernanc',
    limit: 100
}

export const ProposerMetaTable = {
    code: 'dadgovernanc',
    table: 'votes2',
    scope: 'dadgovernanc'
}

export const VoteTable = {
    account: 'dadgovernanc',
    name: 'vote'
}

export const CreateProposalTable = {
    account: 'dadgovernanc',
    name: 'proposal',
}
export const GetVoteStatus = {
    code: 'dadgovernanc',
    table: 'voters2',
}

export const EndPointSettings = {
    protocol: 'https',
    endpoint: 'node2.blockstartdsp.com', //'kylin-dsp-1.liquidapps.io'
    port: 443,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' // '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191' 
}

// export const eosjsApiEndpoint = `${EndPointSettings.protocol}://${EndPointSettings.endpoint}`//:${EndPointSettings.port}

export const eosjsEndPoint = 'https://api.main.alohaeos.com:443'

export const DspEndpoints = {
    eosusadsp: {
        protocol: 'https',
        endpoint: 'node1.eosdsp.com',
        port: 443,
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    },
    blockstartdsp: {
        protocol: 'https',
        endpoint: 'node2.blockstartdsp.com',
        port: 443,
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    },
    dappsolutions: {
        protocol: 'https',
        endpoint: 'dsp1tlv.dappsolutions.app',
        port: 443,
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    }
}
