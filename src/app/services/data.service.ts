import { Injectable, Injector, OnDestroy } from '@angular/core';
import { IChampion, IGame } from '../utils/interface';
import firstChampionDataset from '../../assets/dataset/champion_info.json';
import secondChampionDataset from '../../assets/dataset/champion_info_2.json';
import spellDataset from '../../assets/dataset/summoner_spell_info.json';
import { HttpClient } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {firstValueFrom, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService, OnDestroy {
  private httpClient: HttpClient | undefined;
  private httpSubscription!: Subscription;

  constructor(private inject: Injector) { }

  async createDb() {
    const champions: IChampion[] = Object.values(firstChampionDataset.data);
    const championsV2: IChampion[] = Object.values(secondChampionDataset.data);
    const spells: IChampion[] = Object.values(spellDataset.data);

    return { champions, championsV2, spells };
  }
  
  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }
}
