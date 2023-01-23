export const getTextButtonColorStyle = ({ palette, color }) =>
  palette[color]
    ? {
        color: palette[color].main,

        "&:hover": {
          backgroundColor: fade(
            palette[color].main,
            palette.action.hoverOpacity
          ),
        },
      }
    : {};

export const styles = ({ palette }) => ({
  root: ({ color }) => getTextButtonColorStyle({ palette, color }),

  selected: {
    background: palette.action.selected,
    color: palette.action.active,
  },
});
