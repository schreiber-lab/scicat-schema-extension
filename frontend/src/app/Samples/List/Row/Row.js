import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Grid,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { DeleteModal } from "../../../../components/DeleteModal";
import * as samplesApi from "../../../../api/samples";
import { deleteSample } from "../../../../redux/samples/actions";
import { EditModal } from "./EditModal";

export const Row = ({ sample }) => {
  const [ open, setOpen ] = useState(false);
  const [ isOpenEdit, setIsOpenEdit ] = useState(false);
  const dispatch = useDispatch();

  const openDeleteModal = () => {
    setOpen(true);
  };

  const openEditModal = () => {
    setIsOpenEdit(true);
  };

  const handleDeleteModalClose = () => {
    setOpen(false);
  };

  const handleEditModalClose = () => {
    setIsOpenEdit(false);
  };

  const handleSampleDelete = () => {
    samplesApi
      .deleteSample(sample.sampleId)
      .then(() => {
        dispatch(deleteSample(sample));
      })
      .catch(() => {});
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {sample.sampleId}
        </Typography>
      </TableCell>

      <TableCell align="right">{sample.description}</TableCell>
      <TableCell align="right">{sample.owner}</TableCell>

      <TableCell align="right">
        <Typography color="primary" variant="subtitle2">
          {sample.creationTime}
        </Typography>
      </TableCell>

      <TableCell align="right">{sample.ownerGroup}</TableCell>

      <TableCell align="right">
        <Grid container wrap="nowrap">
          <Grid item>
            <IconButton onClick={openEditModal}>
              <EditOutlinedIcon />
            </IconButton>

            <EditModal isOpen={isOpenEdit} sample={sample} onClose={handleEditModalClose} />
          </Grid>

          <Grid item>
            <IconButton edge="end" onClick={openDeleteModal}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>

            <DeleteModal
              isOpen={open}
              onClose={handleDeleteModalClose}
              onResolve={handleSampleDelete}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};
