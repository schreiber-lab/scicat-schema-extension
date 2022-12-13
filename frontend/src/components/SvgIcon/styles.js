export const styles = ({ palette }) => ({
  root: ({ color }) =>
    palette[color]
      ? {
          color: palette[color].main,
        }
      : {},
});
