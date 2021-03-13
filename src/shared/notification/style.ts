import styled, { keyframes } from 'styled-components'

const movein = keyframes`
    0% { transform: translateX(500px)}
    100% { transform: translateX(0px)}
`

const moveup = keyframes`
    0% { transform: translateY(0px)}
    100% { transform: translateY(-300px)}
`

interface Props {
    notificationType: number
}

const setBackground = (type: number) => {
    switch (type) {
        case 0:
            return 'transparent'
        case 1:
            return '#68EB95'
        case 2:
            return '#EB6868'
        default:
            return 'transparent'
    }
}


export const NotificationContainer = styled.div<Props>`
    padding: 10px 20px;
    background: ${props => setBackground(props.notificationType)};
    color: white;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 30;
    animation: ${movein} 500ms linear , ${moveup} 1s linear 2s forwards; 
`