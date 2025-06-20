import React, { FC, useMemo } from 'react';
import store, {
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { TConstructorIngredient } from '../../utils/types';
import { BurgerAssemblyUI } from '../ui/burger-assembly';
import {
  createOrder,
  clearCurrentOrder
} from '../../services/slices/orders-slice';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/constructor-slice';

export const BurgerAssembly: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerAssembly);
  const orderRequest = useSelector((state) => state.orders.loading);
  const orderModalData = useSelector((state) => state.orders.currentOrder);
  const user = useSelector((state: RootState) => state.user.user);

  console.log(store.getState());

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    const ids = constructorItems.ingredients.map((item) => item._id);
    const ingredientIds = [
      constructorItems.bun._id,
      ...ids,
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerAssemblyUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
