import { Component } from '@angular/core';
import { contacts } from './shared/mock/contacts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contact-list-front';

  constructor() {localStorage.setItem('contacts', JSON.stringify(contacts))}
}
