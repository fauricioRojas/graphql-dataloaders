import * as Dataloader from 'dataloader';

export interface IDataloaders {
  countryLoader: Dataloader<any, any>;
  playerLoader: Dataloader<any, any>;
  personLoader: Dataloader<any, any>;
  personCountryLoader: Dataloader<any, any>;
  playerPositionLoader: Dataloader<any, any>;
  clubLoader: Dataloader<any, any>;
  clubPlayerLoader: Dataloader<any, any>;
}
