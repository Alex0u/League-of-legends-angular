import { Injectable, Injector, OnDestroy } from '@angular/core';
import { IChampion } from '../utils/interface';
import firstChampionDataset from '../../assets/dataset/champion_info.json';
import secondChampionDataset from '../../assets/dataset/champion_info_2.json';
import spellDataset from '../../assets/dataset/summoner_spell_info.json';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const champions: IChampion[] = Object.values(firstChampionDataset.data);
    const championsV2: IChampion[] = Object.values(secondChampionDataset.data);
    const spells: IChampion[] = Object.values(spellDataset.data);

    return { champions, championsV2, spells };
  }

}
