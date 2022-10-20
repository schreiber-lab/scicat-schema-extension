export const preventDefault = (handler) => (event) => {
  event.preventDefault();

  handler?.(event);
};
