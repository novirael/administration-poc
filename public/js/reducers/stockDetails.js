const initialState = {
    id: 0,
    product: 0,
    quantity: 0
};

export default function reducer(state=initialState, action) {

    switch (action.type) {
        case "FETCH_STOCK_DETAILS_REJECTED": {
            return { ...state, error: action.payload };
        }
        case "FETCH_STOCK_DETAILS_FULFILLED": {
            return { ...state, fetched: true, ...action.payload };
        }
    }

    return state;
}