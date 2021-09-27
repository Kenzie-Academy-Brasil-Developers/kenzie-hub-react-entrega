import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Signup } from '../pages/cadastro'
import { Login } from '../pages/login'
import { Profile } from '../pages/profile'
import { Techs } from '../pages/techs'
import { Works } from '../pages/works'

export const Routes = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path='/signup'>
				<Signup />
			</Route>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/profile'>
				<Profile />
			</Route>
			<Route path='/techs'>
				<Techs />
			</Route>
			<Route path='/works'>
				<Works />
			</Route>
		</Switch>
	)
}
