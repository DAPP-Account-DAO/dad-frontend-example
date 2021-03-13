import styled from 'styled-components'

interface Props {
    show: boolean
}

export const ModalContainer = styled.div<Props>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: ${props => props.show ? "3": "-3"};
    opacity: ${props => props.show ? "1": "0"};
`