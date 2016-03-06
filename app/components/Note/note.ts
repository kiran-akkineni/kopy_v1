import {Component, View} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
	selector: 'Note'
})
@View({
	template: `hELLO WORLD`
})
@CanActivate(() => tokenNotExpired())
export class Note {
}