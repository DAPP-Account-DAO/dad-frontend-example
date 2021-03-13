import * as React from 'react'
import * as Yup from 'yup'
import { Loader } from '../../../../shared'
import { RoundStartBtn } from './style'
import {useDispatch} from 'react-redux'
import WalletProvider from "../../../../utils/wallet";
import {showNotification} from "../../../../logic/actions/actions";
import { generateError } from '../../../../utils/helpers'
import { ContractNames } from '../../../../utils/constants'

const {useState} = React


const RoundStartModel = ()=>{
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    
    const handleRoundStart = async()=>{
        try {
            setLoading(true)
            const wallet = WalletProvider.getWallet()
            console.log('walller-----', wallet, wallet?.auth?.accountName )
            if (!!wallet) {
                const response = await wallet.eosApi.transact({
                        actions: [
                            {
                                account: ContractNames.eosPrizePoolContract,
                                name: 'startround',
                                authorization: [
                                    {
                                        actor: wallet?.auth?.accountName,
                                        permission: wallet?.auth?.permission
                                    }
                                ],
                                data: {
                                    permission: wallet?.auth?.permission
                                }
                            }
                        ]
                    },
                    {
                        broadcast: true,
                        blocksBehind: 3,
                        expireSeconds: 60
                    })

                console.log('response------->', response)

                dispatch(showNotification({notificationText: 'Round start Successful', notificationType: 1}))
            }
        } catch (e) {
            console.log('something went wrong ', e)
            dispatch(showNotification({notificationText: generateError(e, "Failed to start round"), notificationType: 2}))
        } finally {
            setLoading(false)
        }
    }

    return (
        <RoundStartBtn onClick={handleRoundStart} disabled={loading}>
               {loading ? <Loader color={"#fff"} /> : "draw winner"} 
        </RoundStartBtn>
    )
}

export default RoundStartModel