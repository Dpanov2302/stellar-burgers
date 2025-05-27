import { FC, memo } from 'react';
import { BurgerBuilderElementUI } from '@ui';
import { BurgerBuilderElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructor-slice';

export const BurgerBuilderElement: FC<BurgerBuilderElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerBuilderElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
