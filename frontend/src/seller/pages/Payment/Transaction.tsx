import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchTransactionsBySeller } from '../../../State/seller/transactionSlice';
import type { Transaction } from '../../../types/Transaction';
import { redableDateTime } from '../../../util/redableDateTime';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function TransactionTable() {

  const { transaction } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer Details</StyledTableCell>
            <StyledTableCell align="right">Order</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {transaction.transactions.map((item: Transaction) => (
              <TableRow key={item.id}>
                <TableCell align="left"><div className='space-y-1'>
                  <h1 className='font-medium'>{redableDateTime(item.date).split("at")[0]}</h1>
                  <h1 className='text-xs text-gray-600 font-semibold'>{redableDateTime(item.date).split("at")[1]}</h1>
                  </div></TableCell>
                <TableCell component="th" scope="row">
                  <div className='space-y-2'>
                    <h1>{item.customer.fullName}</h1>
                    <h1 className='font-semibold'>{item.customer.email}</h1>
                    <h1 className='font-bold text-gray-600'>{item.customer.mobile}</h1>
                  </div>
                </TableCell>
                <TableCell>
                  Order Id : <strong> {item.order.id} </strong>
                </TableCell>
                <TableCell
                  align="right">
                  {item.order.totalSellingPrice}€
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}