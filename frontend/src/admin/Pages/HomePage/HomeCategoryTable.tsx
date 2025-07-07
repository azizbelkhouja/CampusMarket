import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import type { HomeCategory } from '../../../types/homeDataTypes';

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

export default function HomeCategoryTable({categories}:{categories:HomeCategory[] | undefined}) {

  const [selectedCategory, setSelectedCategory] = React.useState<HomeCategory>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (category: HomeCategory | undefined) => () => {
    setSelectedCategory(category);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map(
              (category: HomeCategory, index) => (
                <StyledTableRow key={category.categoryId}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {category.id}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <img
                      className="w-20 rounded-md"
                      src={category.image}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right" component="th" scope="row">
                    {category.categoryId}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton onClick={handleOpen(category)}>
                      <Edit className="text-orange-400 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}