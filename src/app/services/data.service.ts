import { Injectable, Injector } from '@angular/core';
import { IChampion, IGame } from '../utils/interface';
import firstChampionDataset from '../../assets/dataset/champion_info.json';
import secondChampionDataset from '../../assets/dataset/champion_info_2.json';
import spellDataset from '../../assets/dataset/summoner_spell_info.json';
import { HttpClient } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  httpClient!: HttpClient;
  constructor(private inject: Injector) { }

  createDb() {
    const games: IGame[] = [];
    this.httpClient = this.inject.get(HttpClient);
    this.httpClient.get('assets/dataset/games.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\r");
            let headers: string[] = csvToRowArray[0].split(",");
            for (let index = 1; index < 100 - 1; index++) {
              let obj: IGame = {};
              let row: number[]  = csvToRowArray[index].split(",").map(value => Number.parseInt(value));
              
              for (let header in headers) {
                const keyHeader = headers[header] as keyof IGame;
                obj[keyHeader] = row[headers.indexOf(keyHeader)];
              }
              games.push(obj);
            }
        }
    );
    const champions: IChampion[] = Object.values(firstChampionDataset.data);
    const championsV2: IChampion[] = Object.values(secondChampionDataset.data);
    const spells: IChampion[] = Object.values(spellDataset.data);

    return { champions, championsV2, spells, games };
  }
}
