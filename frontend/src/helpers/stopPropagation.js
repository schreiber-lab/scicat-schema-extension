export const stopPropagation = (handler) => (event) => {
  event.stopPropagation();

  handler?.(event);
};
