import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../State/seller/sellerOrderSlice';

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

const orderStatus = [
  { color: '#FFA500', label: 'PENDING' }, 
  { color: '#F5BCBA', label: 'PLACED' }, 
  { color: '#F5BCBA', label: 'CONFIRMED' },
  { color: '#1E90FF', label: 'SHIPPED' }, 
   { color: '#32CD32', label: 'DELIVERED' }, 
   { color: '#FF0000', label: 'CANCELLED' },

];
const orderStatusColor = {
  PENDING: { color: '#FFA500', label: 'PENDING' }, // Orange
  CONFIRMED:{ color: '#F5BCBA', label: 'CONFIRMED' },
  PLACED:{ color: '#F5BCBA', label: 'PLACED' }, 
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' }, // DodgerBlue
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' }, // LimeGreen
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' } // Red
};

export default function OrderTable() {

  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
  const { sellerOrder } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };


  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleUpdateOrder = (orderId: number, orderStatus: any) => {
    dispatch(updateOrderStatus({
      jwt: localStorage.getItem("jwt") || "",
      orderId,
      orderStatus,
    }));
    handleClose(orderId);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell align="right">Shipping Address</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerOrder.orders.map((item: Order) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="left">{item.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className='flex gap-1 flex-wrap'>
                    {item.orderItems.map((orderItem: OrderItem) =>
                      <div key={orderItem.id} className='flex gap-5'>
                        <img className='w-20 rounded-md' src={orderItem.product.images[0]} alt="" />
                        <div className='flex flex-col justify-between py-2'>
                          <h1>Title: {orderItem.product.title}</h1>
                          <h1>Price: {orderItem.product.sellingPrice}€</h1>
                          <h1>Color: {orderItem.product.color}</h1>
                          <h1>Size: {orderItem.size}</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div className='flex flex-col gap-y-2'>
                    <h1>{item.shippingAddress.name}</h1>
                    <h1>{item.shippingAddress.address}, {item.shippingAddress.city}</h1>
                    <h1>{item.shippingAddress.state} - {item.shippingAddress.pinCode}</h1>
                    <h1><strong>Mobile:</strong> {item.shippingAddress.mobile}</h1>
                  </div>
                </StyledTableCell>
                <StyledTableCell 
                 sx={{color:orderStatusColor[item.orderStatus].color}} 
                 align="center"> <Box sx={{ borderColor: orderStatusColor[item.orderStatus]?.color }} className={`border px-2 py-1 rounded-full text-xs`}>
                  {item.orderStatus}</Box> 
                 </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size='small'
                    onClick={(e) => handleClick(e, item.id)}
                    className='bg-black text-white hover:bg-gray-800'>
                    Status
                  </Button>
                  <Menu
                    id={`status-menu ${item.id}`}
                    anchorEl={anchorEl[item.id]}
                    open={Boolean(anchorEl[item.id])}
                    onClose={() => handleClose(item.id)}
                    MenuListProps={{
                      'aria-labelledby': `status-menu ${item.id}`,
                    }}
                  >
                    {orderStatus.map((status) =>
                      <MenuItem 
                        key={status.label} 
                        onClick={() => handleUpdateOrder(item.id, status.label)}>
                        {status.label}
                      </MenuItem>
                    )}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}