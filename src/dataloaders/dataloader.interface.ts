import * as Dataloader from 'dataloader';

export interface IDataloaders {
  countryLoader: Dataloader<any, any>;
  playerLoader: Dataloader<any, any>;
  personLoader: Dataloader<any, any>;
}
