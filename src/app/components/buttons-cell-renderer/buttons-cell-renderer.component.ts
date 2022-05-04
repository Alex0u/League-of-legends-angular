import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {GridApi} from 'ag-grid-community';
import { IChampion } from 'src/app/utils/interface';
import { DeletionDialogComponent } from '../deletion-dialog/deletion-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-buttons-cell-renderer',
  templateUrl: './buttons-cell-renderer.component.html',
  styleUrls: ['./buttons-cell-renderer.component.css']
})
export class ButtonsCellRendererComponent implements ICellRendererAngularComp {

  constructor(private _matDialog: MatDialog) { }

  item: any;
  params: any;

  agInit(params: any): void {
    this.item = params.data;
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  /**
   * @description This methods allows to display a dialog in order to edit the champion.
   * 
   * @param {IChampion} champion The champion to be edited.
   */
  edit(champion: IChampion) {
    const dialogRef = this._matDialog.open(EditDialogComponent, {
      data: champion,
      width: '100%',
    });
    dialogRef.afterClosed().subscribe((res: IChampion) => {
      if (res) {
        champion.name = res.name;
        champion.title = res.title;
        champion.tags = res.tags;
        (this.params.api as GridApi).applyTransactionAsync({update: [champion]});
      }
    });
  }

  /**
   * @description This methods allows to display a dialog in order to confirm deletion
   * 
   * @param {IChampion} champion The champion to be deleted.
   */
  delete(champion: IChampion) {
    const dialogRef = this._matDialog.open(DeletionDialogComponent, {
      data: champion,
      width: '100%',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.params.api.applyTransactionAsync({ remove: [this.item] });
    });
  }
}
