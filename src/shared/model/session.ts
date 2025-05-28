import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  rootReducer,
  store,
  useAppDispatch,
  useAppSelector,
} from "@/shared/model/redux";
import { jwtDecode } from "jwt-decode";
import { publicFetchClient } from "@/shared/api/instance";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

type SessionState = {
  accessToken: string | null;
};

const initialSessionState: SessionState = {
  accessToken: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState: initialSessionState,
  selectors: {
    selectAccessToken: (state) => state.accessToken,
  },
  reducers: {
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
}).injectInto(rootReducer);

let prefetchSessionPromise: Promise<string | null> | null = null;

export const prefetchSessionAndRefresh = async () => {
  const token = sessionSlice.selectors.selectAccessToken(store.getState());

  if (token) {
    const session = jwtDecode<Session>(token);
    if (!(session.exp < Date.now() / 1000 + 1)) {
      return token;
    }
  }

  if (!prefetchSessionPromise) {
    prefetchSessionPromise = publicFetchClient
      .POST("/auth/refresh")
      .then((res) => res.data?.accessToken ?? null)
      .then((token) => {
        if (token) {
          store.dispatch(
            sessionSlice.actions.setAccessToken({ accessToken: token }),
          );
          return token;
        } else {
          return null;
        }
      })
      .finally(() => {
        prefetchSessionPromise = null;
      });
  }

  const newToken = await prefetchSessionPromise;

  if (newToken) {
    return newToken;
  } else {
    return null;
  }
};

export const useSession = () => {
  const token = useAppSelector(sessionSlice.selectors.selectAccessToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const session = token ? jwtDecode<Session>(token) : null;

  const login = (token: string) => {
    dispatch(sessionSlice.actions.setAccessToken({ accessToken: token }));
    navigate(ROUTES.HOME);
  };

  const logout = async () => {
    await publicFetchClient.POST("/logout");
    dispatch(sessionSlice.actions.logout());
  };

  return { session, login, logout };
};
