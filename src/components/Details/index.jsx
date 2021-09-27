import './styles.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@mui/material'
import { Box } from '@mui/system'

const Details = () => {
	const history = useHistory()
	const [user, setUser] = useState({})
	const [techs, setTechs] = useState([])
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
		setTechs(user.techs)
	}, [user.techs, token])

	const editTechs = () => {
		history.push('/techs')
	}

	const update = () => {
		history.push('/update')
	}

	return (
		<section>
			<Card sx={{ maxWidth: '340px', minHeight: 200 }}>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'collumn',
						flexWrap: 'wrap',
						alignItems: 'flex-start',
					}}
				>
					<Typography>Nome: {user.name}</Typography>
					<Typography> Bio: {user.bio}</Typography>
					<Typography>Contato: {user.contact}</Typography>
					<Typography>Módulo: {user.course_module}</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={editTechs} size='small'>
						Adicionar Tecnologias
					</Button>
					<Button onClick={update} size='small'>
						Atualizar Tecnologias
					</Button>
				</CardActions>
			</Card>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
					marginTop: '30px',
				}}
			>
				{techs !== undefined &&
					techs.map((item, key) => {
						return (
							<Card
								sx={{ minWidth: '145px', maxHeight: 200, marginLeft: '20px' }}
								key={key}
							>
								<CardContent>
									<Typography variant='h5'>{item.title}</Typography>
									<Typography>{item.status}</Typography>
								</CardContent>
							</Card>
						)
					})}
			</Box>
		</section>
	)
}

export default Details
