import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { ResourseTimeChart, IndividualStoryPoints, TimeTracking, SprintDetail } from '../sprint-details/sprint';
import { IBoard } from './board';
import { User } from '../form-data/user';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JiraApiService {
  
  private _baseUrl = 'http://localhost:55681/api/jira/';
  private _boardUrl = 'GetBoard';
  private _activeSprintUrl = 'GetActiveSprint';
  private _loggedHoursUrl = 'GetLoggedHours';
  private _individualStoryPoints = 'GetIndividualStoryPoints';
  private _sprintActualvsEstimated = 'GetSprintActualvsEstimated';
  
  model = new User('','','');
  headers = new HttpHeaders();
  constructor(private http:HttpClient) { }

  createAuthHeader(headers: HttpHeaders,data: User):HttpHeaders {
    headers=headers.set('Authorization', 'Basic ' + this.getAccessToken(data));
    return headers.set('ServerUrl',data.serverUrl); 
  }
  getAccessToken(data: User){
    return btoa(data.email+':'+data.password);
  }
  
  getBoards():Observable<any>
  {
    this.model = JSON.parse(localStorage.getItem("user")); 
    
    this.headers = this.createAuthHeader(this.headers,this.model);

    return this.http.get(this._baseUrl + this._boardUrl,{ headers:this.headers });
  }
  getActiveSprint(boardId:string):Observable<any>{
    

    return this.http.get(this._baseUrl + this._activeSprintUrl + '?boardId='+boardId,{ headers:this.headers });
  }
  getLoggedHours(boardId:string, date:string):Observable<any>{
    
    
    return this.http.get(this._baseUrl + this._loggedHoursUrl + '?boardId='+boardId+'&forDate='+date,{ headers:this.headers });
  }
  getIndividualStoryPoints(boardId:string):Observable<any>{
    
    
    return this.http.get(this._baseUrl + this._individualStoryPoints + '?boardId='+boardId,{ headers:this.headers });
  }
  getSprintActualvsEstimated(boardId:string):Observable<any>{
  
    
    return this.http.get(this._baseUrl + this._sprintActualvsEstimated + '?boardId='+boardId,{ headers:this.headers });
  }

  

}
