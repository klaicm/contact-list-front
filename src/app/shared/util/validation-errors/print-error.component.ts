import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-print-error',
    templateUrl: './print-error.component.html',
    styleUrls: ['./print-error.component.css']
})
export class PrintErrorComponent {

    @Input() control: any;

}
