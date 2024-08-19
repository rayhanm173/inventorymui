import { Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, onView, onDelete }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'title', headerName: 'Product Title', width: 200 },
    { field: 'description', headerName: 'Details', width: 300 },
    {
      field: 'status',
      headerName: 'Status',
      display:'flex',
      width: 150,
      renderCell: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'green', marginRight: 1 }} />
          <Typography variant="body2" color="green">In Stock</Typography>
        </Box>
      ),
    },
    { field: 'regularPrice', headerName: 'Regular Price', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      display:'flex',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onView(params.row)}
            sx={{ marginRight: 1 }}
          >
            VIEW
          </Button>
          <IconButton
            color="error"
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', mb: 2 }}>
      <DataGrid
        rows={products.map((p, index) => ({ id: index, ...p }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    </Box>
  );
};

export default ProductTable;
