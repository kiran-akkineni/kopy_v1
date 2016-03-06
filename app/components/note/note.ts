import {Component, View} 	from 'angular2/core';
import {Http, Response} 	from 'angular2/http';
import {Observable} 		from 'rxjs/Rx';
import {CanActivate} 		from 'angular2/router';
import {tokenNotExpired} 	from 'angular2-jwt';

@Component({
	selector: 'note'
})
@View({
	templateUrl: './components/note/note.html'
})

@CanActivate(() => tokenNotExpired())
export class Note {
	public notes;

	 constructor(private http: Http) {
		 this.getNotes();
	 }


	getNotes() {
    	this.http.get('/app/food.json')
			     .map((res:Response) => res.json())
      			 .subscribe(data => { this.notes = data},
        					err	 => console.error(err),
        					() 	 => console.log('done')
      	);
  }
}