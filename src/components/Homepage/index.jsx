import { useHistory } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import './style.css'

export const Homepage = () => {
	const history = useHistory()

	const handleClick = (path) => {
		history.push(path)
	}

	return (
		<>
			<h1>KenzieHub</h1>
			<h4>Uma plataforma para se conectar com o mundo da programação</h4>
			<Stack spacing={2}>
				<Button variant='contained' onClick={() => handleClick('/login')}>
					LOGIN
				</Button>
				<Button variant='contained' onClick={() => handleClick('/signup')}>
					CADASTRA-SE
				</Button>
			</Stack>
		</>
	)
}
