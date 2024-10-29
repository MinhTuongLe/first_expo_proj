/**
 * Created by dang.le from 04/09/2018
 */
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware();
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(epicMiddleware, loggerMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;