import { rootReducer } from './root-reducer';
import { ingredientsReducer } from './slices/ingredients-slice';
import { feedReducer } from './slices/feeds-slice';
import { ordersReducer } from './slices/orders-slice';
import { userReducer } from './slices/user-slice';
import { constructorReducer } from './slices/constructor-slice';

describe('rootReducer', () => {
  it('возвращает initial state каждого слайса при неизвестном экшене', () => {
    // Получаем глобальный стейт
    const globalState = rootReducer(undefined, { type: '' });

    // Сравниваем кусок стейта ingredients
    expect(globalState.ingredients).toEqual(
      ingredientsReducer(undefined, { type: '' })
    );

    // Сравниваем кусок стейта feed
    expect(globalState.feed).toEqual(feedReducer(undefined, { type: '' }));

    // Сравниваем кусок стейта orders
    expect(globalState.orders).toEqual(ordersReducer(undefined, { type: '' }));

    // Сравниваем кусок стейта user
    expect(globalState.user).toEqual(userReducer(undefined, { type: '' }));

    // Сравниваем кусок стейта burgerAssembly
    expect(globalState.burgerAssembly).toEqual(
      constructorReducer(undefined, { type: '' })
    );
  });
});
