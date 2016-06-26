/**
 * Created by eftakhairul <eftakhairul@gmail.com>
 */
import {Component, View} 	from 'angular2/core';
import {Router} 			from 'angular2/router'
import {AuthService} 		from './../../services/authservice';

@Component({
	selector: 'login',
	providers: [AuthService]
})
@View({
	templateUrl: './components/login/login.html'
})

export class Login {

	user = {username: '',
			password: ''};

	constructor(private authService:AuthService, private router:Router) {
	}

	clearField(){
		this.user.username = '';
		this.user.password = '';
	}

	login() {
		this.authService.authenticate(this.user).then((res) => {
			if(res) {
				this.router.navigate(['Note']);
			}
		});
	}
}