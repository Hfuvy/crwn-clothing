import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from './root-reducer';

const middlewares = [logger];

// Créer le store Redux avec les middlewares appliqués
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
