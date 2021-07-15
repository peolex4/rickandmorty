import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Character } from './models/character';
import { Characters } from './models/characters';
import { Episode } from './models/episode';
import { Location } from './models/location';
import { RestService } from './services/rest.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

const ERROR_MESSAGE = environment.errors.message;
const ERROR_ACTION = environment.errors.action;

/**
 * @title Rick and Morty Characters
 */
@Component({
  selector: 'characters-root',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  public title = 'Rick and Morty Characters';

  public characters?: Characters;
  public loading = false;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  constructor(
    private restService: RestService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(pageEvent?: PageEvent): void {
    this.loading = true;
    const page = pageEvent ? pageEvent.pageIndex : 0;
    this.restService.getCharacters(page).pipe(take(1)).subscribe((characters: Characters) => {
      const firstEpisodeIds: string[] = this.getFirstEpisodeIds(characters.results);
      const locationsId: string[] = this.getLocationIds(characters.results);
      let getEpisodes = this.restService.getEpisodesInfo(firstEpisodeIds);
      let getLocations = this.restService.getLocationsInfo(locationsId);
      forkJoin([getEpisodes, getLocations]).subscribe((results: any) => {
        const episodes: Episode[] = results[0];
        const locations: Location[] = results[1];
        _.forEach(characters.results, (character: Character) => {
          this.addFirstEpisodeInfoToCharacter(character, episodes);
          this.addLocationsInfoToCharacter(character, locations);
        });
        this.characters = characters;
        this.scrollToTop();
        this.loading = false;
      }, (error) => {
        this.showErrorMessage();
      });
    }, (error) => {
      this.showErrorMessage();
    });
  }

  private getFirstEpisodeIds(characters: Character[]): string[] {
    let firstEpisodeIds: string[] = [];
    _.forEach(characters, (character: Character) => {
      if (character.episode) {
        firstEpisodeIds = _.union(firstEpisodeIds, [character.episode[0].split('episode/')[1]]);
      }
    });
    return firstEpisodeIds;
  }

  private getLocationIds(characters: Character[]): string[] {
    let locationIds: string[] = [];
    _.forEach(characters, (character: Character) => {
      if (character.location && !_.isEmpty(character.location.url)) {
        locationIds = _.union(locationIds, [character.location.url.split('location/')[1]]);
      }
      if (character.origin && !_.isEmpty(character.origin.url)) {
        locationIds = _.union(locationIds, [character.origin.url.split('location/')[1]]);
      }
    });
    return locationIds;
  }

  private addLocationsInfoToCharacter(character: Character, locations: Location[]): void {
    const origin = _.find(locations, (location: Location) => {
      return character.origin.url === location.url;
    });
    if (origin) {
      character.origin.amountOfResidents = origin.residents.length;
      character.origin.dimension = origin.dimension;
    }
    const lastLocation = _.find(locations, (location: Location) => {
      return character.location.url === location.url;
    });
    if (lastLocation) {
      character.location.amountOfResidents = lastLocation.residents.length;
      character.location.dimension = lastLocation.dimension;
    }
  }

  private addFirstEpisodeInfoToCharacter(character: Character, episodes: Episode[]): void {
    const episode = _.find(episodes, (episode: Episode) => {
      return character.episode[0] === episode.url
    });
    if (episode) {
      character.firstSeenIn = episode.name;
    }
  }

  private showErrorMessage(): void {
    this.loading = false;
    this._snackBar.open(ERROR_MESSAGE, ERROR_ACTION);
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}
