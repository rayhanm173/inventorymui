import { Pie } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ProductChart = ({ products }) => {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.title] = (acc[product.title] || 0) + product.totalStock;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      data: Object.values(categoryCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733'],
    }],
  };

  return (
    <Box sx={{ width: '60%', margin: '20px auto', display: 'flex', justifyContent: 'center', boxSizing:'border-box' }}>
      <Box sx={{display:'flex', gap:'30%', flexDirection:'column'}}>
      <Typography variant="h6" align="center" gutterBottom>Product</Typography>
      <Typography variant="h6" align="center" gutterBottom>Distribution</Typography></Box>
      <Pie data={data} width={200} height={200} options={{ responsive: true, maintainAspectRatio: false }} />
    </Box>
  );
};

export default ProductChart;
