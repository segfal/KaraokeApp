import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./root-reducer";

const logger = createLogger({ collapsed: true });

const middleWare = composeWithDevTools(
  applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), logger)
);

const store = createStore(rootReducer, middleWare);

export default store;