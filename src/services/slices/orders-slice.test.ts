import {
  ordersReducer,
  clearCurrentOrder,
  ordersInitialState
} from './orders-slice';
import { fetchOrders, createOrder, fetchOrderByNumber } from './orders-slice';
import type { TOrder } from '../../utils/types';

describe('ordersSlice reducer', () => {
  const initialState = ordersInitialState;

  it('возвращает initial state при неизвестном экшене', () => {
    const next = ordersReducer(undefined, { type: 'unknown' });
    expect(next).toEqual(initialState);
  });

  it('обрабатывает fetchOrders.pending', () => {
    const next = ordersReducer(initialState, {
      type: fetchOrders.pending.type
    });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.orders).toEqual([]);
  });

  it('обрабатывает fetchOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Order1',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['ing1']
      }
    ];
    const next = ordersReducer(
      { ...initialState, loading: true },
      { type: fetchOrders.fulfilled.type, payload: mockOrders }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.orders).toEqual(mockOrders);
  });

  it('обрабатывает fetchOrders.rejected', () => {
    const error = 'Error fetching';
    const next = ordersReducer(
      { ...initialState, loading: true },
      { type: fetchOrders.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
    expect(next.orders).toEqual([]);
  });

  it('обрабатывает createOrder.pending', () => {
    const next = ordersReducer(initialState, {
      type: createOrder.pending.type
    });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('обрабатывает createOrder.fulfilled', () => {
    const newOrder: TOrder = {
      _id: '2',
      status: 'pending',
      name: 'Order2',
      createdAt: '',
      updatedAt: '',
      number: 2,
      ingredients: ['ing2']
    };
    const stateBefore = { ...initialState, orders: [], loading: true };
    const next = ordersReducer(stateBefore, {
      type: createOrder.fulfilled.type,
      payload: { order: newOrder, name: 'ignored' }
    });
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.currentOrder).toEqual(newOrder);
    expect(next.orders).toEqual([newOrder]);
  });

  it('обрабатывает createOrder.rejected', () => {
    const error = 'Error creating';
    const next = ordersReducer(
      { ...initialState, loading: true },
      { type: createOrder.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('обрабатывает fetchOrderByNumber.pending', () => {
    const next = ordersReducer(initialState, {
      type: fetchOrderByNumber.pending.type
    });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('обрабатывает fetchOrderByNumber.fulfilled', () => {
    const next = ordersReducer(
      {
        ...initialState,
        loading: true,
        currentOrder: {
          _id: 'x',
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 0,
          ingredients: []
        }
      },
      {
        type: fetchOrderByNumber.fulfilled.type,
        payload: [
          {
            _id: 'dummy',
            status: '',
            name: '',
            createdAt: '',
            updatedAt: '',
            number: 3,
            ingredients: []
          }
        ]
      }
    );
    expect(next.loading).toBe(false);
    expect(next.currentOrder).toBeNull();
  });

  it('обрабатывает fetchOrderByNumber.rejected', () => {
    const error = 'Error fetch by number';
    const next = ordersReducer(
      { ...initialState, loading: true },
      { type: fetchOrderByNumber.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('обрабатывает clearCurrentOrder', () => {
    const prevState = {
      ...initialState,
      currentOrder: {
        _id: 'x',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 9,
        ingredients: []
      }
    };
    const next = ordersReducer(prevState, clearCurrentOrder());
    expect(next.currentOrder).toBeNull();
  });
});
