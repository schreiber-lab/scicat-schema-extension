import { makeStyles, Container } from "@material-ui/core";
import { DatasetsProvider, List } from "../../../modules/datasets";
import { CreateDatasetButton } from "./CreateDatasetButton";
// import { SearchDatasetBox } from "./SearchDatasetBox";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginTop: spacing(2.5),
  }
}));

export const Datasets = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <DatasetsProvider>
        {/* <SearchDatasetBox /> */}
        <List/>
        <CreateDatasetButton />
      </DatasetsProvider>
    </Container>
  );
};
