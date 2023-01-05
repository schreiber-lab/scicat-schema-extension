import { useContext } from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { stopPropagation } from "../../../../helpers/stopPropagation";
import { useModal } from "../../../../components";
import { SamplesContext } from "../../../../modules/samples/SamplesProvider";
import { EditSampleModal } from "./EditSampleModal";

export const RowWithContext = ({ sample, ...props }) => {
  const { openModal } = useModal();
  const { editSample } = useContext(SamplesContext);

  const openEditModal = () => {
    openModal(EditSampleModal, {
      payload: {
        sample,
      },
      onModalResolved: (sample) => {
        editSample(sample);
      },
    });
  };

  return (
    <TableRow {...props}>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {sample.sampleId}
        </Typography>
      </TableCell>

      <TableCell
        align="right"
        style={{ wordWrap: "break-word", maxWidth: 200 }}
      >
        {sample.description}
      </TableCell>

      <TableCell align="right">
        <Typography color="primary" variant="subtitle2">
          {sample.owner}
        </Typography>
      </TableCell>

      <TableCell align="right">{sample.creationTime}</TableCell>

      <TableCell align="right">{sample.ownerGroup}</TableCell>

      <TableCell align="right">
        <IconButton onClick={stopPropagation(openEditModal)}>
          <EditOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
