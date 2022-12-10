import {
  configureStore,
  ThunkAction,
  Action,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import ReactotronConfig from '@config/reactotronConfig';
import characterSlice from '@redux/characterSlice';

const enhancers: StoreEnhancer[] = [];
if (ReactotronConfig.createEnhancer) {
  enhancers.push(ReactotronConfig.createEnhancer());
}

export const store = configureStore({
  reducer: {
    characters: characterSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  enhancers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
