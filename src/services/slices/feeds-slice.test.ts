import { feedReducer, fetchFeed, feedInitialState } from './feeds-slice';
import type { TOrder } from '../../utils/types';

describe('feedSlice reducer', () => {
  const initialState = feedInitialState;

  it('должен возвращать initial state при неизвестном экшене', () => {
    const next = feedReducer(undefined, { type: 'unknown' });
    expect(next).toEqual(initialState);
  });

  it('обрабатывает fetchFeed.pending', () => {
    const next = feedReducer(initialState, { type: fetchFeed.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.orders).toEqual([]);
    expect(next.total).toBe(0);
    expect(next.totalToday).toBe(0);
  });

  it('обрабатывает fetchFeed.fulfilled', () => {
    const mockPayload = {
      orders: [
        {
          _id: 'order-1',
          status: 'done',
          name: 'Test Order',
          createdAt: '2025-05-28T10:00:00Z',
          updatedAt: '2025-05-28T11:00:00Z',
          number: 1,
          ingredients: ['ing-1', 'ing-2']
        }
      ] as TOrder[],
      total: 10,
      totalToday: 5
    };
    const next = feedReducer(
      { ...initialState, loading: true },
      { type: fetchFeed.fulfilled.type, payload: mockPayload }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.orders).toEqual(mockPayload.orders);
    expect(next.total).toBe(mockPayload.total);
    expect(next.totalToday).toBe(mockPayload.totalToday);
  });

  it('обрабатывает fetchFeed.rejected', () => {
    const errorMessage = 'Network Error';
    const stateDuring = { ...initialState, loading: true };
    const next = feedReducer(stateDuring, {
      type: fetchFeed.rejected.type,
      payload: errorMessage
    });
    expect(next.loading).toBe(false);
    expect(next.error).toBe(errorMessage);
    expect(next.orders).toEqual([]);
    expect(next.total).toBe(0);
    expect(next.totalToday).toBe(0);
  });
});
