import { useContext } from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { stopPropagation } from "../../../../helpers/stopPropagation";
import { useModal } from "../../../../components";
import { InstrumentsContext } from "../../../../modules/instruments/InstrumentsProvider";
import { EditInstrumentModal } from "./EditInstrumentModal";
import { DeleteInstrumentModal } from "./DeleteInstrumentModal";

export const RowWithContext = ({ instrument, ...props }) => {
  const { openModal } = useModal();
  const { editInstrument, deleteInstrument } = useContext(InstrumentsContext);

  const openEditModal = () => {
    openModal(EditInstrumentModal, {
      payload: {
        instrument,
      },
      onModalResolved: (instrument) => {
        editInstrument(instrument);
      },
    });
  };

  const openDeleteModal = () => {
    openModal(DeleteInstrumentModal, {
      payload: {
        instrument,
      },
      onModalResolved: (instrument) => {
        deleteInstrument(instrument);
      },
    });
  };
  
  return (
    <TableRow {...props}>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {instrument.name}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <IconButton onClick={stopPropagation(openEditModal)}>
          <EditOutlinedIcon />
        </IconButton>
     
        <IconButton onClick={stopPropagation(openDeleteModal)}>
        <DeleteOutlineOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
