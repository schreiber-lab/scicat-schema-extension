import { Fragment } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Grid, Button, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "../../IconButton";
import { Entry } from "./Entry";


export const MultipleEntries = ({ isVisible, schema, baseKey }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${baseKey}.${schema.schema_name}`,
  });

  const addEntry = () => {
    append({ isActive: true });
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addEntry}
        >
          Add entry
        </Button>
      </Grid>

      {fields.map((field, index) => (
        <Grid
          item
          container
          spacing={2}
          alignItems="center"
          key={field.id}
        >
          <Grid item>
            <Typography>{index + 1}.</Typography>
          </Grid>
          
          <Grid item xs>
            <Grid container spacing={2}>
              <Entry
                isVisible={isVisible}
                schema={schema}
                baseKey={baseKey}
                index={index}
              />
            </Grid>
          </Grid>

          <Grid item>
            <IconButton onClick={() => {
            console.log(index, field)
            remove(index)}
            }
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
