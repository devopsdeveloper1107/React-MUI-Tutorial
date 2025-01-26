import React, {  useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Button,
  Drawer,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

function TableFilterDrawer() {
const[isDrawerOpen, setIsDrawerOpen]= useState(false);
const[users, setUsers]= useState([]);
const[filterUsers, setFilterUsers]= useState([]);
const [error, setError]= useState(null);
const[loading, setLoading]= useState(true);

const [selectCity, setSelectCity]= useState([]);

const fetchUsers=async()=>{
try{
setLoading(true);
const response= await fetch("https://dummyjson.com/users");
const userData= await response.json();
setUsers(userData?.users);
setFilterUsers(userData?.users)
} catch(err){
  setError(err.message);
} finally{
  setLoading(false);
}
}

useEffect(()=>{
  fetchUsers();
},[]);

const toggleDrawer=(open)=>{
  setIsDrawerOpen(open);
}

const handlecityChange=(city)=>{
  setSelectCity((prev)=>
    prev.includes(city) ? prev.filter((c)=> c!==city):[...prev, city]
  )
}

const handelReset=()=>{
  setFilterUsers(users);
  setSelectCity([]);
  setIsDrawerOpen(false);

}
const handleApply=()=>{
  const filtered= users.filter((user)=>{
  const matchcity = selectCity.length===0 || selectCity.includes(user.address.city);
  return matchcity;
  }
  )
  setFilterUsers(filtered);
  setIsDrawerOpen(false);
}
const uniCity=[...new Set(users.map((user)=>user.address?.city))];

   return (
    <Paper sx={{ padding: 0 }}>
      {/* Top Bar with Search and Buttons */}
      <Box display="flex" justifyContent="end" alignItems="center" marginBottom={2}>
        {/* Filter Button */}
        <Box display="flex" gap={1}>
          <IconButton color="default" onClick={()=>toggleDrawer(true)}>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ maxHeight: 750, overflowY: 'auto' }}>
      <TableContainer>
       
      {loading? (
        <Box display="flex" justifyContent="center" alignItems="center" padding={3}>
        <CircularProgress/>
       </Box>
      ):error?(
   <Box display="flex" justifyContent="center" alignItems="center" padding={3}>
        <p> {error} </p>
       </Box>
      ):(
        <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
        {filterUsers?.map((user, index)=>(
          <TableRow key={index}>
              <TableCell>{index+1}</TableCell> {/* ID starts from 1 */}
              <TableCell>{user.firstName }</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>

        ))}
            
         
        </TableBody>
      </Table>

      )
    }  
          
       {/*  */}

         
       
      </TableContainer>
      </Box>
      {/* Drawer for Filters */}
    
      <Drawer anchor="right" open={isDrawerOpen} onClose={()=>toggleDrawer(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <h3>Filter Options</h3>
          <hr/>
          {/* Cities Checkboxes */}
          <h4>Cities</h4>
         {uniCity.map((city)=>(
       
            <FormControlLabel
              key={city}
              control={
                <Checkbox
                  checked={selectCity.includes(city)}
                  onChange={()=>handlecityChange(city)}
                />
              }
              label={city }
            />
))}
           

          {/* Action Buttons */}
          <Box 
          display="flex"
          justifyContent="space-between"
          padding={2}
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bgcolor="white" // Optional background for visibility
          boxShadow={3} // Optional shadow
          >
            <Button variant="contained" color="primary" onClick={handleApply}>
              Apply
            </Button>
            <Button variant="outlined" color="secondary" onClick={handelReset}>
              Reset
            </Button>
          </Box>
        </Box>
      </Drawer>
    
    </Paper>
  );
}

export default TableFilterDrawer;
