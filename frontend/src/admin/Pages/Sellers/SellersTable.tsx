import { Button, FormControl, InputLabel, Menu, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellers, updateSellerAccountStatus } from '../../../State/seller/sellerSlice';

const accountStatus = [
    { status: 'PENDING_VERIFICATION', title: 'Pending Verification', description: 'The account has been created but is awaiting verification.' },
    { status: 'ACTIVE', title: 'Active', description: 'The account is active and in good standing.' },
    { status: 'SUSPENDED', title: 'Suspended', description: 'The account has been temporarily suspended, possibly due to policy violations.' },
    { status: 'DEACTIVATED', title: 'Deactivated', description: 'The account has been deactivated, either by user request or administrative action.' },
    { status: 'BANNED', title: 'Banned', description: 'The account has been permanently banned due to severe violations of platform policies.' },
    { status: 'CLOSED', title: 'Closed', description: 'The account has been permanently closed, typically at the user’s request.' }
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

const SellersTable = () => {
    const [selectedAccountStatus, setSelectedAccountStatus] = useState("ACTIVE")
    const  sellers  = useAppSelector(store => store.sellers);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchSellers(selectedAccountStatus))
    }, [selectedAccountStatus, dispatch])

    const handleAccountStatusChange = (event: any) => {
        setSelectedAccountStatus(event.target.value as string);
    }

    const handleUpdateSellerAccountStatus = (id: number, status: string) => {
        dispatch(updateSellerAccountStatus({ id, status }))
    }

    const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, sellerId: any) => {
        setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
    };
    const handleClose = (sellerId: number) => {
        setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
    };



    return (
        <>
            <div className='pb-5 w-60'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedAccountStatus}
                        label="Account Status"
                        onChange={handleAccountStatusChange}
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
                        <StyledTableCell>Seller</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell align="right">Mobile</StyledTableCell>
                        <StyledTableCell align="right">Fiscal Code</StyledTableCell>
                        <StyledTableCell align="right">Displayed Name</StyledTableCell>
                        <StyledTableCell align="right">Account Status</StyledTableCell>
                        <StyledTableCell align="right">Update Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellers.sellers?.map((seller) => (
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {seller.sellerName}
                                </StyledTableCell>
                                <StyledTableCell >{seller.email}</StyledTableCell>
                                <StyledTableCell >{seller.mobile}</StyledTableCell>
                                <StyledTableCell >{seller.cf}</StyledTableCell>
                                <StyledTableCell >{seller.preferredname}</StyledTableCell>
                                <StyledTableCell align="right">{seller.accountStatus}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button id={"basic-button" + seller.id} onClick={(e) => handleClick(e, seller.id)}>Change Status</Button>
                                    <Menu
                                        id={"basic-menu" + seller.id}
                                        anchorEl={anchorEl[seller.id || 1]}
                                        open={Boolean(anchorEl[seller.id || 1])}
                                        onClose={() => handleClose(seller.id || 1)}
                                    >
                                        {accountStatus.map((status) =>
                                            <MenuItem onClick={() => handleUpdateSellerAccountStatus(
                                                seller.id || 1, status.status)} value={status.status}>{status.title}
                                            </MenuItem>)
                                        }
                                    </Menu>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        </>
    )
}

export default SellersTable