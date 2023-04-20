export const styles = ({ palette }) => ({
  root: ({ color, background }) =>
    palette[color]
      ? {
          color: palette[color].main,
        }
      : {},
});
