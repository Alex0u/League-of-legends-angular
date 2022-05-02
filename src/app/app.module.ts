import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

// HTTP
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

// Services
import { DataService } from './services/data.service';
import { AppBarComponent } from './components/app-bar/app-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Avoid creating multiple instances of ChampionService by passing it into forRoot
    HttpClientInMemoryWebApiModule.forRoot(DataService, { dataEncapsulation: false }),
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
