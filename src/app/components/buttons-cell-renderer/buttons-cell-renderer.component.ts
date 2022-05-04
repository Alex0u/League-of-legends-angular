import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ChampionsService} from 'src/app/services/champions.service';
import {IChampion} from 'src/app/utils/interface';
import {DeletionDialogComponent} from '../deletion-dialog/deletion-dialog.component';

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

  edit(champion: IChampion) {
    console.log(champion);
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
      if (res) {
        this.params.api.applyTransactionAsync({ remove: [this.item] });
      }
    });
  }
}
