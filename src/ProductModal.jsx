import { Box, Typography, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProductModal = ({ open, onClose, product }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ width: '90%', maxWidth: 600, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>Product Details</Typography>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="body1" gutterBottom>Title: {product.title}</Typography>
      <Typography variant="body1" gutterBottom>Description: {product.description}</Typography>
      <Typography variant="body1" gutterBottom>Category: {product.category}</Typography>
      <Typography variant="body1" gutterBottom>Regular Price: ${product.regularPrice}</Typography>
      <Typography variant="body1" gutterBottom>Extra Price: ${product.extraPrice}</Typography>
      <Typography variant="body1" gutterBottom>Tax Amount: ${product.taxAmount}</Typography>
      <Typography variant="body1" gutterBottom>Weight: {product.weight} kg</Typography>
      <Typography variant="body1" gutterBottom>Dimensions: {product.length} x {product.height} x {product.width} cm</Typography>
      <Typography variant="body1" gutterBottom>Total Stock: {product.totalStock}</Typography>
      <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
        {product.photos && product.photos.map((photo, index) => (
          <img key={index} src={URL.createObjectURL(photo)} alt="preview" style={{ width: 100, height: 100, margin: 10, objectFit: 'cover', borderRadius: 4 }} />
        ))}
      </Box>
    </Box>
  </Modal>
);

export default ProductModal;
