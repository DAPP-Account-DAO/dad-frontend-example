import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(359deg) }
`

interface Props {
    color: string
}

export const LoaderComponent = styled.div<Props>`
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.color};
    border-radius: 50%;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: ${rotate} linear infinite 1s;
`