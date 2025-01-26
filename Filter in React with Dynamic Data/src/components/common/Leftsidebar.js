import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';

export default function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%', height:"100vh" }}>
      <MenuList>
        <MenuItem component={Link} to="/">
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ⌘X
          </Typography> */}
        </MenuItem>
        <MenuItem component={Link} to="/tablefilterdrawer">
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Table Filter Drawer</ListItemText>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ⌘C
          </Typography> */}
        </MenuItem>
      
       
     
      </MenuList>
    </Paper>
  );
}
