import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { displayedColumns } from 'src/app/utils/constants';
import { IChampion } from 'src/app/utils/interface';

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.css']
})
export class DeletionDialogComponent {
  displayedColumns: string[] = displayedColumns;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IChampion,
    public dialogRef: MatDialogRef<DeletionDialogComponent>,
  ) {}
  
  /**
   * @description This function close the dialog without result to
   * the opener.
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }
}