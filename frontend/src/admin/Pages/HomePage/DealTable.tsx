import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Modal, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UpdateDealForm from './UpdateDealForm';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteDeal, getAllDeals } from '../../../State/admin/DealSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const DealTable = () => {

  const deal = useAppSelector(store => store.deal);
  const [selectedDealId, setSelectedDealId] = useState<number>();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = (id: number | undefined) => () => {
    setSelectedDealId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = (id: any) => () => {
    dispatch(deleteDeal(id))
  }
  useEffect(() => {
    dispatch(getAllDeals())
  }, [dispatch])
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deal.deals.map(
              (deal: any, index) => (
                <StyledTableRow key={deal.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <img
                      className="w-20 rounded-md"
                      src={deal.category.image}
                      alt=""
                    />
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {deal.category.categoryId}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {deal.discount}%
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton onClick={handleOpen(deal.id)}>
                      <Edit className="text-orange-400 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={handleDelete(deal.id)}>
                      <Delete className="text-red-600 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedDealId && <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateDealForm id={selectedDealId} />
        </Box>
      </Modal>}
    </>
  )
}

export default DealTable