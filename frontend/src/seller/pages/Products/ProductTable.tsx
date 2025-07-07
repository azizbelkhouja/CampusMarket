import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerProducts, updateProductStock } from '../../../State/seller/sellerProductSlice';
import type { Product } from '../../../types/productTypes';
import { useNavigate } from 'react-router-dom';

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

export default function ProductTable() {

  const dispatch = useAppDispatch();
  const {sellerProduct} = useAppSelector(store=>store);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")))
  }, [dispatch])

  const handleUpdateStack = (id: number | undefined)=>() => {
    dispatch(updateProductStock(id))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image(s)</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Original Price</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Stock Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products.map((item:Product) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                <div className="flex gap-1 flex-wrap">
                  {item.images.map((image, index)=><img key={index} src={image} alt="" className='w-20 rounded-md' />)}
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{item.title}</StyledTableCell>
              <StyledTableCell align="right">{item.mrpPrice}</StyledTableCell>
              <StyledTableCell align="right">{item.sellingPrice}</StyledTableCell>
              <StyledTableCell align="right">{item.color}</StyledTableCell>
              <StyledTableCell align="right">{
                <Button onClick={handleUpdateStack(item.id)} size='small'>{item.in_stock?"in_stock":"out_stock"}</Button>
              }</StyledTableCell>
              <StyledTableCell align="right">{
                <IconButton onClick={(()=>navigate("/seller/update-product/"+item.id))} size='small' sx={{backgroundColor:"white",color:"black", border:"1px solid black"}}>
                  <Edit/>
              </IconButton>
              }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

