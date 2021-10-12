import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from './userReducer.js';
import {admReducer} from './admReducer.js';
import {docsReducer} from './docsReducer.js'

const rootReducer = combineReducers({
    userReducer,
    docsReducer,
    admReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));