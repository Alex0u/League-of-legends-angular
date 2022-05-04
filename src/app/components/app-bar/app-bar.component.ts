import { Component, OnDestroy } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnDestroy {
  currLang: string;
  currentRoute: string = '/home';
  routerSub: Subscription;

  constructor(public translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang() ?? 'en';
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.currLang = this.translate.currentLang;

    this.routerSub = router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currLang = this.translate.currentLang;
  }
}
