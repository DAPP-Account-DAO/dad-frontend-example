import * as React from 'react'
import {
    ModalContainer
} from './style'

interface Props {
    children: React.ReactNode
    show: boolean
}

const Modal = (props: Props) => {

    const { children, show } = props

    return (
        <ModalContainer
            show={show}
        >
            {children}
        </ModalContainer>
    )
}

export default Modal