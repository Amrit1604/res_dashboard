import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Container,
  Switch,
  Button,
  FormControlLabel,
  TextField,
  Snackbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  MenuBook as MenuBookIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const App = () => {
  const sections = [
    { title: 'Dashboard', icon: <DashboardIcon /> },
    { title: 'Orders', icon: <ReceiptIcon /> },
    { title: 'Inventory', icon: <InventoryIcon /> },
    { title: 'Menu', icon: <MenuBookIcon /> },
    { title: 'Analytics', icon: <BarChartIcon /> },
    { title: 'Employees', icon: <PeopleIcon /> },
    { title: 'Chat', icon: <ChatIcon /> },
    { title: 'Settings', icon: <SettingsIcon /> },
  ];

  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [recentOrders, setRecentOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchRecentOrders();
    fetchInventory();
    fetchMenuItems();
    fetchAnalyticsData();
    fetchEmployees();
  }, []);

  const fetchRecentOrders = () => {
    setRecentOrders([
      { id: 1, item: 'Spicy Ramen', customer: 'John Doe', status: 'Pending' },
      { id: 2, item: 'Sushi Platter', customer: 'Jane Smith', status: 'Pending' },
      { id: 3, item: 'Tofu Stir-fry', customer: 'Mike Lee', status: 'Completed' },
    ]);
  };

  const fetchInventory = () => {
    setInventory([
      { id: 1, name: 'Ramen Noodles', quantity: 100, unit: 'packs' },
      { id: 2, name: 'Tofu', quantity: 15, unit: 'blocks' },
      { id: 3, name: 'Soy Sauce', quantity: 200, unit: 'ml' },
    ]);
  };

  const fetchMenuItems = () => {
    setMenuItems([
      { id: 1, name: 'Spicy Ramen', price: 12.99 },
      { id: 2, name: 'Sushi Platter', price: 22.5 },
      { id: 3, name: 'Tofu Stir-fry', price: 10.0 },
    ]);
  };

  const fetchAnalyticsData = () => {
    setAnalyticsData([
      { month: 'Jan', sales: 30 },
      { month: 'Feb', sales: 45 },
      { month: 'Mar', sales: 60 },
      { month: 'Apr', sales: 70 },
      { month: 'May', sales: 90 },
    ]);
  };

  const fetchEmployees = () => {
    setEmployees([
      { id: 1, name: 'Alice Johnson', role: 'Manager' },
      { id: 2, name: ' Bob Brown', role: 'Chef' },
      { id: 3, name: 'Charlie Davis', role: 'Waiter' },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'Admin', text: newMessage }]);
      setNewMessage('');
      setSnackbarMessage('Message sent!');
      setSnackbarOpen(true);
    }
  };

  const handleOrderAction = (id, action) => {
    setRecentOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: action === 'Accept' ? 'Completed' : 'Rejected' } : order
      )
    );
  };

  const handleInventoryChange = (id, newQuantity) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const renderDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ bgcolor: '#212121', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <XAxis dataKey="month" stroke="#fdd835" />
                <YAxis stroke="#fdd835" />
                <Tooltip />
                <CartesianGrid stroke="#555" />
                <Line type="monotone" dataKey="sales" stroke="#fdd835" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: '#212121', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Typography variant="h4">
              ${analyticsData.reduce((acc, curr) => acc + curr.sales, 0)}
            </Typography>
            <Typography color="textSecondary">Total Sales</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderOrders = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Recent Orders
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fdd835' }}>Order ID</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Item</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Customer</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Status</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell sx={{ color: 'white' }}>{order.id}</TableCell>
                <TableCell sx={{ color: 'white' }}>{order.item}</TableCell>
                <TableCell sx={{ color: 'white' }}>{order.customer}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={order.status === 'Completed' ? 'success' : order.status === 'Rejected' ? 'error' : 'warning'} />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => handleOrderAction(order.id, 'Accept')}>
                    Accept
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleOrderAction(order.id, 'Reject')}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderInventory = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Inventory
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fdd835' }}>Item</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id} sx={{ backgroundColor: item.quantity < 20 ? '#ffeb3b' : 'inherit' }}>
                <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInventoryChange(item.id, Number(e.target.value))}
                    style={{ width: '60px', backgroundColor: '#1e1e1e', color: 'white', border: 'none' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{item.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderMenu = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Menu Items
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fdd835' }}>Item</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>${item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderEmployees = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fdd835' }}>ID</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Name</TableCell>
              <TableCell sx={{ color: '#fdd835' }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell sx={{ color: 'white' }}>{employee.id}</TableCell>
                <TableCell sx={{ color: 'white' }}>{employee.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{employee.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderChat = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Admin to Employee Chat
      </Typography>
      <Box>
        {chatMessages.map((message, index) => (
          <Typography key={index} variant="body1">
            <strong>{message.sender}:</strong> {message.text}
          </Typography>
        ))}
      </Box>
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );

  const renderAnalytics = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Analytics
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={analyticsData}>
          <XAxis dataKey="month" stroke="#fdd835" />
          <YAxis stroke="#fdd835" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <CartesianGrid stroke="#555" />
          <Line type="monotone" dataKey="sales" stroke="#fdd835" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
 </Box>
  );

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'Dashboard':
        return renderDashboard();
      case 'Orders':
        return renderOrders();
      case 'Inventory':
        return renderInventory();
      case 'Menu':
        return renderMenu();
      case 'Employees':
        return renderEmployees();
      case 'Chat':
        return renderChat();
      case 'Analytics':
        return renderAnalytics();
      case 'Settings':
        return (
          <Box>
            <Typography variant="h6">Settings</Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
              label="Dark Mode"
            />
          </Box>
        );
      default:
        return <Typography variant="h6">Section not found</Typography>;
    }
  };

  const Header = () => (
    <AppBar position="fixed" sx={{ bgcolor: darkMode ? '#0f0f0f' : '#ffffff', color: darkMode ? '#fdd835' : '#000000' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">
          THE NINE TAILS KITCHEN
        </Typography>
      </Toolbar>
    </AppBar>
  );

  const Footer = () => (
    <Box sx={{ bgcolor: darkMode ? '#0f0f0f' : '#ffffff', color: darkMode ? '#fdd835' : '#000000', py: 2, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} THE-NINE-TAILS-KITCHEN. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: darkMode ? '#1a1a1a' : '#f5f5f5', color: darkMode ? 'white' : 'black' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            '& .MuiDrawer-paper': {
              width: 240,
              bgcolor: darkMode ? '#0f0f0f' : '#ffffff',
              color: darkMode ? 'white' : 'black',
            },
          }}
        >
          <Toolbar />
          <List>
            {sections.map((section) => (
              <ListItem
                button
                key={section.title}
                onClick={() => setSelectedSection(section.title)}
                sx={{ '&:hover': { bgcolor: darkMode ? '#303030' : '#e0e0e0' } }}
              >
                <ListItemIcon sx={{ color: darkMode ? '#fdd835' : '#000000' }}>{section.icon}</ListItemIcon>
                <ListItemText primary={section.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {renderSectionContent()}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;