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
    <Box
      sx={{
        maxWidth: 425,
        mx: "auto",
        backgroundColor: "#fff",
        minHeight: "100vh",
        pb: 4,
      }}
    >

      <GradientHeader
        title="Manage Profile"
        onBack={() => router.back()}
        sx={{ mb: '-60px' }}
      />

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
  );
}
