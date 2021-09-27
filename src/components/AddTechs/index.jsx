import { Button, TextField, Select, MenuItem } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'

const AddTechs = () => {
	const history = useHistory()
	const [status, setStatus] = useState('Iniciante')
	const [token, setToken] = useState(() => {
		const localToken = localStorage.getItem('token') || ''
		return JSON.parse(localToken)
	})
	const config = { headers: { Authorization: `Bearer ${token}` } }

	const schema = yup.object().shape({
		title: yup.string().required('Nome da tecnologia obrigatório'),
		status: yup.string().required('Campo obrigatório'),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) })

	const handleForm = (data) => {
		console.log(token, data)
		axios
			.post('https://kenziehub.herokuapp.com/users/techs', data, config)
			.then((response) => {
				history.push('/profile')
			})
			.catch((e) => console.log(e))
	}

	return (
		<form onSubmit={handleSubmit(handleForm)}>
			<div>
				<TextField
					label='Tech'
					margin='normal'
					variant='outlined'
					size='small'
					color='primary'
					{...register('title')}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>
			</div>
			<div>
				<Select
					id='outlined-basic'
					{...register('status')}
					error={!!errors.status}
					helperText={errors.status?.message}
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<MenuItem value={'Iniciante'}>Iniciante</MenuItem>
					<MenuItem value={'Intermediário'}>Intermediário</MenuItem>
					<MenuItem value={'Avançado'}>Avançado</MenuItem>
				</Select>
			</div>
			<div>
				<Button type='submit' variant='contained' color='primary'>
					Enviar
				</Button>
			</div>
		</form>
	)
}

export default AddTechs
