import { createStore } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import RootReducer from "./reducer/index";

export * from "./actions";

export const store = createStore(RootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

