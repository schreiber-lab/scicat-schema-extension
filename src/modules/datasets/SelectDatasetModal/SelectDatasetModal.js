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
import { DatasetsProvider } from "../DatasetsProvider";
import { SearchDatasetBox } from "../../../app/DatasetsPage/Datasets/SearchDatasetBox";

export const SelectDatasetModal = ({ DialogProps, handleModalResolve, handleModalReject }) => {
  return (
    <Dialog maxWidth="lg" {...DialogProps}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="h6">Select dataset</Typography>
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
        <DatasetsProvider>
          <SearchDatasetBox />
          <List onDatasetSelect={handleModalResolve} />
        </DatasetsProvider>
      </DialogContent>
    </Dialog>
  );
};
