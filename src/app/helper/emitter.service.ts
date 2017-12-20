import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../form-data/user';

@Injectable()
export class EmitterService {

    // Observable string sources
    private key = new Subject<any>();
    
    // Observable string streams
    key$ = this.key.asObservable();

    // Service message commands
    publishData(data: User) {
        this.key.next(data);
    }

}
