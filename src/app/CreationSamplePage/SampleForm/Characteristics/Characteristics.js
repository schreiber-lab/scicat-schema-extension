import { useState, useEffect } from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { getSampleCharacteristicSchema } from "../../../../api/sample-characteristics-schema";
import { Schema } from "./Schema";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    paddingTop: spacing(3),
    paddingBottom: spacing(2),
  }
}));

export const Characteristics = () => {
  const classes = useStyles();
  const [sampleCharacteristicSchema, setSampleCharacteristicSchema] = useState(null);
  console.log(sampleCharacteristicSchema);

  useEffect(() => {
    getSampleCharacteristicSchema().then((sampleCharacteristicSchema) => {
      setSampleCharacteristicSchema(sampleCharacteristicSchema);
    });
  }, []);

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h5">Sample characteristics</Typography>

      {sampleCharacteristicSchema?.map((schema) => (
        <Schema key={schema.schema_name} schema={schema} />
      ))}
    </Container>
  );
};
