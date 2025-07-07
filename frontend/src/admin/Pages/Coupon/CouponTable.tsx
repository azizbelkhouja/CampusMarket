import { DeleteOutline } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteCoupon } from '../../../State/admin/AdminCouponSlice';
import type { Coupon } from '../../../types/couponTypes';

const accountStatus = [
  { status: 'ACTIVE', title: 'Active', description: 'The coupon is valid and can be used for discounts.' },
  { status: 'EXPIRED', title: 'Expired', description: 'The coupon has passed its validity period and can no longer be used.' },
  { status: 'REDEEMED', title: 'Redeemed', description: 'The coupon has already been used and is no longer valid.' },
  { status: 'PENDING_ACTIVATION', title: 'Pending Activation', description: 'The coupon has been issued but is not yet active for use.' },
  { status: 'DISABLED', title: 'Disabled', description: 'The coupon has been manually disabled and cannot be used.' },
  { status: 'INVALID', title: 'Invalid', description: 'The coupon code is incorrect or does not exist.' }
];

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


export default function CouponTable () {
  
    const [status, setStatus] = React.useState(accountStatus[0].status);
    const adminCoupon = useAppSelector(state => state.adminCoupon);

    const dispatch = useAppDispatch();

    const handleDeleteCoupon = (id:number) => {
        dispatch(deleteCoupon({ id, jwt: localStorage.getItem("jwt") || "" }))
    }

    return (
        <>
            <div className='pb-5 w-60'>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Coupon Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Account Status"
                    >
                        {
                            accountStatus.map((item) => (
                                <MenuItem key={item.status} value={item.status}>
                                    {item.title}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

            </div>

            <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Coupon Code</StyledTableCell>
                        <StyledTableCell>Start Date</StyledTableCell>
                        <StyledTableCell align="right">Expiry Date</StyledTableCell>
                        <StyledTableCell align="right">Min Order Value</StyledTableCell>
                        <StyledTableCell align="right">Discount %</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminCoupon.coupons?.map((coupon: Coupon) => (
                        <StyledTableRow key={coupon.id}>
                          <StyledTableCell component="th" scope="row">
                            {coupon.code}
                          </StyledTableCell>
                          <StyledTableCell >{coupon.validityStartDate}</StyledTableCell>
                          <StyledTableCell >{coupon.validityEndDate}</StyledTableCell>
                          <StyledTableCell >{coupon.minimumOrderValue}</StyledTableCell>
                          <StyledTableCell >{coupon.discountPercentage}</StyledTableCell>
                          <StyledTableCell align="right">{coupon.active ? "Active" : "Deactive"}</StyledTableCell>
                          <StyledTableCell align="right">
                            <IconButton onClick={() => handleDeleteCoupon(coupon.id)}>
                                <DeleteOutline className='text-red-700 cursor-pointer' />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        </>
    )
}