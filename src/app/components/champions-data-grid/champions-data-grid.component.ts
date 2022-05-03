import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AsyncTransactionsFlushed, ColDef, GridApi, GridReadyEvent, RowDataTransaction } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ChampionsService } from 'src/app/services/champions.service';
import { IChampion } from 'src/app/utils/interface';
import { ChipsCellRendererComponent } from '../chips-cell-renderer/chips-cell-renderer.component';
import { DeletionDialogComponent } from '../deletion-dialog/deletion-dialog.component';

@Component({
  selector: 'app-champions-data-grid',
  templateUrl: './champions-data-grid.component.html',
  styleUrls: ['./champions-data-grid.component.css']
})
export class ChampionsDataGridComponent {
  champions$: Observable<IChampion[]>;
  gridApi: any;
  columnApi: any;
  columnDefs: ColDef[];
  checked: boolean = false;
  url: string[];

  constructor(
    private _championService: ChampionsService,
    private _translation: TranslateService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
  ) {
    this.champions$ = this._championService.getChampions();
    this.url = this._championService.getUrl().split('/');
    
    this._translation.onLangChange.subscribe(async res => {
      setTimeout(() => {
        this.autoSize(['actions']);
      }), 1
    });

    this.columnDefs = [
      { 
        field: 'name',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      },
      { field: 'key', filter: true, resizable: true, flex: 1,  },
      { field: 'title', sortable: true, filter: true, resizable: true, flex: 1 },
      {
        field: 'tags',
        filter: true,
        autoHeight: true,
        cellRenderer: ChipsCellRendererComponent,
      },
      { 
        field: 'actions',
        resizable: false,
        pinned: 'right',
        flex: 1,
        cellRenderer: function(params: any) {
          const div: HTMLDivElement = document.createElement('div');
          const updateButton: HTMLButtonElement = document.createElement('button');
          const deleteButton: HTMLButtonElement = document.createElement('button');

          div.classList.add('actions');
          updateButton.classList.add('mat-stroked-button');
          updateButton.setAttribute('color', 'primary');
          updateButton.setAttribute('aria-label', 'update button');
          _translation.stream('GLOBAL.USER_ACTIONS.EDIT').subscribe((res) => {
            updateButton.innerHTML = res;
          });

          deleteButton.classList.add('mat-stroked-button');
          deleteButton.setAttribute('color', 'warn');
          deleteButton.setAttribute('aria-label', 'delete button');
          deleteButton.addEventListener('click', () => {
            const dialogRef = _matDialog.open(DeletionDialogComponent, {
              data: params.data,
              width: '100%',
            });
            dialogRef.afterClosed().subscribe(res => {
              if (res) {
                params.api.applyTransactionAsync({ remove: [params.data] });
              }
            });
          });
          _translation.stream('GLOBAL.USER_ACTIONS.DELETE').subscribe((res) => {
            deleteButton.innerHTML = res;
          });

          div.appendChild(updateButton);
          div.appendChild(deleteButton);
          return div;
        },
      },
    ];
  }
  
  /**
   * @description This method allows to update a champion.
   * 
   * @param {IChampion} champion The champion to update.
   */
  private update(champion: IChampion): void {
    this._championService.updateChampion(champion).subscribe(() => {
      this.applyTransaction({ update: [champion] });
    });
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
    params.api.addEventListener('asyncTransactionsFlushed', (ev: AsyncTransactionsFlushed) => {
      const row: IChampion[] = [];
      if(ev.results[0].remove && ev.results[0].remove.length === 1) {
        ev.results[0].remove.forEach((node) => row.push(node.data));
        this.delete(row[0]);
      } else if(ev.results[0].add && ev.results[0].add.length === 1) { 
        ev.results[0].add.forEach((node) => row.push(node.data));
        this._championService.addChampion(row[0]);
      }
    });
  }

  /**
   * @description This method allows to delete the given champion.
   * 
   * @param {IChampion} champion The champion to be deleted.
   */
  private delete(champion: IChampion): void {
    try {
      this._championService.deleteChampion(champion.id).subscribe(() => {
        this._translation.getTranslation(this._translation.currentLang).subscribe((res)=> {
          this._snackBar.open(
            res.GLOBAL.RES_STATUS.SUCCESS.DELETION, res.GLOBAL.USER_ACTIONS.DISMISS,
            { duration: 5000, panelClass: ['mat-toolbar', 'mat-primary'] },
          );
        });
      });
    } catch (error: any) {
      this._translation.getTranslation(this._translation.currentLang).subscribe((res)=> {
        this._snackBar.open(
          res.GLOBAL.RES_STATUS.FAILED, res.GLOBAL.USER_ACTIONS.DISMISS,
          { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'],}
        );
      });
    }
  }

  /**
   * @description This method allows to resize the given grid columns.
   * 
   * @param {RowDataTransaction} transaction The transaction to apply changes to the grid.
   */
  private applyTransaction(transaction: RowDataTransaction): void {
    (this.gridApi as GridApi).applyTransaction(transaction);
  }

  /**
   * @description This method allows to switch between 2 API URL.
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
