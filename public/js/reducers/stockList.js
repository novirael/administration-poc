const initialState = {
    data: [],
    count: 0,
    fetched: false,
    error: null
};

export default function reducer(state=initialState, action) {

    switch (action.type) {
        case "FETCH_STOCK_LIST_REJECTED": {
            return { ...state, error: action.payload.detail }
        }
        case "FETCH_STOCK_LIST_FULFILLED": {
            return {
                ...state,
                fetched: true,
                data: action.payload.results,
                count: action.payload.count
            }
        }
    }
    return state
}