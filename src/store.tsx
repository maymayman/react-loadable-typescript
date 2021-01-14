import { createStore } from 'redux';

const initialState = {
    sidebarShow: 'responsive'
};

const changeState = (
    state = initialState,
    { type, ...rest }: { [x: string]: any; type: string }
) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
};

const store = createStore(changeState);

export default store;