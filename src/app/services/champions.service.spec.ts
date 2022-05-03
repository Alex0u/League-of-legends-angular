import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { IChampion } from '../utils/interface';
import { ChampionsService } from './champions.service';
import { DataService } from './data.service';

describe('ChampionsService', () => {
  let service: ChampionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService, { dataEncapsulation: false, passThruUnknownUrl: true }),
      ],
    });
    service = TestBed.inject(ChampionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 138 champions', waitForAsync(() => {
    service.getChampions().subscribe(res => {
      expect(res.length).toBe(138);
    });
  }));

  it('should return null when deleting a champion', waitForAsync(() => {
    service.deleteChampion(1).subscribe(res => {
      expect(res).toBeNull();
    });
  }));

  it('should return 137 champions after deleting one', waitForAsync(() => {
    service.deleteChampion(1).subscribe(() => {
      service.getChampions().subscribe(res => {
        expect(res.length).toBe(137);
      });
    });
  }));

  it('should return 139 champions after adding one', waitForAsync(() => {
    const champion: IChampion = {
      id: 1000,
      key: 'test',
      name: 'test',
      title: 'test',
      tags: [],
    };
    service.addChampion(champion).subscribe(() => {
      service.getChampions().subscribe(res => {
        expect(res.length).toBe(139);
        expect(res[138]).toEqual(champion);
      });
    });
  }));

  it('should add the correct champion', waitForAsync(() => {
    const champion: IChampion = {
      id: 1000,
      key: 'test',
      name: 'test',
      title: 'test',
      tags: [],
    };
    service.addChampion(champion).subscribe(() => {
      service.getChampions().subscribe(res => {
        expect(res[138]).toEqual(champion);
      });
    });
  }));
  
  it('should correctly add the champion informations', waitForAsync(() => {
    service.getChampion(1).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.key).toBe('Annie');
      expect(res.name).toBe('Annie');
      expect(res.tags).toBeUndefined();
      expect(res.title).toBe('the Dark Child');
    });
  }));

  it('should correctly add the championss', waitForAsync(() => {
    const champion: IChampion = {
      id: 1,
      key: 'test',
      name: 'test',
      title: 'test',
      tags: undefined,
    };

    service.updateChampion(champion).subscribe(() => {
      service.getChampion(1).subscribe(res => {
        expect(res.id).toBe(1);
        expect(res.key).toBe('test');
        expect(res.name).toBe('test');
        expect(res.tags).toBeUndefined();
        expect(res.title).toBe('test');
      });
    });
  }));
});
