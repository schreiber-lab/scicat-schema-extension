import { Grid } from "@material-ui/core";
import { Row } from "../Row";

export const Entry = ({ schema, baseKey, index, isVisible }) => {
  return schema.keys?.map((field) => {
    return (
      <Grid item key={field.key_name} xs={4}>
        <Row isVisible={isVisible} field={field} schema={schema} baseKey={baseKey} index={index} />
      </Grid>
    );
  });
};
