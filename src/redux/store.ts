import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ClassesReducer } from "./Class/Classes";
import { OneClassReducer } from "./Class/OneClass";
import { AddClassReducer } from "./Class/AddClass";
import { DoneWorksReducer } from "./DoneWork/DoneWorks";
import { OneDoneWorkReducer } from "./DoneWork/OneDoneWork";
import { AddDoneWorkReducer } from "./DoneWork/AddDoneWork";
import { AuthReducer } from "./Auth";
import { LessonsReducer } from "./Lesson/Lessons";
import { OneLessonReducer } from "./Lesson/OneLesson";
import { AddLessonReducer } from "./Lesson/AddLesson";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	classes: ClassesReducer,
	oneClass: OneClassReducer,
	addClass: AddClassReducer,
	doneWorks: DoneWorksReducer,
	oneDoneWork: OneDoneWorkReducer,
	addDoneWork: AddDoneWorkReducer,
	auth: persistReducer(persistConfig, AuthReducer),
	lessons: LessonsReducer,
	oneLesson: OneLessonReducer,
	addLesson: AddLessonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
	reducer: rootReducer,
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
