import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {
  currLang: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang() ?? 'en';
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.currLang = this.translate.currentLang;
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currLang = this.translate.currentLang;
  }
}
