import { useContext } from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { stopPropagation } from "../../../../helpers/stopPropagation";
import { useModal } from "../../../../components";
import { InstrumentsContext } from "../../../../modules/instruments/InstrumentsProvider";
import { EditInstrumentModal } from "./EditInstrumentModal";

export const RowWithContext = ({ instrument, ...props }) => {
  const { openModal } = useModal();
  const { editInstrument } = useContext(InstrumentsContext);

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
      </TableCell>
    </TableRow>
  );
};
