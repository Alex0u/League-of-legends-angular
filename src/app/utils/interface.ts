export interface IChampion {
  /**
   * @description The champion's ID.
   * 
   * @type {number}
   */
  id: number;

  /**
   * @description The champion's title.
   * 
   * @type {string}
   */
  title: string;

  /**
   * @description The champion's name.
   * 
   * @type {string}
   */
  name: string;

  /**
   * @description The champion's key.
   * 
   * @type {string}
   */
  key: string;

  /**
   * @description The champion's list of tag.
   * 
   * @type {string[]}
   */
  tags: string[] | undefined;
}

export interface ISummonerSpell {
  /**
   * @description The spell's ID.
   * 
   * @type {number}
   */
  id: number;

  /**
   * @description The summoner level.
   * 
   * @type {number}
   */
  summonerLevel: number;

  /**
   * @description The spell's name.
   * 
   * @type {string}
   */
  name: string;

  /**
   * @description The spell's key.
   * 
   * @type {string}
   */
  key: string;


  /**
   * @description The spell's description.
   * 
   * @type {string}
   */
  description: string;
}

export interface IGame {
  gameId?: number;
  creationTime?: number;
  gameDuration?: number;
  seasonId?: number;
  winner?: number;
  firstBlood?: number;
  firstTower?: number;
  firstInhibitor?: number;
  firstBaron?: number;
  firstDragon?: number;
  firstRiftHerald?: number;
  t1_champ1id?: number;
  t1_champ1_sum1?: number;
  t1_champ1_sum2?: number;
  t1_champ2id?: number;
  t1_champ2_sum1?: number;
  t1_champ2_sum2?: number;
  t1_champ3id?: number;
  t1_champ3_sum1?: number;
  t1_champ3_sum2?: number;
  t1_champ4id?: number;
  t1_champ4_sum1?: number;
  t1_champ4_sum2?: number;
  t1_champ5id?: number;
  t1_champ5_sum1?: number;
  t1_champ5_sum2?: number;
  t1_towerKills?: number;
  t1_inhibitorKills?: number;
  t1_baronKills?: number;
  t1_dragonKills?: number;
  t1_riftHeraldKills?: number;
  t1_ban1?: number;
  t1_ban2?: number;
  t1_ban3?: number;
  t1_ban4?: number;
  t1_ban5?: number;
  t2_champ1id?: number;
  t2_champ1_sum1?: number;
  t2_champ1_sum2?: number;
  t2_champ2id?: number;
  t2_champ2_sum1?: number;
  t2_champ2_sum2?: number;
  t2_champ3id?: number;
  t2_champ3_sum1?: number;
  t2_champ3_sum2?: number;
  t2_champ4id?: number;
  t2_champ4_sum1?: number;
  t2_champ4_sum2?: number;
  t2_champ5id?: number;
  t2_champ5_sum1?: number;
  t2_champ5_sum2?: number;
  t2_towerKills?: number;
  t2_inhibitorKills?: number;
  t2_baronKills?: number;
  t2_dragonKills?: number;
  t2_riftHeraldKills?: number;
  t2_ban1?: number;
  t2_ban2?: number;
  t2_ban3?: number;
  t2_ban4?: number;
  t2_ban5?: number;
}