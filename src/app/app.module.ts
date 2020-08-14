import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactListAllComponent } from './contacts/contact-list/all-contacts/contact-list-all.component';
import { ContactInfoComponent } from './contacts/contact-details/contact-info/contact-info.component';
import { ContactService } from './contacts/services/contact.service';
import { ContactListFavoritesComponent } from './contacts/contact-list/favorite-contacts/contact-list-favorites.component';
import { RouterModule } from '@angular/router';
import { routing } from 'src/app/app.router';
import { ContactListMainComponent } from './contacts/contact-list/contact-list-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactEditComponent } from './contacts/contact-details/contact-edit/contact-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactAddComponent } from './contacts/contact-details/contact-add/contact-add.component';
import { ConfirmationDialogComponent } from './shared/dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material';
import { SharedDataService } from './contacts/services/shared-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactListAllComponent,
    ContactInfoComponent,
    ContactListFavoritesComponent,
    ContactListMainComponent,
    ContactEditComponent,
    ContactAddComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routing),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    ContactService,
    SharedDataService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
