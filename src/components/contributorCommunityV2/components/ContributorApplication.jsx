'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, MenuItem, Select, Button,
  IconButton, Chip, InputAdornment, FormControl, FormHelperText, useMediaQuery
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddLinkIcon from '@mui/icons-material/AddLink';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';
import GradientHeader from '../GradientHeader';
import RevampButton from '@/components/buttons/revampbutton/RevampButton';
import { SvgIcon } from '@mui/material';

const STORAGE_KEY = "contributor_application_draft";

// ── Config arrays for DRY rendering ──

const TEXT_FIELDS = [
  { field: 'fullName', label: 'Full Name', placeholder: 'Eg. Angelica Singh' },
  { field: 'email', label: 'Email', placeholder: 'Eg. angie.work@gmail.com' },
];

const SELECT_FIELDS = [
  {
    field: 'currentRole',
    label: 'Current Role',
    options: [
      { value: 'student', label: 'Student' },
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
      { value: 'professional', label: 'Working Professional' },
    ],
  },
  {
    field: 'contribution',
    label: 'What would you like to contribute to?',
    variant: 'outlined',
    options: [
      { value: 'events', label: 'Events & logistics' },
      { value: 'content', label: 'Content writing' },
      { value: 'ui', label: 'UI/UX Design' },
      { value: 'app', label: 'App Development' },
      { value: 'web', label: 'Web Development' },
    ],
  },
  {
    field: 'experience',
    label: 'Experience Level',
    emptyLabel: 'Just getting started',
    options: [
      { value: '0-1', label: '0–1 years' },
      { value: '1-3', label: '1–3 years' },
      { value: '3+', label: '3+ years' },
    ],
  },
  {
    field: 'weeklyTime',
    label: 'How much time can you contribute per week?',
    options: [
      { value: '2-4', label: 'less than 2 hours' },
      { value: '2-6', label: '2-4 hours' },
      { value: '2-8', label: '4-6 hours' },
      { value: '2-10', label: 'Flexible' },
    ],
  },
];

const SKILL_OPTIONS = [
  'Flutter', 'React', 'UI/UX Designer',
  'Api Integration', 'Cloud Services', 'Data Analysis',
];

const PROFILE_LINK_FIELDS = [
  { field: 'github', placeholder: 'GitHub link' },
  { field: 'linkedin', placeholder: 'LinkedIn link' },
  { field: 'portfolio', placeholder: 'Portfolio / Website' },
];

