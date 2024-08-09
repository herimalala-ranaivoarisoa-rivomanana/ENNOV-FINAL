import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../features/products/productsSlice';
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../../features/products/productsSelectors';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  CircularProgress, 
  Button, 
  Snackbar, 
  IconButton, 
  TextField, 
  TablePagination,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [products, searchQuery]);

  const handleCreateProduct = () => {
    navigate('/products/create');
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Etes-vous sûr de vouloir supprimer ce produit?");
    if (confirmDelete) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => {
          setSnackbarMessage('Product deleted successfully.');
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage('Error deleting product.');
          setSnackbarOpen(true);
        });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the products to display on the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <Grid container mb={2}>
        <Grid item xs={8}>
          <TextField
            label="Rechercher un produit"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid 
          item 
          xs={4} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-end' 
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProduct}
            sx={{ margin: '10px 0 10px 0' }}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Paper sx={{ padding: 2, textAlign: 'center' }}>
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Paper sx={{ padding: 2, textAlign: 'center', color: 'error.main' }}>
          <Typography variant="body1">Erreur de chargement de données: {error}</Typography>
        </Paper>
      ) : filteredProducts.length === 0 ? (
        <Paper sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="body1">
            {searchQuery ? 'Aucun produit correspondant trouvé.' : 'Aucun produit disponible.'}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
          <Table sx={{ minWidth: 600, width: '100%' }} aria-label="product table">
            <TableHead>
              <TableRow bgcolor="#bdbdbd">
                <TableCell align="center" sx={{ width: '30%' }}>
                  <Typography variant="h6" component="div" color="textPrimary" >
                    Nom
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: '30%' }}>
                  <Typography variant="h6" component="div" color="textPrimary" >
                    Prix
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: '30%' }}>
                  <Typography variant="h6" component="div" color="textPrimary" >
                    Description
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: '10%' }}>
                  <Typography variant="h6" component="div" color="textPrimary" >
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product, index) => (
                <TableRow 
                  key={product.id} 
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    textDecoration: 'none',
                  }}
                >
                  <TableCell align="center">
                    <Typography variant="body1" color="textPrimary">
                      {product.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" color="textPrimary">
                      ${product.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        component={Link} 
                        to={`/products/edit/${product.id}`} 
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {filteredProducts.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ padding: 0.5 }}
              onClick={handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default ProductList;
