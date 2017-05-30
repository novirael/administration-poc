const initialState = {
    id: 0,
    name: "",
    sale_price: 0.00,
    purchase_price: 0.00
};

export default function reducer(state=initialState, action) {

    switch (action.type) {
        case "FETCH_PRODUCT_DETAILS_REJECTED": {
            return { ...state, error: action.payload };
        }
        case "FETCH_PRODUCT_DETAILS_FULFILLED": {
            return { ...state, fetched: true, ...action.payload };
        }
    }

    return state;
}