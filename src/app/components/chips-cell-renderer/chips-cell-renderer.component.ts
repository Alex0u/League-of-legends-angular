import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { colorCode } from 'src/app/utils/constants';

@Component({
  selector: 'app-chips-cell-renderer',
  templateUrl: './chips-cell-renderer.component.html',
  styleUrls: ['./chips-cell-renderer.component.css']
})
export class ChipsCellRendererComponent implements ICellRendererAngularComp {

  constructor() { }

  params: any;
  colors: string[] = [];

  agInit(params: any): void {
    this.params = params;
    if(this.params.value) {
      this.params.value.forEach((type: string) => {
        this.colors.push(colorCode.get(type) ?? 'primary');
      });
    }
    return this.params.value;
  }

  refresh(): boolean {
    return false;
  }
}
