import { Box, Tooltip } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";

export const WarningBox = () => {
  return (
    <>
      <Tooltip
        arrow
        title=" If you used a template, you should change this field."
      >
        <Box color="warning.main">
          <ReportIcon color="inherit" />
        </Box>
      </Tooltip>
    </>
  );
};
