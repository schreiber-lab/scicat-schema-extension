import { List } from "../List";
import {
  Dialog,
  DialogContent,
  AppBar,
  Typography,
  IconButton,
  Grid,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { SamplesProvider } from "../SamplesProvider";
import { SearchSampleBox } from "../../../app/Samples/SearchSampleBox";

export const SelectSampleModal = ({ DialogProps, handleModalResolve, handleModalReject }) => {
  return (
    <Dialog maxWidth="lg" {...DialogProps}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="h6">Select sample</Typography>
            </Grid>

            <Grid item>
              <IconButton edge="end" color="inherit" onClick={handleModalReject}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <SamplesProvider>
          <SearchSampleBox />
          <List onSampleSelect={handleModalResolve} />
        </SamplesProvider>
      </DialogContent>
    </Dialog>
  );
};
