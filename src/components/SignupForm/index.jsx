import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, MenuItem } from '@mui/material'
import Select from '@mui/material/Select'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './style.css'
import { useState } from 'react'

export const SignupForm = () => {
	const [module, setModule] = useState(
		'Primeiro módulo (Introdução ao Frontend)'
	)
	const history = useHistory()

	const schema = yup.object().shape({
		name: yup.string().required('Nome é obrigatório'),
		email: yup.string().required('Email é obrigatório').email('Email Inválido'),
		bio: yup.string().required('Informe uma bio'),
		contact: yup
			.string()
			.required('Informe uma forma de contato ex.: LinkedIn, telefone, etc...'),
		password: yup
			.string()
			.required('Senha é obrigatória')
			.matches(/[A-Za-z0-9]{6,}/, 'Senha deve conter ao menos 6 caracteres'),
		course_module: yup.string().required('Deve selecionar um módulo'),
	})

	const handleForm = (data) => {
		console.log(data)
		axios
			.post('https://kenziehub.herokuapp.com/users', data)
			.then((response) => {
				history.push('/login')
			})
			.catch((e) => console.log(e))
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) })

	return (
		<form onSubmit={handleSubmit(handleForm)}>
			<div>
				<TextField
					id='outlined-basic'
					margin='normal'
					color='primary'
					label='Nome'
					variant='outlined'
					{...register('name')}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
			</div>
			<div>
				<TextField
					id='outlined-basic'
					margin='normal'
					color='primary'
					label='Email'
					variant='outlined'
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
			</div>
			<div>
				<TextField
					type='password'
					id='outlined-basic'
					margin='normal'
					color='primary'
					label='Senha'
					variant='outlined'
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
			</div>
			<div>
				<TextField
					type='text'
					id='outlined-basic'
					margin='normal'
					color='primary'
					label='Bio'
					variant='outlined'
					{...register('bio')}
					error={!!errors.bio}
					helperText={errors.bio?.message}
				/>
			</div>
			<div>
				<TextField
					type='text'
					id='outlined-basic'
					margin='normal'
					color='primary'
					label='Contato'
					variant='outlined'
					{...register('contact')}
					error={!!errors.contact}
					helperText={errors.bio?.contact}
				/>
			</div>
			<div>
				<Select
					labelId='label'
					id='outlined-basic'
					label='Módulo'
					color='primary'
					autoWidth
					value={module}
					{...register('course_module')}
					error={!!errors.course_module}
					helperText={errors.bio?.course_module}
					onChange={(e) => setModule(e.target.value)}
				>
					<MenuItem value={'Primeiro módulo (Introdução ao Frontend)'}>
						1° Módulo
					</MenuItem>
					<MenuItem value={'Segundo módulo (Frontend Avançado)'}>
						2° Módulo
					</MenuItem>
					<MenuItem value={'Terceiro módulo (Introdução ao Backend)'}>
						3° Módulo
					</MenuItem>
					<MenuItem value={'Quarto módulo (Backend Avançado)'}>
						4° Módulo
					</MenuItem>
				</Select>
			</div>

			<Button type='submit' variant='contained' color='primary' margin='normal'>
				Enviar
			</Button>
		</form>
	)
}
