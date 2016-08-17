import {Component, OnInit, ChangeDetectorRef}              from 'angular2/core';
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
    passwordChangeFrom:ControlGroup;
    flashMessage = {"mgs" : "",
                    "type": "success"};
    constructor(private fromBuilder: FormBuilder, private profileService:ProfileService, private ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.usernameFrom = this.fromBuilder.group({username: ["", Validators.compose([Validators.required, Validators.minLength(4)])]});

        this.passwordChangeFrom =  this.fromBuilder.group({
            old_password    :       ["", Validators.required],
            password        :       ["", Validators.compose([Validators.required, Validators.minLength(4)])],
            confirmPassword :    ["", Validators.compose([Validators.required, Validators.minLength(4))]
        }, {validator: this.mismatchedPasswords('password', 'confirmPassword')});

        this.profileService.get()
			               .then((data) => {
			                   if(data && data.username) this.usernameFrom.controls.username.updateValue(data.username);
			               });
        this.setFlashMessage("");
    }

    saveUserName() {
            this.profileService.save(this.usernameFrom.value)
                               .then((data) => {
                                   if (data.status == false) {
                                       this.setFlashMessage("Sorry! username already taken.","danger");
                                   } else {
                                        this.setFlashMessage("Username has been updated.","success");
                                   }

                               });
    }

    setFlashMessage(mgs, type="success") {
        this.flashMessage.mgs       = mgs;
        this.flashMessage.type      = "alert alert-"+type;
    }

    changePassword(event) {
        event.preventDefault();
        alert(this.passwordChangeFrom.valid);


    }

    mismatchedPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: ControlGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
              return {
                mismatchedPasswords: true
              };
            }
        }
    }


}