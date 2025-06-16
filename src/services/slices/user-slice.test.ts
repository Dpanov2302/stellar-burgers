import {
  userReducer,
  clearPasswordReset,
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  requestPasswordReset,
  resetPassword,
  userInitialState
} from './user-slice';
import type { TUser } from '../../utils/types';

describe('userSlice reducer', () => {
  const initialState = userInitialState;

  it('возвращает initial state при неизвестном экшене', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('registerUser.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, { type: registerUser.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('registerUser.fulfilled сохраняет пользователя и сбрасывает loading', () => {
    const mockUser: TUser = { email: 'a@b.com', name: 'Test' };
    const payload = { user: mockUser, accessToken: 'a', refreshToken: 'r' };
    const next = userReducer(
      { ...initialState, loading: true },
      { type: registerUser.fulfilled.type, payload }
    );
    expect(next.loading).toBe(false);
    expect(next.user).toEqual(mockUser);
  });
  it('registerUser.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Reg error';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: registerUser.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  // loginUser
  it('loginUser.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, { type: loginUser.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('loginUser.fulfilled сохраняет пользователя и сбрасывает loading', () => {
    const mockUser: TUser = { email: 'x@y.com', name: 'User' };
    const payload = { user: mockUser, accessToken: 't', refreshToken: 'u' };
    const next = userReducer(
      { ...initialState, loading: true },
      { type: loginUser.fulfilled.type, payload }
    );
    expect(next.loading).toBe(false);
    expect(next.user).toEqual(mockUser);
  });
  it('loginUser.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Login failed';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: loginUser.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('logoutUser.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, { type: logoutUser.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('logoutUser.fulfilled очищает пользователя и сбрасывает loading', () => {
    const prevState = { ...initialState, user: { email: 'u@e', name: 'U' } };
    const next = userReducer(
      { ...prevState, loading: true },
      { type: logoutUser.fulfilled.type }
    );
    expect(next.loading).toBe(false);
    expect(next.user).toBeNull();
  });
  it('logoutUser.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Logout error';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: logoutUser.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('fetchUser.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, { type: fetchUser.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('fetchUser.fulfilled сохраняет пользователя и сбрасывает loading', () => {
    const mockUser: TUser = { email: 'f@e', name: 'Fetch' };
    const next = userReducer(
      { ...initialState, loading: true },
      { type: fetchUser.fulfilled.type, payload: mockUser }
    );
    expect(next.loading).toBe(false);
    expect(next.user).toEqual(mockUser);
  });
  it('fetchUser.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Fetch failed';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: fetchUser.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('updateUser.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, { type: updateUser.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('updateUser.fulfilled обновляет пользователя и сбрасывает loading', () => {
    const mockUser: TUser = { email: 'u@u', name: 'Updated' };
    const next = userReducer(
      { ...initialState, loading: true },
      { type: updateUser.fulfilled.type, payload: mockUser }
    );
    expect(next.loading).toBe(false);
    expect(next.user).toEqual(mockUser);
  });
  it('updateUser.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Update failed';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: updateUser.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('requestPasswordReset.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, {
      type: requestPasswordReset.pending.type
    });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('requestPasswordReset.fulfilled устанавливает passwordResetRequested=true и сбрасывает loading', () => {
    const next = userReducer(
      { ...initialState, loading: true },
      { type: requestPasswordReset.fulfilled.type }
    );
    expect(next.loading).toBe(false);
    expect(next.passwordResetRequested).toBe(true);
  });
  it('requestPasswordReset.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Request failed';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: requestPasswordReset.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('resetPassword.pending устанавливает loading=true и сбрасывает error', () => {
    const next = userReducer(initialState, {
      type: resetPassword.pending.type
    });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
  it('resetPassword.fulfilled устанавливает passwordResetRequested=false и сбрасывает loading', () => {
    const prevState = {
      ...initialState,
      loading: true,
      passwordResetRequested: true
    };
    const next = userReducer(prevState, { type: resetPassword.fulfilled.type });
    expect(next.loading).toBe(false);
    expect(next.passwordResetRequested).toBe(false);
  });
  it('resetPassword.rejected сохраняет error и сбрасывает loading', () => {
    const error = 'Reset failed';
    const next = userReducer(
      { ...initialState, loading: true },
      { type: resetPassword.rejected.type, payload: error }
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('clearPasswordReset сбрасывает passwordResetRequested в false', () => {
    const prevState = { ...initialState, passwordResetRequested: true };
    const next = userReducer(prevState, clearPasswordReset());
    expect(next.passwordResetRequested).toBe(false);
  });
});
