import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactListAllComponent } from './contacts/contact-list/all-contacts/contact-list-all.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactService } from './contacts/services/contact.service';
import { ContactListFavoritesComponent } from './contacts/contact-list/favorite-contacts/contact-list-favorites.component';
import { RouterModule } from '@angular/router';
import { routing } from 'src/app/app.router';
import { ContactListMainComponent } from './contacts/contact-list/contact-list-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
import { ConfirmationDialogComponent } from './shared/dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ContactListAllComponent,
    ContactDetailsComponent,
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
    MatDialogModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [
    AppComponent,
    ContactListAllComponent,
    ContactDetailsComponent,
    ContactListFavoritesComponent,
    ContactListMainComponent,
    ContactEditComponent,
    ContactAddComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
