import T from "prop-types";
import cn from "classnames";
import {
  makeStyles,
  TablePagination as MuiTablePagination,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { TablePaginationActions } from "./TablePaginationActions";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    borderTop: ({ borderTop }) =>
      borderTop ? `1px solid ${palette.divider}` : null,
  },

  disableCaption: {
    "&:first-of-type": {
      display: "none",
    },
  },

  disableSelectRoot: {
    display: "none",
  },
}));

const propTypes = {
  borderTop: T.bool,
  disablePerPage: T.bool,
};

export const TablePagination = ({
  borderTop,
  disablePerPage,
  component = "div",
  className,
  pagination: { total = 0, skip, limit },
  onChange,

  ...props
}) => {
  const classes = useStyles({ borderTop });
  const theme = useTheme();
  const isMobileSM = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.mobileSm)
  );
  const paginationProps = isMobileSM ? { labelRowsPerPage: "" } : {};
  const page = (skip + limit) / limit;

  const handlePageChange = (event, page) => {
    onChange({ skip: page < 0 ? 0 : page * limit });
  };

  const handleRowsPerPageChange = (event) => {
    onChange({ limit: +event.target.value });
  };

  return (
    <MuiTablePagination
      component={component}
      rowsPerPageOptions={[5, 10, 15, 30]}
      count={total}
      rowsPerPage={limit}
      page={page - 1}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handleRowsPerPageChange}
      ActionsComponent={TablePaginationActions}
      className={cn(classes.root, className)}
      classes={{
        caption: disablePerPage && classes.disableCaption,
        selectRoot: disablePerPage && classes.disableSelectRoot,
      }}
      {...paginationProps}
      {...props}
    />
  );
};

TablePagination.propTypes = propTypes;
