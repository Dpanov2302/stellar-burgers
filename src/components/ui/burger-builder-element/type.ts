import { TConstructorIngredient } from '@utils-types';

export type BurgerBuilderElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
};
