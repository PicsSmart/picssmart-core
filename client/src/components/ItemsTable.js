import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemsTable = ({ data, icon, deleteHandler }) => {
  return (
    <TableContainer component={Paper}>
      {data && data.length != 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <span style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    {icon} {row.name}
                  </span>
                </TableCell>
                <TableCell align="left">{row.count} photos</TableCell>
                <TableCell align="left">{row.favouriteCount} favourites</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" onClick={() => deleteHandler(row.id)}>
                    <DeleteIcon
                      style={{
                        color: 'red',
                        fontSize: '1.25rem'
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No results found</div>
      )}
    </TableContainer>
  );
};

export default ItemsTable;
