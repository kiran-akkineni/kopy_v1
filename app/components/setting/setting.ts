import {Component, OnInit}              from 'angular2/core';
import {CanActivate}                    from 'angular2/router';
import {tokenNotExpired}                from '../../services/authcheckservice';
import {ProfileService}                 from '../../services/profileservice';
import {ControlGroup, FormBuilder,
        Validators}                     from "angular2/common";
import 'rxjs/add/operator/map';

@Component({
	selector: 'setting',
    providers: [ProfileService, Validators],
    templateUrl: './components/setting/setting.html'
})

@CanActivate(() => tokenNotExpired())
export class Setting implements OnInit
{
    usernameFrom:ControlGroup;
    constructor(private fromBuilder: FormBuilder, private profileService:ProfileService) {}

    ngOnInit() {
        this.usernameFrom = this.fromBuilder.group({username: ["", Validators.required]});
        this.profileService.get()
			               .then((data) => {
			                   if(data && data.username) this.usernameFrom.controls.username.updateValue(data.username);
			               });
    }

    saveUserName(event) {
            event.preventDefault();
    }
}