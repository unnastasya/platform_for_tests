import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ClassesReducer } from "./Classes";
import { OneClassReducer } from "./OneClass";
import { AddClassReducer } from "./AddClass";
import { DoneWorksReducer } from "./DoneWorks";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	classes: ClassesReducer,
	oneClass: OneClassReducer,
    addClass : AddClassReducer,
    doneWorks : DoneWorksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: middlewares,
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor, sagaMiddleware };

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
	useSelector;
