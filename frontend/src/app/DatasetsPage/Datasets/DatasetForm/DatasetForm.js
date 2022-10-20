import { TextField } from "../../../../components/TextField";
// import { Metadata } from "../../Datasets/DatasetForm/Metadata";
// import { Metadata } from "../../../../components/Metadata"

export const DatasetForm = () => {
  return (
    <>
      <TextField
        fullWidth
        margin="dense"
        name="datasetName"
        label="Name"
        placeholder="Enter name..."
      />
      <TextField
        required
        fullWidth
        margin="dense"
        name="sourceFolder"
        label="Source folder"
        placeholder="Enter source folder..."
      />
      <TextField
        fullWidth
        margin="dense"
        name="size"
        label="Size"
        placeholder="Enter size..."
      />
      <TextField
        required
        fullWidth
        margin="dense"
        name="creationTime"
        label="Creation Time"
        placeholder="Enter creation time..."
      />

      <TextField
        required
        fullWidth
        margin="dense"
        name="owner"
        label="Owner"
        placeholder="Enter owner..."
      />

      <TextField
        required
        fullWidth
        margin="dense"
        name="contactEmail"
        label="Contact email"
        placeholder="Enter contact email..."
      />

      <TextField
        required
        fullWidth
        margin="dense"
        name="ownerGroup"
        label="Owner group"
        placeholder="Enter owner group..."
      />

      <TextField
        required
        fullWidth
        margin="dense"
        name="type"
        label="Type"
        placeholder="Enter type..."
      />
      <TextField
        fullWidth
        margin="dense"
        name="group"
        label="Group"
        placeholder="Enter group..."
      />
      
      {/* <Metadata/> */}
    </>
  );
};
