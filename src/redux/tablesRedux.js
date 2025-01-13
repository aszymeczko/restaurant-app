// selectors
import { API_URL } from "../config";

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchTablesRequest());
    fetch(`${API_URL}/tables`)
      .then((response) => response.json())
      .then((tables) => {
        dispatch(fetchTablesSuccess(tables));
      })
      .catch((error) => {
        dispatch(fetchTablesFailure(error.message));
      });
  };
};

export const updateTable = (payload) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return fetch(`${API_URL}/tables/${payload.id}`, options)
      .then((response) => response.json())
      .then((updated) => {
        dispatch(patchTablesRequest(updated));
      })
      .catch((error) => {
        dispatch(fetchTablesFailure(error.message));
      });
  };
};

export const addTable = (payload) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return fetch(`${API_URL}/tables`, options)
      .then((response) => response.json())
      .then((added) => {
        dispatch(addTableRequest(added));
      })
      .catch((error) => {
        dispatch(fetchTablesFailure(error.message));
      });
  };
};

export const removeTable = (tableId) => {
  return (dispatch) => {
    // dispatch(patchTablesRequest());
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${API_URL}/tables/${tableId}`, options)
      .then((response) => response.json)
      .then((added) => {
        dispatch(removeTableRequest(tableId));
      })
      .catch((error) => {
        dispatch(fetchTablesFailure(error.message));
      });
  };
};

const createActionName = (actionName) => `app/tables/${actionName}`;

const FETCH_TABLES_REQUEST = createActionName("FETCH_TABLES_REQUEST");
const FETCH_TABLES_SUCCESS = createActionName("FETCH_TABLES_SUCCESS");
const FETCH_TABLES_FAILURE = createActionName("FETCH_TABLES_FAILURE");

const PATCH_TABLES_REQUEST = createActionName("PATCH_TABLES_REQUEST");

const ADD_TABLE_REQUEST = createActionName("ADD_TABLE_REQUEST");

const REMOVE_TABLE_REQUEST = createActionName("REMOVE_TABLE_REQUEST");

//actions
export const fetchTablesRequest = () => ({
  type: FETCH_TABLES_REQUEST,
});

export const fetchTablesSuccess = (tables) => ({
  type: FETCH_TABLES_SUCCESS,
  payload: tables,
});

export const fetchTablesFailure = (error) => ({
  type: FETCH_TABLES_FAILURE,
  payload: error,
});

export const patchTablesRequest = (payload) => ({
  type: PATCH_TABLES_REQUEST,
  payload: payload,
});

export const addTableRequest = (payload) => ({
  type: ADD_TABLE_REQUEST,
  payload: payload,
});

export const removeTableRequest = (payload) => ({
  type: REMOVE_TABLE_REQUEST,
  payload: payload,
});

// //reducer
const initialState = {
  loading: false,
  tables: [],
  error: null,
};

const tablesReducer = (partState = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLES_REQUEST:
      return {
        ...partState,
        loading: true,
      };
    case FETCH_TABLES_SUCCESS:
      return {
        loading: false,
        tables: action.payload,
        error: null,
      };
    case FETCH_TABLES_FAILURE:
      return {
        loading: false,
        tables: [],
        error: action.payload,
      };
    case PATCH_TABLES_REQUEST:
      return {
        loading: false,
        tables: [
          ...partState.tables.map((table) =>
            table.id === action.payload.id ? action.payload : table,
          ),
        ],
        error: null,
      };
    case ADD_TABLE_REQUEST:
      return {
        loading: false,
        tables: [...partState.tables, action.payload],
        error: null,
      };
    case REMOVE_TABLE_REQUEST:
      return {
        ...partState,
        loading: false,
        tables: partState.tables.filter((table) => table.id !== action.payload),
        error: null,
      };
    default:
      return partState;
  }
};

export default tablesReducer;
