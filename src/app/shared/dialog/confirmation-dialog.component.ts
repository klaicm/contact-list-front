import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css', '../styles/edit-add.component.css']
})

export class ConfirmationDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

    closeDialogCancel(): void {
        this.dialogRef.close(false);
    }

    closeDialogSave(): void {
        this.dialogRef.close(true);
    }
}
