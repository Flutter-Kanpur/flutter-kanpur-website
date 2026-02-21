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
  );
}
