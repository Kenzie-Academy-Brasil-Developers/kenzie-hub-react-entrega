import { Button, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import './style.css'

export const LoginForm = () => {
	const history = useHistory()

	const schema = yup.object().shape({
		email: yup.string().email('Email inválido').required('Campo obrigatório'),
		password: yup
			.string()
			.matches(/[A-Za-z0-9]{6,}/, 'Senha deve conter ao menos 6 caracteres')
			.required('Campo obrigatório'),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) })

	const handleForm = (data) => {
		axios
			.post('https://kenziehub.herokuapp.com/sessions', data)
			.then((response) => {
				console.log(response)
				localStorage.clear()
				localStorage.setItem('token', JSON.stringify(response.data.token))
				history.push('/profile')
			})
			.catch((e) => console.log(e))
	}

	return (
		<form onSubmit={handleSubmit(handleForm)}>
			<div>
				<TextField
					label='Email'
					margin='normal'
					variant='outlined'
					size='small'
					color='primary'
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
			</div>
			<div>
				<TextField
					label='Password'
					margin='normal'
					variant='outlined'
					size='small'
					color='primary'
					type='password'
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
			</div>
			<div>
				<Button type='submit' variant='contained' color='primary'>
					Enviar
				</Button>
			</div>
		</form>
	)
}
