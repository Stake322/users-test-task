import { Label } from 'semantic-ui-react'


const Error = ({ visible }) => (visible && < Label basic color='red' pointing content="Пожалуйста введите значение" />)



export default Error;