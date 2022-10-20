import { useContext } from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import TouchAppIcon from '@material-ui/icons/TouchApp';
import moment from "moment";
import { env } from "../../../../env";
import { useModal } from "../../../../components";
import { DatasetsContext } from "../../DatasetsProvider";
import { EditDatasetModal } from "./EditDatasetModal";

export const Row = ({ dataset, onDatasetSelect, ...props }) => {
  const { openModal } = useModal();
  const { editDataset } = useContext(DatasetsContext);

  const openEditModal = () => {
    openModal(EditDatasetModal, {
      payload: {
        dataset,
      },
      onModalResolved: (dataset) => {
        editDataset(dataset);
      },
    });
  };

  const handleDatasetClick = () => {
    if (onDatasetSelect) {
      onDatasetSelect(dataset);

      return;
    }

    window.open(
      `${env.REACT_APP_EXTERNAL_DATASETS_URL}/${encodeURIComponent(
        dataset.pid
      )}`
    );
  };

  return (
    <TableRow {...props}>
      {/* <TableRow> */}
      <TableCell component="th" scope="row" onClick={handleDatasetClick}>
        <Typography color="primary" variant="subtitle2">
          {dataset.datasetName}
        </Typography>
        {/* <IconButton onClick={handleDatasetClick}>
          <TouchAppIcon />
        </IconButton> */}
      </TableCell>
      <TableCell
        align="right"
        style={{ wordWrap: "break-word", maxWidth: 200 }}
        onClick={handleDatasetClick}
      >
        {dataset.sourceFolder}
      </TableCell>
      {/* <TableCell align="right">{dataset.size}</TableCell> */}
      <TableCell align="right" onClick={handleDatasetClick}>
        <Typography color="primary" variant="subtitle2">
          {moment(dataset.creationTime).format("L")}
        </Typography>
      </TableCell>
      <TableCell align="right" onClick={handleDatasetClick}>
        {dataset.type}
      </TableCell>
      {/* <TableCell align="right">{dataset.pid}</TableCell> */}
      <TableCell align="right" onClick={handleDatasetClick}>
        {dataset.ownerGroup}
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={openEditModal}>
          <EditOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
