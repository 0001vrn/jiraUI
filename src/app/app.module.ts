import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AboutComponent } from './shared/about.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './shared/contact.component'
import { HomeComponent } from './shared/home.component';
import { UserFormComponent } from './form-data/user-form.component';
import { HttpModule } from '@angular/http';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { JiraApiService } from './boards/boards.service';
import { LoadingModule } from 'ngx-loading';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from '@angular/common/http/src/client';
import { ChartsModule} from 'ng2-charts'
import { ProgressBarModule } from 'primeng/primeng';
import { DatepickerComponent } from './shared/datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EmitterService } from './helper/emitter.service';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    UserFormComponent,
    SprintDetailsComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    MatDatepickerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,


    HttpModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ChartsModule,
    RouterModule.forRoot(
      [
        { path: 'login', component: UserFormComponent },
        { path: 'home', component: HomeComponent },
        { path: 'about', component: AboutComponent },
        { path: 'contact', component: ContactComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: '**', redirectTo: 'login', pathMatch: 'full' }
      ]),ProgressBarModule,
  ],
  providers: [ 
    JiraApiService,
    EmitterService,
    {
      provide: MAT_DATE_LOCALE, 
      useValue: 'en-US'
    },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  