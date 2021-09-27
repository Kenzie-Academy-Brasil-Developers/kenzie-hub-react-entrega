import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Signup } from '../pages/cadastro'
import { Login } from '../pages/login'
import { Profile } from '../pages/profile'
import { Techs } from '../pages/techs'
import { Update } from '../pages/update/index'

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
			<Route path='/update'>
				<Update />
			</Route>
		</Switch>
	)
}
