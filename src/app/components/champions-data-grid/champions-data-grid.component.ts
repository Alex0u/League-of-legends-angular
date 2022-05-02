import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AsyncTransactionsFlushed, ColDef, GridApi, GridReadyEvent, RowDataTransaction } from 'ag-grid-community';
import {Observable} from 'rxjs';
import { ChampionsService } from 'src/app/services/champions.service';
import { IChampion } from 'src/app/utils/interface';

@Component({
  selector: 'app-champions-data-grid',
  templateUrl: './champions-data-grid.component.html',
  styleUrls: ['./champions-data-grid.component.css']
})
export class ChampionsDataGridComponent {
  champions$: Observable<IChampion[]>;
  gridApi: any;

  columnDefs: ColDef[];

  constructor(
    private _championService: ChampionsService,
    public translation: TranslateService,
    private _snackBar: MatSnackBar,
  ) { 
    this.champions$ = this._championService.getChampions();
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
      { field: 'tags', filter: true, resizable: true },
      { 
        field: 'actions',
        resizable: false,
        pinned: 'right',
        width: 250,
        cellRenderer: function(params: any) {
          const div: HTMLDivElement = document.createElement('div');
          const updateButton: HTMLButtonElement = document.createElement('button');
          const deleteButton: HTMLButtonElement = document.createElement('button');

          div.classList.add('actions');
          updateButton.classList.add('mat-stroked-button');
          updateButton.setAttribute('color', 'primary');
          updateButton.setAttribute('aria-label', 'update button');
          translation.stream('GLOBAL.USER_ACTIONS.EDIT').subscribe((res) => {
            updateButton.innerHTML = res;
          });

          deleteButton.classList.add('mat-stroked-button');
          deleteButton.setAttribute('color', 'warn');
          deleteButton.setAttribute('aria-label', 'delete button');
          deleteButton.addEventListener('click', () => {
            params.api.applyTransactionAsync({ remove: [params.data] });
          });
          translation.stream('GLOBAL.USER_ACTIONS.DELETE').subscribe((res) => {
            deleteButton.innerHTML = res;
          });

          div.appendChild(updateButton);
          div.appendChild(deleteButton);
          return div;
        },
      },
    ];
  }

  private update(champion: IChampion): void {
    this._championService.updateChampion(champion).subscribe(() => {
      this.applyTransaction({ update: [champion] });
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
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

  delete(champion: IChampion) {
    try {
      this._championService.deleteChampion(champion.id).subscribe(() => {
        this.translation.getTranslation(this.translation.currentLang).subscribe((res)=> {
          this._snackBar.open(
            res.GLOBAL.RES_STATUS.SUCCESS.DELETION, res.GLOBAL.USER_ACTIONS.DISMISS,
            { duration: 5000 },
          );
        });
      });
    } catch (error: any) {
      this.translation.getTranslation(this.translation.currentLang).subscribe((res)=> {
        this._snackBar.open(
          res.GLOBAL.RES_STATUS.FAILED, res.GLOBAL.USER_ACTIONS.DISMISS,
          { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'],}
        );
      });
    }
  }

  private applyTransaction(transaction: RowDataTransaction): void {
    (this.gridApi as GridApi).applyTransaction(transaction);
  }
}