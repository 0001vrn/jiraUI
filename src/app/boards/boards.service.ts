import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourseTimeChart, IndividualStoryPoints } from '../sprint-details/sprint';

@Injectable()
export class JiraApiService {
  
  private _baseUrl = 'http://localhost:55681/api/jira/';
  private _boardUrl = 'GetBoard';
  private _activeSprintUrl = 'GetActiveSprint';
  private _loggedHoursUrl = 'GetLoggedHours';
  private _individualStoryPoints = 'GetIndividualStoryPoints';
  private _sprintActualvsEstimated = 'GetSprintActualvsEstimated';

  constructor(private http:Http) { }

  getBoards():Observable<Response>{
    return this.http.get(this._baseUrl + this._boardUrl).map(res => res.json());
  }
  getActiveSprint(boardId:string):Observable<Response>{
    return this.http.get(this._baseUrl + this._activeSprintUrl + '?boardId='+boardId).map(res => res.json());
  }
  getLoggedHours(boardId:string, date:string):Observable<ResourseTimeChart[]>{
    return this.http.get(this._baseUrl + this._loggedHoursUrl + '?boardId='+boardId+'&forDate='+date).map(res => res.json());
  }
  getIndividualStoryPoints(boardId:string):Observable<IndividualStoryPoints[]>{
    return this.http.get(this._baseUrl + this._individualStoryPoints + '?boardId='+boardId).map(res => res.json());
  }
  getSprintActualvsEstimated(boardId:string):Observable<Response>{
    return this.http.get(this._baseUrl + this._sprintActualvsEstimated + '?boardId='+boardId).map(res => res.json());
  }
}
