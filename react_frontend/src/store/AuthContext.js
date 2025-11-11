import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { storage } from '../utils/storage';
import { api } from '../api/client';

const AuthStateContext = createContext(undefined);
const AuthDispatchContext = createContext(undefined);

const initialState = {
  user: storage.get('user', null),
  accessToken: storage.get('accessToken', null),
  refreshToken: storage.get('refreshToken', null),
  roles: storage.get('roles', []),
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, ...action.payload };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'LOGOUT':
      return { ...initialState, user: null, accessToken: null, refreshToken: null, roles: [] };
    case 'SET_USER':
      return { ...state, user: action.user, roles: action.roles || state.roles };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and actions to descendants. */
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    storage.set('user', state.user);
    storage.set('accessToken', state.accessToken);
    storage.set('refreshToken', state.refreshToken);
    storage.set('roles', state.roles);
  }, [state.user, state.accessToken, state.refreshToken, state.roles]);

  const actions = useMemo(() => ({
    // PUBLIC_INTERFACE
    async login({ email, password, username }) {
      /** Performs login and stores tokens and user profile using JWT /auth/token/ (client auto-prefixes /api). */
      dispatch({ type: 'LOGIN_START' });
      try {
        // Backend accepts identifier (username or email) + password, or username + password
        const creds = username ? { username, password } : { identifier: email || username, password };
        // Prefer trailing-slash URL to avoid redirect on POST when APPEND_SLASH is True
        const data = await api.post('/auth/token/', creds);
        // SimpleJWT returns { access, refresh }; user profile can be loaded separately
        const payload = {
          user: null,
          accessToken: data.access,
          refreshToken: data.refresh,
          roles: [],
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload });
        // Proactively load profile to populate user and roles, but don't block login resolve
        try {
          const me = await api.get('/auth/me');
          dispatch({ type: 'SET_USER', user: me, roles: me?.roles || [] });
        } catch (_) { /* ignore */ }
        return payload;
      } catch (e) {
        dispatch({ type: 'LOGIN_ERROR', error: e.message || 'Login failed' });
        throw e;
      }
    },
    // PUBLIC_INTERFACE
    async register(body) {
      /** Registers a new user via /auth/register/ (client auto-prefixes /api). */
      return api.post('/auth/register/', body);
    },
    // PUBLIC_INTERFACE
    async forgotPassword(email) {
      /** Initiates forgot password flow. */
      return api.post('/auth/forgot', { email });
    },
    // PUBLIC_INTERFACE
    async resetPassword(token, password) {
      /** Completes reset password flow. */
      return api.post('/auth/reset', { token, password });
    },
    // PUBLIC_INTERFACE
    async loadProfile() {
      /** Loads current user profile if authenticated. */
      try {
        const me = await api.get('/auth/me');
        dispatch({ type: 'SET_USER', user: me, roles: me?.roles || [] });
        return me;
      } catch {
        return null;
      }
    },
    // PUBLIC_INTERFACE
    logout() {
      /** Clears local session. */
      storage.clearAll();
      dispatch({ type: 'LOGOUT' });
    },
  }), []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={actions}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Returns auth state and actions. */
  const state = useContext(AuthStateContext);
  const actions = useContext(AuthDispatchContext);
  if (!state || !actions) throw new Error('useAuth must be used within AuthProvider');
  return { state, actions };
}

// PUBLIC_INTERFACE
export function hasRole(state, required) {
  /** Checks whether user has any of the required roles. */
  if (!required) return true;
  const roles = state.roles || [];
  if (Array.isArray(required)) return roles.some((r) => required.includes(r));
  return roles.includes(required);
}
