import { Grid, MenuItem } from "@material-ui/core";
import { DatePicker, TextField } from "../../../components";
import { Metadata } from "../../../components/Metadata";
import { WarningBox } from "../../../components/WarningBox";
import { KeywordsAutocomplete } from "./KeywordsAutocomplete";
import { TechniquesAutocomplete } from "../../../modules/techniques/AddTechniqueModal/TechniquesAutocomplete/TechniquesAutocomplete";
import { InstrumentsAutocomplete } from "./InstrumentsAutocomplete";
import { SamplesAutocomplete } from "./SamplesAutocomplete";
import { ProposalsAutocomplete } from "./ProposalsAutocomplete";

export const DatasetFormWithSampleAutocomp = () => {
  return (
    <Grid container spacing={3}>
      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          name="datasetName"
          label="Name"
          placeholder="Enter name..."
          InputProps={{
            endAdornment: <WarningBox />,
          }}
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="sourceFolder"
          label="Source folder"
          placeholder="Enter source folder..."
          InputProps={{
            endAdornment: <WarningBox />,
          }}
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <DatePicker
          required
          fullWidth
          name="creationTime"
          label="Creation Time"
          placeholder="Enter creation time..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="owner"
          label="Owner"
          placeholder="Enter owner..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="contactEmail"
          label="Contact email"
          placeholder="Enter contact email..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        {/* <InstrumentsAutocomplete name="instruments" /> */}
        <InstrumentsAutocomplete name="instrumentId" />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          select
          name="type"
          label="Type"
          placeholder="Enter type..."
        >
          <MenuItem value="raw">Raw</MenuItem>
          <MenuItem value="derived">Derived</MenuItem>
        </TextField>
      </Grid>

      <Grid item sm={2} md={4}>
        <KeywordsAutocomplete isCreatable multiple name="keywords" />
      </Grid>

      <Grid item sm={2} md={4}>
        <TechniquesAutocomplete isCreatable multiple name="techniques" />
      </Grid>

      <Grid item sm={2} md={4}>
        <ProposalsAutocomplete name="proposalId" />
      </Grid>

      {/* <Grid item sm={2} md={4}>
        <ProposalsAutocomplete disabled name="proposalId" />
      </Grid> */}

      <Grid item sm={2} md={4}>
        <SamplesAutocomplete name="sampleId" />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="ownerGroup"
          label="Owner group"
          placeholder="Enter owner group..."
        />
      </Grid>

      {/* <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          name="group"
          label="Group"
          placeholder="Enter group..."
        />
      </Grid> */}

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="ownerEmail"
          label="Owner email"
          placeholder="Enter owner email..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="creationLocation"
          label="Creation Location"
          placeholder="Enter creation location..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          name="principalInvestigator"
          label="Principal Investigator"
          placeholder="Enter principal investigator..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          name="description"
          label="Dataset description"
          placeholder="Enter description..."
        />
      </Grid>

      {/* <Grid item sm={2} md={4}>
        <MaterialsAutocomplete name="material_id" />
      </Grid> */}

      <Grid item xs={12}>
        <Metadata
          baseKey="scientificMetadata"
          objectType="dataset"
          title="Metadata"
        />
      </Grid>
    </Grid>
  );
};
