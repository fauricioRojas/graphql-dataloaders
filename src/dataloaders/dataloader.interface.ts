import * as Dataloader from 'dataloader';

export interface IDataloaders {
  countryLoader: Dataloader<number, any>;
  playerLoader: Dataloader<number, any>;
  personLoader: Dataloader<number, any>;
  clubLoader: Dataloader<number, any>;
  personCountryLoader: Dataloader<number, any>;
  clubPlayerLoader: Dataloader<number, any>;
  playerPositionLoader: Dataloader<number, any>;
  positionPlayerLoader: Dataloader<number, any>;
}
