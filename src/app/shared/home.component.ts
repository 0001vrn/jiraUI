import { Component, OnInit } from '@angular/core';
import { JiraApiService } from '../boards/boards.service';
import { IBoard } from '../boards/board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  projects :IBoard[];
  currentProject = '';
  currentBoardId = -2;
  isSelected = false;
  errorMessage: string;
 // Inject HttpClient into your component or service.
 constructor( private _boardsService: JiraApiService) {}
 
 open(item) :void
 {
      console.log(item);
      this.currentBoardId = item.id;
      this.currentProject = item.name;
      this.isSelected = true;
  }


  ngOnInit(): void {
 
    this._boardsService.getBoards()
    .subscribe(board=>{this.currentBoardId=-1;this.projects=board[0].values;},error => {
      this.errorMessage="Please try again or refresh the page";
    });
  } 
}

