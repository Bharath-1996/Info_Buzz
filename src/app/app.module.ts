import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  {AngularFireModule} from  "@angular/fire";
import {AngularFirestoreModule  } from "@angular/fire/firestore";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './shared/employee.service';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import {AngularFireAuthModule  } from "@angular/fire/auth";
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { HeaderComponent } from './employees/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './employees/sign-in/sign-in.component';
import { SignUpComponent } from './employees/sign-up/sign-up.component';
import { EmployeeListsComponent } from './employees/employee-lists/employee-lists.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from "../app/material/material.module";
import { MatInputModule} from '@angular/material';
import { MatDialogModule } from "@angular/material";
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import {MatCardModule} from '@angular/material/card';
import {AngularFireStorageModule} from "@angular/fire/storage";
import { ProfileComponent } from './employees/profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { IsloggedinauthGuard } from './shared/isloggedinauth.guard';
import { ChatDialogComponent } from './chatbot/chat-dialog/chat-dialog.component';
import { ChatModule } from './chatbot/chat.module';
import { ChatService } from './chatbot/chat.service';
import { FooterComponent } from './employees/footer/footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    EmployeeListsComponent,
    EmployeeProfileComponent,
    ProfileComponent,
    ChatComponent,
    ChatDialogComponent,
    FooterComponent
   
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ChatDialogComponent,
    MatTooltipModule
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireAuthModule,
    AppRoutingModule, //for auth
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    AngularFireStorageModule,
    MatTooltipModule,

  ],
  providers: [EmployeeService,AuthService,AuthGuard,IsloggedinauthGuard,ChatService],
  bootstrap: [AppComponent],
  entryComponents:[EmployeeComponent,EmployeeProfileComponent,ChatDialogComponent]
  
})
export class AppModule { }