import * as Dataloader from 'dataloader';
import { Country } from '../datasources/typeorm/entities/country.model';

export interface IDataloaders {
  countryLoader: Dataloader<number, Country[]>;
  playerLoader: Dataloader<number, any>;
  personLoader: Dataloader<number, any>;
  personCountryLoader: Dataloader<number, any>;
  playerPositionLoader: Dataloader<number, any>;
  clubLoader: Dataloader<number, any>;
  clubPlayerLoader: Dataloader<number, any>;
}
