import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type TIngredientCardUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
