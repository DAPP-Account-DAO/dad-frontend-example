import * as React from 'react'
import {
    LoaderComponent
} from './style'

interface Props {
    color: string
}

const Loader = (props: Props) => {

    const { color } = props

    return (
        <LoaderComponent color={color} />
    )
}

export default Loader