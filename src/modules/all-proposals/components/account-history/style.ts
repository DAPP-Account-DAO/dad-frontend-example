import styled from 'styled-components'


export const AccountHistoryContainer = styled.div`
  margin-top: 40px;
  border-radius: 5px;
  background:white;
  
`

export const HeadingText = styled.div`
  padding: 33px 26px;
  font-weight: 500;
  font-size: 18px;
`

export const TabContainer = styled.div`
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`

interface TabsProps {
    active: boolean
}

export const Tabs = styled.div<TabsProps>`
  padding: 28px 25px;
  font-size: 18px;
  height: 110px;
  font-weight:${props => (props.active ? `500` : `400`)};
  color: ${props => (props.active ? ` #394042` : `#394042;`)};
  opacity :${props => (props.active ? ` 1` : `0.8`)};
  box-sizing: border-box;
  width: 220px;
  cursor: pointer;
  transition: all 300ms;
  text-align:center;
  flex: 1;
  border-bottom: 2px solid ${props => (props.active ? `red` : `transparent`)};

  @media (max-width: 1100px) {
    padding: 28px 10px;
  }

  @media (max-width: 750px) {
    padding: 28px 25px;
    width: 100%;
    text-align: left;
    border-left: 2px solid ${props => (props.active ? `red` : `transparent`)};
    border-bottom: 0;
  }
`

interface ActiveLineProps {
    currentTab: number
}

export const ActiveLine = styled.div<ActiveLineProps>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 220px;
  height: 2px;
  background: red;
  transform: ${props =>
    props.currentTab === 1
        ? 'translateX(0px)'
        : props.currentTab === 2
        ? 'translateX(220px)'
        : props.currentTab === 3
        ? 'translateX(440px)' 
            : props.currentTab === 4 
                ? 'translateX(640px)'    
        : 'translateX(860px)'};
  transition: transform 300ms;

  @media (max-width: 750px) {
    width: 2px;
    height: 77px;
    top: 0;
    left: 0;
    transform: ${props =>
    props.currentTab === 1
        ? 'translateY(0px)'
        : props.currentTab === 2
        ? 'translateY(77px)'
        : 'translateY(154px)'};
  }
`
