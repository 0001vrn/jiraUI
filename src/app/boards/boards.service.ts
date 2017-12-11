import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
@Injectable()
export class JiraApiService {
  constructor(private http:Http) { }
  getBoards():Observable<Response>{
  return this.http.get('http://localhost:55681/api/jira/getboard').map(res => res.json());
}
getActiveSprint(boardId:string):Observable<Response>{
  return this.http.get('http://localhost:55681/api/jira/GetActiveSprint?boardId='+boardId).map(res => res.json());
  
}
}
