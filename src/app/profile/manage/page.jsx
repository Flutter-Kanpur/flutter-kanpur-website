"use client";

import { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/config";

import GradientHeader from "@/components/header/GradientHeader";
import { BackIcon } from "@/components/profile/manage/Icons";
import ManageProfileHeader from "@/components/profile/manage/ManageProfileHeader";
import ProblemCard from "@/components/profile/manage/ProblemCard";
import ManageProfileSection from "@/components/profile/manage/ManageProfileSection";
import ManageProfileFooter from "@/components/profile/manage/ManageProfileFooter";
import SelectionBottomSheet from "@/components/profile/manage/SelectionBottomSheet";
import SideBar from "@/components/profilesidebar/SideBar";
import ProfileRightPanel from "@/components/profilesidebar/ProfileRightPanel";

export default function ManageProfilePage() {
  const router = useRouter();
  const db = getFirestore();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skillsSheetOpen, setSkillsSheetOpen] = useState(false);
  const [rolesSheetOpen, setRolesSheetOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        roles: userData?.roles || [],
        skills: userData?.skills || [],
      });
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSkillsUpdate = (newSkills) => {
    setUserData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleRolesUpdate = (newRoles) => {
    setUserData(prev => ({ ...prev, roles: newRoles }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  const roleTags = Array.isArray(userData?.roles) ? userData.roles : [];

  const skillTags = Array.isArray(userData?.skills) ? userData.skills : [];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fff' }}>
      <SideBar />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          ml: { xs: 0, sm: '280px' },
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: { xs: 425, sm: '100%' },
            mx: { xs: 'auto', sm: 0 },
            backgroundColor: "#fff",
            pb: 4,
          }}
        >
          {/* GradientHeader — mobile only */}
          <Box sx={{ display: { sm: 'none' } }}>
            <GradientHeader
              title="Manage Profile"
              onBack={() => router.back()}
              sx={{ mb: '-60px' }}
            />
          </Box>

          {/* Desktop back button */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
              pt: 3,
              px: 3,
              mb: 1,
              cursor: 'pointer',
            }}
            onClick={() => router.back()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#1a1a1a" />
            </svg>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'var(--font-product-sans)',
                color: '#1a1a1a',
              }}
            >
              Back
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 2.5, sm: 3 } }}>
            <ManageProfileHeader
              user={user}
              userData={userData}
              onEditClick={() => router.push("/profile/edit")}
            />

            <ProblemCard
              level={userData?.level || 1}
              progress={userData?.progress || 0}
            />

            <ManageProfileSection
              title="About me"
              content={userData?.about}
            />

            <ManageProfileSection
              title="Role & Experience"
              subtitle={userData?.experience || "0–1 years"}
              tags={roleTags}
              isTags={true}
              onEdit={() => setRolesSheetOpen(true)}
            />

            <ManageProfileSection
              title="Skills"
              tags={skillTags}
              isTags={true}
              onEdit={() => setSkillsSheetOpen(true)}
            />

            <ManageProfileFooter
              onSave={handleSave}
              onCancel={() => router.back()}
              loading={saving}
            />
          </Box>

          <SelectionBottomSheet
            open={skillsSheetOpen}
            onClose={() => setSkillsSheetOpen(false)}
            items={skillTags}
            onItemsUpdate={handleSkillsUpdate}
            type="skills"
          />

          <SelectionBottomSheet
            open={rolesSheetOpen}
            onClose={() => setRolesSheetOpen(false)}
            items={roleTags}
            onItemsUpdate={handleRolesUpdate}
            type="roles"
          />
        </Box>
        <ProfileRightPanel user={user} />
      </Box>
    </Box>
  );
}
