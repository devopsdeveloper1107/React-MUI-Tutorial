import './App.css';
import { Routes, Route } from 'react-router-dom';
import {Box, Grid} from '@mui/material';
import Leftsidebar from './components/common/Leftsidebar';
import Home from './components/Home';
import TableFilterDrawer from './components/TableFilterDrawer';

function App() {
  return (
    <div>
    <Box sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Left Sidebar */}
        <Grid item xs={3} sx={{ backgroundColor: '#f5f5f5' }}>
          <Leftsidebar />
        </Grid>

        {/* Right Content Area */}
        <Grid item xs={9}>
          <Box sx={{ padding:1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tablefilterdrawer" element={<TableFilterDrawer />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default App;
