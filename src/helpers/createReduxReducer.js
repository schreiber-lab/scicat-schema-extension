export const createReduxReducer = (initialState, handlers) => (state = initialState, { type, payload }) => {
    if (handlers.hasOwnProperty(type)) {
        return handlers[type](state, payload);
    }

    return state;
};
