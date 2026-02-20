'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  SwipeableDrawer,
  Chip,
  Divider,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import BottomNav from '@/components/BottomNav/BottomNav';

export default function CoreTeamPageContainer({ initialSections = [] }) {
  const [sections, setSections] = useState(
    initialSections.map((s) => ({ ...s, open: true }))
  );

  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Bottom sheet
  const [selectedMember, setSelectedMember] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  /* ---------- Voice Search ---------- */
  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.onresult = (e) => setSearch(e.results[0][0].transcript);
    rec.start();
    setIsListening(true);
    rec.onend = () => setIsListening(false);
  };

  /* ---------- Toggle Section ---------- */
  const toggleSection = (index) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, open: !s.open } : s))
    );
  };

  /* ---------- Filter Members ---------- */
  const filteredSections = sections.map((section) => ({
    ...section,
    members: section.members?.filter((m) =>
      m.name?.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 393,
        mx: 'auto',
        minHeight: '100vh',
        pb: '110px',
        background:
          'linear-gradient(180deg, #cfe0f7 0%, #eaf2ff 6%, #ffffff 12%)',
      }}
    >
      {/* ---------- HEADER ---------- */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2, position: 'relative' }}
      >
        <Link
          href="/explore"
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIcon />
        </Link>

        <Typography fontWeight={600} fontSize={18}>
          Core team
        </Typography>
      </Stack>

      <Box px={2}>
        {/* ---------- SEARCH ---------- */}
        <TextField
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6b7280' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon
                  onClick={handleMic}
                  sx={{
                    cursor: 'pointer',
                    color: isListening ? '#4F70F4' : '#6b7280',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            width: 360,
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              height: 52,
            },
          }}
        />

        {/* ---------- SECTIONS ---------- */}
        {filteredSections.map((section, index) => (
          <Box key={section.section || index} mb={2}>
            {/* Section Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                borderBottom: '1px dashed #d1d5db',
                pb: 1,
                mb: 1,
              }}
            >
              <Typography fontWeight={600}>
                {section.section || 'Team'}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                {section.members?.length > 0 && (
                  <Typography fontSize={13} color="#4F70F4">
                    {section.members.length} members
                  </Typography>
                )}

                <IconButton size="small" onClick={() => toggleSection(index)}>
                  {section.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Stack>
            </Stack>

            {/* Members Grid */}
            <Collapse in={section.open}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '14px',
                  mt: 1,
                }}
              >
                {section.members?.map((member) => (
                  <Box
                    key={member.id}
                    onClick={() => {
                      setSelectedMember(member);
                      setOpenProfile(true);
                    }}
                    sx={{
                      textAlign: 'center',
                      p: 1.5,
                      borderRadius: 3,
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                    }}
                  >
                    <Avatar
                      src={member.image}
                      sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }}
                    />

                    <Typography fontSize={14} fontWeight={600}>
                      {member.name}
                    </Typography>

                    <Typography fontSize={12} color="#4F70F4">
                      {member.role}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>

      {/* ---------- PROFILE BOTTOM SHEET ---------- */}
      <SwipeableDrawer
  anchor="bottom"
  open={openProfile}
  onClose={() => setOpenProfile(false)}
  onOpen={() => {}}
  disableSwipeToOpen={false}
  ModalProps={{ keepMounted: true }}
  PaperProps={{
    sx: {
      width: '100%',
      maxWidth: 393,
      mx: 'auto',
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      height: '60vh',
      maxHeight: '60vh',
      background: '#f3f4f6',
      boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
      overflow: 'hidden',
    },
  }}
>
  {/* Drag indicator */}
  <Box
    sx={{
      width: 42,
      height: 4,
      bgcolor: '#c7cbd1',
      borderRadius: 10,
      mx: 'auto',
      mt: 1.2,
      mb: 1,
    }}
  />

  <Box
    sx={{
      px: 2.5,
      pb: 3,
      height: '100%',
      overflowY: 'auto',
      textAlign: 'center',
    }}
  >
    {/* Since text */}
    <Typography fontSize={12} color="#6b7280">
      Part of Flutter Kanpur since
    </Typography>

    <Typography fontWeight={600} fontSize={14} mb={1}>
      {selectedMember?.since || 'March 2026'}
    </Typography>

    {/* Avatar */}
    <Avatar
      src={selectedMember?.image}
      sx={{
        width: 90,
        height: 90,
        mx: 'auto',
        border: '3px solid #4F70F4',
      }}
    />

    {/* Name */}
    <Typography fontWeight={700} fontSize={18} mt={1}>
      {selectedMember?.name}
    </Typography>

    {/* Role */}
    <Typography color="#6b7280" fontSize={14}>
      {selectedMember?.role}
    </Typography>

    {/* Social Icons */}
    <Stack direction="row" spacing={2} justifyContent="center" mt={1.5}>
      <IconButton
        sx={{
          bgcolor: '#ffffff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        <GitHubIcon fontSize="small" />
      </IconButton>

      <IconButton
        sx={{
          bgcolor: '#ffffff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        <LanguageIcon fontSize="small" />
      </IconButton>

      <IconButton
        sx={{
          bgcolor: '#ffffff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        <LinkedInIcon fontSize="small" />
      </IconButton>
    </Stack>

    {/* Description */}
    <Typography fontSize={13} color="#6b7280" mt={2}>
      {selectedMember?.bio ||
        'Works on UI/UX design, branding, and overall visual direction for Flutter Kanpur products and community initiatives.'}
    </Typography>

    <Divider sx={{ my: 2 }} />

    {/* Skills */}
    <Typography fontWeight={600} mb={1}>
      Skills & Tools
    </Typography>

    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={1}
    >
      {(selectedMember?.skills || []).map((skill) => (
        <Chip
          key={skill}
          label={skill}
          sx={{
            background: '#e0e7ff',
            fontWeight: 500,
          }}
        />
      ))}
    </Stack>
  </Box>
</SwipeableDrawer>
      <BottomNav activeTab="explore" />
    </Box>
  );
}
