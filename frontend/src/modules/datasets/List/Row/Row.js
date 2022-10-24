import { useContext } from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import TouchAppIcon from '@material-ui/icons/TouchApp';
import moment from "moment";
import { env } from "../../../../env";
import { stopPropagation } from "../../../../helpers/stopPropagation";
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
    <TableRow {...props} onClick={handleDatasetClick}>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {dataset.datasetName}
        </Typography>
      </TableCell>

      <TableCell
        align="right"
        style={{ wordWrap: "break-word", maxWidth: 200 }}
        onClick={handleDatasetClick}
      >
        {dataset.sourceFolder}
      </TableCell>

      {/* <TableCell align="right">{dataset.size}</TableCell> */}

      <TableCell align="right">
        <Typography color="primary" variant="subtitle2">
          {moment(dataset.creationTime).format("L")}
        </Typography>
      </TableCell>

      <TableCell align="right">
        {dataset.type}
      </TableCell>

      {/* <TableCell align="right">{dataset.pid}</TableCell> */}

      <TableCell align="right">
        {dataset.ownerGroup}
      </TableCell>

      <TableCell align="right">
        <IconButton onClick={stopPropagation(openEditModal)}>
          <EditOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
