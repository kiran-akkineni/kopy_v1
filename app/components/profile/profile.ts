import {Component, View}                from 'angular2/core';
import {CanActivate}                    from 'angular2/router';
import {tokenNotExpired}                from '../../services/authcheckservice';
import {ProfileService}                 from '../../services/profileservice';
import {OnInit} 						from "angular2/src/core/linker/interfaces";
@Component({
	selector: 'profile',
	providers: [ProfileService]
})
@View({
	templateUrl: './components/profile/profile.html',
    styleUrls   : ['./components/profile/profile.css']
})
@CanActivate(() => tokenNotExpired())
export class Profile implements OnInit {
    profile: any;

  	constructor(private profileService: ProfileService) {
	     this.profile = [];
	}

	ngOnInit() {
	 	this.profileService.get()
			               .then((data) => {this.profile = data})
						   .catch((err) => console.log("something wrong at profile page"));
	}
}