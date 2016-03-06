import {Component, View} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
	selector: 'note'
})
@View({
	templateUrl: './components/note/note.html'
})
@CanActivate(() => tokenNotExpired())
export class Note {
}