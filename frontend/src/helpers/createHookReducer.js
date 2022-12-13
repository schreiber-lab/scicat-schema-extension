export const createHookReducer =
  (handlers) =>
  (state, { type, payload }) => {
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, payload);
    }

    return state;
  };
