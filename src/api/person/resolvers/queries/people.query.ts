import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';

interface IPerson {
  id: number;
  name: string;
}

const peopleData: IPerson[] = [
  {
    id: 1,
    name: 'Fauricio'
  },
  {
    id: 2,
    name: 'Johnn'
  }
];

const people = (
  parent,
  args,
  context: IContext,
  info: GraphQLResolveInfo
): IPerson[] => {
  return peopleData;
};

export default people;
