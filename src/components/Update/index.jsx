import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	Select,
	MenuItem,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export const UpdateTechs = () => {
	const history = useHistory()
	const [techs, setTechs] = useState([])
	const [data, setData] = useState({})
	const [value, setValue] = useState('Iniciante')
	const [token, setToken] = useState(() => {
		const localToken = localStorage.getItem('token') || ''
		return JSON.parse(localToken)
	})
	const config = { headers: { Authorization: `Bearer ${token}` } }

	useEffect(() => {
		axios
			.get('https://kenziehub.herokuapp.com/profile', config)
			.then((response) => setTechs(response.data.techs))
			.catch((e) => console.log(e))
	})

	const updateTech = (id) => {
		setData({ status: value })
		axios
			.put(`https://kenziehub.herokuapp.com/users/techs/${id}`, data, config)
			.then((response) => history.push('/profile'))
			.catch((err) => console.log(err))
	}

	const deleteTech = (id) => {
		axios
			.delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, config)
			.then((response) => history.push('/profile'))
			.catch((err) => console.log(err))
	}

	return (
		<Box>
			{techs.map((item, key) => {
				return (
					<Card
						sx={{ maxWidth: '250px', maxHeight: 200, marginTop: '20px' }}
						key={key}
					>
						<CardContent>
							<Typography variant='h5'>{item.title}</Typography>
							<Select value={value} onChange={(e) => setValue(e.target.value)}>
								<MenuItem value={'Iniciante'}>Iniciante</MenuItem>
								<MenuItem value={'Intermediário'}>Intermediário</MenuItem>
								<MenuItem value={'Avançado'}>Avançado</MenuItem>
							</Select>
						</CardContent>
						<CardActions>
							<Button onClick={() => updateTech(item.id)}>
								ATUALIZAR TECH
							</Button>
							<Button onClick={() => deleteTech(item.id)}> EXCLUIR TECH</Button>
						</CardActions>
					</Card>
				)
			})}
		</Box>
	)
}
