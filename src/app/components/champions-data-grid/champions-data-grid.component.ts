import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AsyncTransactionsFlushed, ColDef, GridApi, GridReadyEvent, RowDataTransaction } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { ChampionsService } from 'src/app/services/champions.service';
import {displayedColumns} from 'src/app/utils/constants';
import { IChampion } from 'src/app/utils/interface';
import { ButtonsCellRendererComponent } from '../buttons-cell-renderer/buttons-cell-renderer.component';
import { ChipsCellRendererComponent } from '../chips-cell-renderer/chips-cell-renderer.component';

@Component({
  selector: 'app-champions-data-grid',
  templateUrl: './champions-data-grid.component.html',
  styleUrls: ['./champions-data-grid.component.css']
})
export class ChampionsDataGridComponent implements OnDestroy {
  champions$!: Observable<IChampion[]>;
  gridApi: any;
  columnApi: any;
  columnDefs: ColDef[];
  checked: boolean = true;
  url!: string[];
  subscriptions: Subscription[] = [];

  constructor(
    private _championService: ChampionsService,
    private _translation: TranslateService,
    private _snackBar: MatSnackBar,
  ) {
    this.columnDefs = [
      { field: displayedColumns[0], sortable: true, filter: true, resizable: true, flex: 1 },
      { field: displayedColumns[1], filter: true, resizable: true, flex: 1 },
      { field: displayedColumns[2], sortable: true, filter: true, resizable: true, flex: 1 },
      { field: displayedColumns[3], filter: true, autoHeight: true, cellRenderer: ChipsCellRendererComponent },
      { field: 'actions', resizable: false, pinned: 'right', flex: 1, cellRenderer: ButtonsCellRendererComponent },
    ];
    this.switchURL();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * @description This method allows to update a champion.
   * 
   * @param {IChampion} champion The champion to update.
   */
  private update(champion: IChampion): void {
    try {
      const updateSub = this._championService.updateChampion(champion).subscribe(() => {
        const translationSub = this._translation.getTranslation(this._translation.currentLang).subscribe((res)=> {
          this._snackBar.open(
            res.GLOBAL.RES_STATUS.SUCCESS.EDIT, res.GLOBAL.USER_ACTIONS.DISMISS,
            { duration: 5000, panelClass: ['mat-toolbar', 'mat-primary'] },
          );
        });
        this.subscriptions.push(translationSub);
      });
      this.subscriptions.push(updateSub);
    } catch (error: any) {
      const translationSub = this._translation.getTranslation(this._translation.currentLang).subscribe((res)=> {
        this._snackBar.open(
          res.GLOBAL.RES_STATUS.FAILED, res.GLOBAL.USER_ACTIONS.DISMISS,
          { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'],}
        );
      });
      this.subscriptions.push(translationSub);
    }
  }
  
  /**
   * @description This method allows to initialize parameters when the
   * onGridReady event is triggered.
   * 
   * @param {GridReadyEvent} params The event triggered.
   */
  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    // Getting track of transaction events of the grid in order to update API
    params.api.addEventListener('asyncTransactionsFlushed', (ev: AsyncTransactionsFlushed) => {
      const row: IChampion[] = [];
      if(ev.results[0].remove && ev.results[0].remove.length === 1) {
        ev.results[0].remove.forEach((node) => row.push(node.data));
        this.delete(row[0]);
      } else if(ev.results[0].update && ev.results[0].update.length === 1) { 
        ev.results[0].update.forEach((node) => row.push(node.data));
        this.update(row[0]);
      }
    });
  }

  /**
   * @description This method allows to delete the given champion.
   * Also open a new snackbar to inform user in case of success or error.
   * 
   * @param {IChampion} champion The champion to be deleted.
   */
  private delete(champion: IChampion): void {
    try {
      const deleteSub = this._championService.deleteChampion(champion.id).subscribe(() => {
        const translationSub = this._translation.getTranslation(this._translation.currentLang).subscribe((res)=> {
          this._snackBar.open(
            res.GLOBAL.RES_STATUS.SUCCESS.DELETION, res.GLOBAL.USER_ACTIONS.DISMISS,
            { duration: 5000, panelClass: ['mat-toolbar', 'mat-primary'] },
          );
        });
        this.subscriptions.push(translationSub);
      });
      this.subscriptions.push(deleteSub);
    } catch (error: any) {
      const translationSub = this._translation.getTranslation(this._translation.currentLang).subscribe((res)=> {
        this._snackBar.open(
          res.GLOBAL.RES_STATUS.FAILED, res.GLOBAL.USER_ACTIONS.DISMISS,
          { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'],}
        );
      });
      this.subscriptions.push(translationSub);
    }
  }

  /**
   * @description This method allows to switch between 2 API URLs.
   */
  switchURL(): void {
    this.checked = !this.checked;
    this._championService.switchUrl(this.checked);
    this.champions$ = this._championService.getChampions();
    this.url = this._championService.getUrl().split('/');
  }

  /**
   * @description This method allows to resize the given grid columns.
   * 
   * @param {string[]} columns The columns names to be resized.
   */
  autoSize(columns: string[]): void {
    if(this.columnApi) {
      this.columnApi.autoSizeColumns(columns);
    }
  }
}
