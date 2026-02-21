<<<<<<< HEAD
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
=======
"use client";

import { useEffect, useState } from "react";
import { Box, List, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

import GradientHeader from "@/components/header/GradientHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileSection from "@/components/profile/ProfileSection";
import ProfileItem from "@/components/profile/ProfileItem";
import LogoutDialog from "@/components/profile/LogoutDialog";

import {
  AccountIcon,
  SecurityIcon,
  NotificationIcon,
  EventIcon,
  EmojiEventsIcon,
  LightbulbOutlinedIcon,
  MyContributionsIcon,
  JoinContributorIcon,
  CommunityGuidelinesIcon,
} from "@/components/profile/Icons";

import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 425,
        mx: "auto",
        minHeight: "100vh",
        backgroundColor: "#fff",
        pb: 12,
      }}
    >
      <GradientHeader
        title="My Profile"
        onBack={() => router.back()}
        sx={{ mb: '-100px' }}
      />

      <Box sx={{ px: 2.5 }}>
        {user && (
          <>
            <ProfileInfo
              user={user}
              onEditClick={() => router.push("/profile/edit")}
            />

            <ProfileSection title="Account">
              <List disablePadding>
                <ProfileItem icon={<AccountIcon />} text="Manage Profile" onClick={() => router.push("/profile/manage")} />
                <ProfileItem icon={<SecurityIcon />} text="Login & Security" onClick={() => router.push("/profile/security")} />
                <ProfileItem icon={<NotificationIcon />} text="Notifications" onClick={() => router.push("/notifications")} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="My Activity">
              <List disablePadding>
                <ProfileItem icon={<EventIcon />} text="My Events" onClick={() => { }} />
                <ProfileItem icon={<EmojiEventsIcon />} text="My Contests" onClick={() => { }} />
                <ProfileItem icon={<LightbulbOutlinedIcon />} text="Problem of the Day" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Community">
              <List disablePadding>
                <ProfileItem icon={<MyContributionsIcon />} text="My Contributions" onClick={() => { }} />
                <ProfileItem icon={<JoinContributorIcon />} text="Join as a Contributor" onClick={() => { }} />
                <ProfileItem icon={<CommunityGuidelinesIcon />} text="Community Guidelines" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Achievements">
              <List disablePadding>
                <ProfileItem icon={<BadgeOutlinedIcon />} text="Your Badges" onClick={() => { }} />
                <ProfileItem icon={<BarChartOutlinedIcon />} text="Your Rank" onClick={() => { }} />
                <ProfileItem icon={<LeaderboardOutlinedIcon />} text="Leaderboard" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Support">
              <List disablePadding>
                <ProfileItem icon={<HelpOutlineIcon />} text="Help Center" onClick={() => { }} />
                <ProfileItem icon={<ChatBubbleOutlineIcon />} text="Contact Community Team" onClick={() => { }} />
                <ProfileItem icon={<ReportProblemOutlinedIcon />} text="Report an Issue" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="About & Legal">
              <List disablePadding>
                <ProfileItem icon={<InfoOutlinedIcon />} text="About Flutter Kanpur" onClick={() => { }} />
                <ProfileItem icon={<PrivacyTipOutlinedIcon />} text="Privacy Policy" onClick={() => { }} />
                <ProfileItem icon={<DescriptionOutlinedIcon />} text="Terms of Use" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Account Actions">
              <List disablePadding>
                <ProfileItem
                  icon={<LogoutIcon />}
                  text="Log out"
                  color="#D32F2F"
                  onClick={() => setOpenLogout(true)}
                />
                <ProfileItem
                  icon={<DeleteOutlineIcon />}
                  text="Delete account"
                  color="#D32F2F"
                  onClick={() => setOpenDelete(true)}
                  isLast
                />
              </List>
            </ProfileSection>
          </>
        )}
      </Box>

      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />

      {/* Delete Dialog could be modularized too if needed, but keeping it simple for now */}
    </Box>
>>>>>>> d591d3867148159437cac86c0c957df21a085fdc
  );
}
