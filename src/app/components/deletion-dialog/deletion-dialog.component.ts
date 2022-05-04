import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChampion } from 'src/app/utils/interface';

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.css']
})
export class DeletionDialogComponent {
  displayedColumns: string[] = ['name', 'key', 'title', 'tags'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IChampion,
    public dialogRef: MatDialogRef<DeletionDialogComponent>,
  ) {}
  
  /**
   * @description This function close the dialog.
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }
}