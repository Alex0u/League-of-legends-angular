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
