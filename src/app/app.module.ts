import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

// Other modules
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';

// Other
import { DatePipe } from '@angular/common';

// Components
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { ButtonsCellRendererComponent } from './components/buttons-cell-renderer/buttons-cell-renderer.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ChampionsDataGridComponent } from './components/champions-data-grid/champions-data-grid.component';
import { DeletionDialogComponent } from './components/deletion-dialog/deletion-dialog.component';
import { ChipsCellRendererComponent } from './components/chips-cell-renderer/chips-cell-renderer.component';

// HTTP
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Services
import { DataService } from './services/data.service';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppBarComponent,
    ChampionsDataGridComponent,
    DeletionDialogComponent,
    ChipsCellRendererComponent,
    ButtonsCellRendererComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Avoid creating multiple instances of DataService by passing it into forRoot
    HttpClientInMemoryWebApiModule.forRoot(DataService, { dataEncapsulation: false, passThruUnknownUrl: true }),
    HttpClientModule,
    MatToolbarModule,
    AgGridModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en',
    }),
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
