import {
  ingredientsReducer,
  fetchIngredients,
  ingredientsInitialState
} from './ingredients-slice';
import type { TIngredient } from '../../utils/types';

describe('ingredientsSlice reducer', () => {
  const initialState = ingredientsInitialState;

  it('возвращает initial state при неизвестном экшене', () => {
    const next = ingredientsReducer(undefined, { type: 'unknown' });
    expect(next).toEqual(initialState);
  });

  it('обрабатывает fetchIngredients.pending', () => {
    const next = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.items).toEqual([]);
  });

  it('обрабатывает fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: 'ing-1',
        name: 'Test Ingredient',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 10,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];
    const next = ingredientsReducer(
      { ...initialState, loading: true },
      { type: fetchIngredients.fulfilled.type, payload: mockIngredients }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.items).toEqual(mockIngredients);
  });

  it('обрабатывает fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to load';
    const stateDuring = { ...initialState, loading: true };
    const next = ingredientsReducer(stateDuring, {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    });
    expect(next.loading).toBe(false);
    expect(next.error).toBe(errorMessage);
    expect(next.items).toEqual([]);
  });
});