const ContributorApplication = ({
  onBack = () => { },
  onContinue = () => { }
}) => {

  const isStrictMobile = useMediaQuery('(max-width:425px)');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentRole: '',
    contribution: '',
    experience: '',
    weeklyTime: '',
    reason: '',
    github: '',
    linkedin: '',
    portfolio: ''

  });

  const CustomDropDownIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <path
        d="M15.2222 7.34689L9.59717 12.9719C9.51878 13.0506 9.42564 13.113 9.32308 13.1556C9.22052 13.1981 9.11056 13.2201 8.99951 13.2201C8.88846 13.2201 8.7785 13.1981 8.67594 13.1556C8.57339 13.113 8.48024 13.0506 8.40185 12.9719L2.77685 7.34689C2.61835 7.18839 2.5293 6.9734 2.5293 6.74924C2.5293 6.52507 2.61835 6.31009 2.77685 6.15158C2.93536 5.99307 3.15035 5.90402 3.37451 5.90402C3.59868 5.90402 3.81366 5.99307 3.97217 6.15158L9.00021 11.1796L14.0283 6.15088C14.1868 5.99237 14.4018 5.90332 14.6259 5.90332C14.8501 5.90332 15.0651 5.99237 15.2236 6.15088C15.3821 6.30939 15.4711 6.52437 15.4711 6.74853C15.4711 6.9727 15.3821 7.18768 15.2236 7.34619L15.2222 7.34689Z"
        fill="currentColor"
      />
    </SvgIcon>
  );

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileLinks, setProfileLinks] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [errors, setErrors] = useState({});
  const [draftLoaded, setDraftLoaded] = useState(false);



  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...parsed.formData }));
      setSelectedSkills(parsed.selectedSkills || []);
    }
    setDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (!draftLoaded) return; // Don't save until draft is loaded
    const draft = {
      formData,
      selectedSkills,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [formData, selectedSkills, draftLoaded]);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };


  const validateForm = () => {
    let newErrors = {};
    const errorMsg = "Please select a value.";
    const textErrorMsg = "This field is required.";

    if (!formData.fullName.trim()) newErrors.fullName = textErrorMsg;
    if (!formData.email.trim()) newErrors.email = textErrorMsg;
    if (!formData.currentRole) newErrors.currentRole = errorMsg;
    if (!formData.contribution) newErrors.contribution = errorMsg;
    if (!formData.experience) newErrors.experience = errorMsg;
    if (!formData.weeklyTime) newErrors.weeklyTime = errorMsg;
    if (!formData.reason.trim()) newErrors.reason = textErrorMsg;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueClick = () => {
    const isValid = validateForm();
    if (!isValid) return;

    const finalData = {
      ...formData,
      skills: selectedSkills,
      links: profileLinks
    };

    if (typeof onContinue === "function") {
      onContinue(finalData);
    }
  };


  const labelStyle = {
    fontWeight: '600',
    fontSize: '14px',
    mb: 1,
    mt: 2.5,
    color: '#1a1a1a',
    fontFamily: 'var(--font-product-sans)',

  };

  const inputStyle = (hasError) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      bgcolor: '#fff',
      '& fieldset': {
        borderColor: hasError ? '#d32f2f' : '#E0E0E0',
        borderRadius: '16x',
        borderWidth: hasError ? '1.5px' : '1px'
      },
      '&:hover fieldset': { borderColor: hasError ? '#d32f2f' : '#B0B0B0' },
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
      py: 1.5,
      fontFamily: 'var(--font-product-sans)',


    }
  });

  const selectSx = (hasError) => ({
    ...inputStyle(hasError),
    borderRadius: '36px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '16px',
    },
    '& .MuiSelect-icon': {
      right: '14px',
      fontSize: '18px',
      color: '#000',
      transition: 'transform 0.3s ease-in-out',
    }
  });

  const menuProps = {
    PaperProps: {

      sx: {
        borderRadius: '28px',
        marginTop: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '8px',
        '& .MuiMenuItem-root': {
          borderRadius: '16px',
          margin: '2px 0',
          transition: 'all 0.2s ease',


          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: '#d1e9ff',
            },
          },

          // This targets the grey hover state
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderRadius: '16px',
          },
        },
      },
    },
  };

  // ── Reusable error helper ──
  const renderError = (field) =>
    errors[field] && (
      <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
        <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors[field]}
      </FormHelperText>
    );

  return (
    <>

      <Box sx={{ width: '100%', px: 3, pt: 2, pb: 12 }}>


        <Box sx={{ bgcolor: '#F0F4FF', p: 2.5, borderRadius: '28px', textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a', fontFamily: 'var(--font-product-sans)' }}>
            Please review your details before submitting.
          </Typography>
        </Box>

        {/* ── Text Fields (Full Name, Email) ── */}
        {TEXT_FIELDS.map(({ field, label, placeholder }) => (
          <React.Fragment key={field}>
            <Typography sx={labelStyle}>{label}</Typography>
            <FormControl fullWidth error={!!errors[field]}>
              <TextField
                fullWidth
                sx={inputStyle(!!errors[field])}
                placeholder={placeholder}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
              {renderError(field)}
            </FormControl>
          </React.Fragment>
        ))}

        {/* ── Select Fields (Current Role, Contribution, Experience, Weekly Time) ── */}
        {SELECT_FIELDS.map(({ field, label, options, emptyLabel, variant }) => (
          <React.Fragment key={field}>
            <Typography sx={labelStyle}>{label}</Typography>
            <FormControl fullWidth error={!!errors[field]}>
              <Select
                IconComponent={CustomDropDownIcon}
                fullWidth
                sx={selectSx(!!errors[field])}
                displayEmpty
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                MenuProps={menuProps}
                {...(variant ? { variant } : {})}
              >
                <MenuItem value="" disabled>
                  {emptyLabel || <em>-select-</em>}
                </MenuItem>
                {options.map(({ value, label: optLabel }) => (
                  <MenuItem key={value} value={value}>{optLabel}</MenuItem>
                ))}
              </Select>
              {renderError(field)}
            </FormControl>
          </React.Fragment>
        ))}

        {/* ── Relevant Skills ── */}
        <Typography sx={labelStyle}>Relevant Skills</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
          {selectedSkills.map((skill) => (
            <Chip
              key={skill} label={skill}
              onDelete={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
              sx={{ bgcolor: '#448AFF', color: '#fff', borderRadius: '20px', fontWeight: 400, '& .MuiChip-deleteIcon': { color: '#fff', fontSize: '18px' } }}
            />
          ))}
        </Box>
        <Select
          fullWidth
          displayEmpty
          IconComponent={CustomDropDownIcon}
          value=""
          onChange={(e) => {
            const val = e.target.value;
            if (val && !selectedSkills.includes(val)) {
              setSelectedSkills([...selectedSkills, val]);
            }
          }}
          MenuProps={menuProps}
          sx={{
            ...inputStyle(),
            borderRadius: '16px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '16px',
            },
            '& .MuiSelect-select': {
              borderRadius: '16px',
              paddingLeft: '16px'
            },
            '& .MuiSelect-icon': {
              right: '14px',
              fontSize: '18px',
              color: '#000',
              transition: 'transform 0.3s ease-in-out',
            },
            '&.Mui-expanded .MuiSelect-icon': {
              transform: 'rotate(180deg)',
            }
          }}
        >
          <MenuItem value="" disabled>
            <em>-select-</em>
          </MenuItem>
          {SKILL_OPTIONS.map((skill) => (
            <MenuItem key={skill} value={skill}>{skill}</MenuItem>
          ))}
        </Select>

        {/* ── Profile Link Fields (GitHub, LinkedIn, Portfolio) ── */}
        <Typography sx={labelStyle}>Work / Profile Links</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1.5 }}>
          {PROFILE_LINK_FIELDS.map(({ field, placeholder }) => (
            <TextField
              key={field}
              fullWidth
              placeholder={placeholder}
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              sx={inputStyle()}
              InputProps={{
                endAdornment: formData[field] && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange(field, '')} edge="end">
                      <DeleteOutlineIcon sx={{ color: '#FF5252', fontSize: '20px' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
        </Box>

        {/* ── Reason ── */}
        <Typography sx={labelStyle}>Why do you want to contribute?</Typography>
        <FormControl fullWidth error={!!errors.reason}>
          <TextField
            fullWidth multiline rows={4}
            sx={inputStyle(!!errors.reason)}
            placeholder="In your words..."
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
          />
          {renderError('reason')}
        </FormControl>


        <Box sx={{ mt: 8, display: 'flex', justifyContent: isStrictMobile ? 'center' : 'flex-start' }}>
          <RevampButton
            text="Continue"
            width={isStrictMobile ? "100%" : "320px"}
            onClick={handleContinueClick}
          />
        </Box>

        <BottomNav />
      </Box>
    </>
  );
};

export default ContributorApplication;
