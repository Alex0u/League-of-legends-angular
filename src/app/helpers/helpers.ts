import { IChampion } from '../utils/interface';

/**
 * @description This function compares two IChampion.
 * 
 * @param {IChampion} champ_1 A champion object type
 * @param {IChampion} champ_2 A champion object type
 * 
 * @returns true or false wether they are equal or not.
 */
export function isChampionsEqual(champ_1: IChampion, champ_2: IChampion): boolean {
  if(champ_1.id !== champ_2.id) return false;
  if(champ_1.key !== champ_2.key) return false;
  if(champ_1.name !== champ_2.name) return false;
  if(champ_1.title !== champ_2.title) return false;
  if(champ_1.tags === champ_2.tags) return true
  else {
    if(champ_1.tags && champ_2.tags) {
      champ_2.tags?.sort();
      return champ_1.tags?.length === champ_2.tags?.length && champ_1.tags?.slice().sort().every(
        (value, index) => { return value === champ_2.tags![index];}
      );
    }
    return false;
  }
}