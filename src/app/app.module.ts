import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AgGridModule } from 'ag-grid-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

// HTTP
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Services
import { DataService } from './services/data.service';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ChampionsDataGridComponent } from './components/champions-data-grid/champions-data-grid.component';
import { DeletionDialogComponent } from './components/deletion-dialog/deletion-dialog.component';

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
    DeletionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Avoid creating multiple instances of ChampionService by passing it into forRoot
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
