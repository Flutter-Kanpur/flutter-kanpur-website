'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ExploreHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Settings', action: () => { console.log('Settings'); handleMenuClose(); } },
    { label: 'Help', action: () => { console.log('Help'); handleMenuClose(); } },
    { label: 'About', action: () => { console.log('About'); handleMenuClose(); } },
    { label: 'Feedback', action: () => { console.log('Feedback'); handleMenuClose(); } },
  ];

  return (
    <Box
      sx={{
        py: 1.5,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* INNER HEADER WIDTH = 393 */}
      <Box
        sx={{
          width: 346,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 650, color: '#222' }}
        >
          Explore
        </Typography>

        <Box>
          <IconButton size="small">
            <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-label="more options"
          >
            <MoreVertIcon sx={{ fontSize: 22 }} />
          </IconButton>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: 2,
                minWidth: 150,
              },
            }}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} onClick={item.action}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
