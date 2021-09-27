import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Avatar,
} from '@mui/material'
import { red } from '@mui/material/colors'

const Details = () => {
	const [user, setUser] = useState({})

	const [token, setToken] = useState(() => {
		const localToken = localStorage.getItem('token') || ''
		return JSON.parse(localToken)
	})

	useEffect(() => {
		axios
			.get('https://kenziehub.herokuapp.com/profile', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setUser(response.data))
			.catch((e) => console.log(e))
	})

	return (
		<Card sx={{ minWidth: 345, minHeight: 200 }}>
			<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
				{user.name[0]}
			</Avatar>
			<CardContent>
				<Typography>{user.name}</Typography>
				<Typography>{user.bio}</Typography>
				<Typography>{user.contact}</Typography>
				<Typography>{user.techs}</Typography>
				<Typography>{user.works}</Typography>
			</CardContent>
			<CardActions>
				<Button size='small'>Editar Tecnologias</Button>
				<Button size='small'>Editar Trabalhos</Button>
			</CardActions>
		</Card>
	)
}

export default Details
