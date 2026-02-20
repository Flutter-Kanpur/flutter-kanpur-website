'use client';

import React from 'react';
import { 
  Box, Typography, Avatar, List, ListItem, ListItemIcon, 
  ListItemText, ListItemButton, Paper, Container, IconButton 
} from '@mui/material';
import {
  ArrowBack, ChevronRight, ManageAccounts, Lock, Notifications,
  CalendarToday, EmojiEvents, Lightbulb, AccountTree, GroupAdd,
  Description, Logout, DeleteForever
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

const menuGroups = [
  {
    title: "Account",
    items: [
      { label: "Manage Profile", icon: <ManageAccounts /> },
      { label: "Login & Security", icon: <Lock /> },
      { label: "Notifications", icon: <Notifications /> },
    ]
  },
  {
    title: "My Activity",
    items: [
      { label: "My Events", icon: <CalendarToday /> },
      { label: "My Contests", icon: <EmojiEvents /> },
      { label: "Problem of the Day", icon: <Lightbulb /> },
    ]
  },
  {
    title: "Community",
    items: [
      { 
        label: "My Contributions", 
        icon: <AccountTree />, 
        route: "/profile/mycontribution" 
      },
      { 
        label: "Join as a Contributor", 
        icon: <GroupAdd />, 
        route: "/profile/contributor" 
      },
      { 
        label: "Community Guidelines", 
        icon: <Description />, 
        route: "/profile/communityrules" 
      },
    ]
  },
  {
    title: "Account Actions",
    items: [
      { label: "Log out", icon: <Logout />, color: 'error.main' },
      { label: "Delete account", icon: <DeleteForever />, color: 'error.main' },
    ]
  }
];

export default function ProfilePage() {

  const router = useRouter();

  const handleClick = (route) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: '#F4F7FF', minHeight: '100vh', pb: 12 }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', pt: 3, pb: 2 }}>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>

        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            textAlign: 'center', 
            fontWeight: 700, 
            mr: 5 
          }}
        >
          My Profile
        </Typography>
      </Box>

      {/* Profile Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 2 }}>
        <Avatar 
          src="/path-to-your-image.jpg" 
          sx={{ width: 80, height: 80, mr: 2, border: '2px solid #fff' }} 
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Angelica Singh
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @angiedesigner21_
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 600, 
              mt: 0.5, 
              cursor: 'pointer' 
            }}
          >
            Edit profile
          </Typography>
        </Box>
      </Box>

      {/* Menu Sections */}
      {menuGroups.map((group, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              ml: 2, 
              color: 'text.secondary', 
              fontWeight: 600, 
              textTransform: 'uppercase' 
            }}
          >
            {group.title}
          </Typography>

          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              mt: 1, 
              overflow: 'hidden', 
              border: '1px solid #E0E7FF' 
            }}
          >
            <List disablePadding>
              {group.items.map((item, i) => (
                <ListItem 
                  key={i} 
                  disablePadding 
                  divider={i !== group.items.length - 1}
                >
                  <ListItemButton 
                    sx={{ py: 1.5 }}
                    onClick={() => handleClick(item.route)}
                  >
                    <ListItemIcon 
                      sx={{ minWidth: 40, color: item.color || 'inherit' }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText 
                      primary={item.label} 
                      primaryTypographyProps={{ 
                        fontSize: '15px', 
                        fontWeight: 500,
                        color: item.color || 'text.primary' 
                      }} 
                    />

                    <ChevronRight 
                      fontSize="small" 
                      sx={{ color: item.color || 'action.active' }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      ))}

      <BottomNav />

    </Container>
  );
}
