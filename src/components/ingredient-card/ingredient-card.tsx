import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { IngredientCardUI } from '@ui';
import { TIngredientCardProps } from './type';
import { useDispatch } from 'react-redux';
import { addIngredient, setBun } from '../../services/slices/constructor-slice';

export const IngredientCard: FC<TIngredientCardProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <IngredientCardUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
