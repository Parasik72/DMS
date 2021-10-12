const SET_DOCS = 'SET_DOCS';
const CLEAR_DOCS = 'CLEAR_DOCS';
const EDIT_DOCS = 'EDIT_DOCS';
const DELETE_DOC = 'DELETE_DOC';

const defaultState = {
    docs: []
}

export const docsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DOCS:
            return {
                ...state,
                docs: action.payload
            };
        case CLEAR_DOCS: 
            return {
                ...state,
                docs: []
            };
        case EDIT_DOCS:
            return {
                ...state,
                docs: [...state.docs.map(doc => doc._id === action.payload._id
                    ?
                    {...doc,
                        title: action.payload.title,
                        type: action.payload.type,
                        fileName: action.payload.fileName
                    }
                    :
                    {...doc}
                    )]
            }
        case DELETE_DOC:
            return {
                ...state,
                docs: [...state.docs.filter(item => item._id !== action.payload)]
            }
        default:
            return state;
    }
}

export const setDocs = docs => ({type: SET_DOCS, payload: docs});
export const clearDocs = () => ({type: CLEAR_DOCS});
export const editDocs = payload => ({type: EDIT_DOCS, payload});
export const deleteDocAction = id => ({type: DELETE_DOC, payload: id});