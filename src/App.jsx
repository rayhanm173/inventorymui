import  { useState } from 'react';
import { Container, Button, TextField, Box, Typography, Grid, Snackbar, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ProductTable from './ProductTable';
import ProductChart from './ProductChart';
import ProductModal from './ProductModal';
import './index.css'

const App = () => {
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { control, handleSubmit, getValues, reset } = useForm();

  const onSubmit = (data) => {
    setProducts([...products, { ...data, photos }]);
    setStep(4); // Go to the product table screen
    setPhotos([]);
    reset(); // Reset form fields
    setShowSnackbar(true);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos(prevPhotos => [...prevPhotos, ...files]);
  };

  const handleAddMorePhotos = () => {
    document.getElementById('photo-upload').click(); // Trigger the file input click
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((_, index) => index !== id));
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const getBackgroundColor = () => '#ffffff'; // White for all form screens

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#00274d', padding: '20px', borderRadius:'10px' }}>
      {step === 4 ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="white">Product List</Typography>
            <Box sx={{ backgroundColor: getBackgroundColor(), padding: 2, borderRadius: 1 }}>
              <ProductTable products={products} onView={handleViewProduct} onDelete={handleDeleteProduct} />
            </Box>
            <Box sx={{ backgroundColor: getBackgroundColor(), padding: 2, borderRadius: 1, marginTop: 2 }}>
              <ProductChart products={products} />
            </Box>
            <Button sx={{mt:2}} variant="contained" color="primary" onClick={() => setStep(0)}>Add Another Product</Button>
          </Grid>
          {selectedProduct && <ProductModal open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)} product={selectedProduct} />}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5" gutterBottom color="white">
                {step === 0 && 'Product Details'}
                {step === 1 && 'Inventory Details'}
                {step === 2 && 'Add Photos'}
                {step === 3 && 'Review'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                {['Product Details', 'Inventory Details', 'Add Photos', 'Review'].map((label, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      backgroundColor: step === index ? '#2196f3' : '#e0e0e0',
                      color: step === index ? 'white' : '#000',
                      fontWeight: step === index ? 'bold' : 'normal',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: step === index ? '#1976d2' : '#bdbdbd',
                      },
                      textAlign: 'center',
                      minWidth: '100px',
                    }}
                    onClick={() => setStep(index)}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                backgroundColor: getBackgroundColor(), // White background
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
                paddingBottom: '40px',
                maxWidth: '100%',
              }}
            >
              <Box sx={{ maxWidth: 600, width: '100%' }}>
                {step === 0 && (
                  <form>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Title"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Category"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="regularPrice"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Regular Price"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="extraPrice"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Extra Price"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="taxAmount"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Tax Amount"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Button onClick={() => setStep(1)} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Next
                    </Button>
                  </form>
                )}

                {step === 1 && (
                  <form>
                    <Controller
                      name="weight"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Weight (kg)"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="length"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Length (cm)"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="height"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Height (cm)"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="width"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Width (cm)"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Controller
                      name="totalStock"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Total Stock"
                          type="number"
                          fullWidth
                          margin="normal"
                          size="small"
                          sx={{ marginBottom: 2 }}
                        />
                      )}
                    />
                    <Button onClick={() => setStep(2)} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Next
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Upload Photos</Typography>
                    <input
                      id="photo-upload"
                      accept="image/*"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    {photos.length === 0 ? (
                      <Button onClick={() => document.getElementById('photo-upload').click()} variant="contained" color="primary">
                        Add Image
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button onClick={handleAddMorePhotos} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                          Add Another Image
                        </Button>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: '20px' }}>
                      {photos.map((photo, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(photo)}
                          alt={`preview ${index}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      ))}
                    </Box>
                    <Button onClick={() => setStep(3)} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Next
                    </Button>
                  </Box>
                )}

                {step === 3 && (
                  <Box>
                    <Typography color="black" variant="h6" gutterBottom>Review</Typography>
                    <Typography color="black">Title: {getValues('title')}</Typography>
                    <Typography color="black">Description: {getValues('description')}</Typography>
                    <Typography color="black">Category: {getValues('category')}</Typography>
                    <Typography color="black">Regular Price: {getValues('regularPrice')}</Typography>
                    <Typography color="black">Extra Price: {getValues('extraPrice')}</Typography>
                    <Typography color="black">Tax Amount: {getValues('taxAmount')}</Typography>
                    <Typography color="black">Weight: {getValues('weight')}</Typography>
                    <Typography color="black">Length: {getValues('length')}</Typography>
                    <Typography color="black">Height: {getValues('height')}</Typography>
                    <Typography color="black">Width: {getValues('width')}</Typography>
                    <Typography color="black">Total Stock: {getValues('totalStock')}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: '20px' }}>
                      {photos.map((photo, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(photo)}
                          alt={`review ${index}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      ))}
                    </Box>
                    <Box sx={{marginTop:'20px'}}>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                      Submit
                    </Button>
                    <Button onClick={() => setStep(0)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                      Back
                    </Button></Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Product added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
