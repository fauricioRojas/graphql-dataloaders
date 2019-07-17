import * as Dataloader from 'dataloader';
import { IContext } from '../core/context';

export interface IBatchLoaderParams {
  context: IContext;
  id: number;
}

export interface IDataloaders {
  countryLoader: Dataloader<IBatchLoaderParams, any>;
  playerLoader: Dataloader<IBatchLoaderParams, any>;
  personLoader: Dataloader<IBatchLoaderParams, any>;
  clubLoader: Dataloader<IBatchLoaderParams, any>;
  personCountryLoader: Dataloader<IBatchLoaderParams, any>;
  clubPlayerLoader: Dataloader<IBatchLoaderParams, any>;
  playerPositionLoader: Dataloader<IBatchLoaderParams, any>;
  positionPlayerLoader: Dataloader<IBatchLoaderParams, any>;
}
