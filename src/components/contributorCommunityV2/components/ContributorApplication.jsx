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
        fill="currentColor" // Use currentColor so it follows the Select's color
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

  return (
    <>

      <Box sx={{ width: '100%', px: 3, pt: 2, pb: 12 }}>


        <Box sx={{ bgcolor: '#F0F4FF', p: 2.5, borderRadius: '28px', textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a', fontFamily: 'var(--font-product-sans)' }}>
            Please review your details before submitting.
          </Typography>
        </Box>

        <Typography sx={labelStyle}>Full Name</Typography>
        <FormControl fullWidth error={!!errors.fullName}>
          <TextField
            fullWidth
            sx={inputStyle(!!errors.fullName)}
            placeholder="Eg. Angelica Singh"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          {errors.fullName && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.fullName}
            </FormHelperText>
          )}
        </FormControl>

        <Typography sx={labelStyle}>Email</Typography>
        <FormControl fullWidth error={!!errors.email}>
          <TextField
            fullWidth
            sx={inputStyle(!!errors.email)}
            placeholder="Eg. angie.work@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <Typography sx={labelStyle}>Current Role</Typography>
        <FormControl fullWidth error={!!errors.currentRole}>
          <Select
            IconComponent={CustomDropDownIcon}
            fullWidth
            sx={{
              ...inputStyle(!!errors.contribution),
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
            }}
            displayEmpty
            value={formData.currentRole}
            onChange={(e) => handleInputChange('currentRole', e.target.value)}
            MenuProps={menuProps}
          >
            <MenuItem value="" disabled><em>-select-</em></MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="designer">Designer</MenuItem>
            <MenuItem value="professional">Working Professional</MenuItem>
          </Select>
          {errors.currentRole && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.currentRole}
            </FormHelperText>
          )}
        </FormControl>

        <Typography sx={labelStyle}>What would you like to contribute to?</Typography>
        <FormControl fullWidth error={!!errors.contribution}>
          <Select
            IconComponent={CustomDropDownIcon}
            fullWidth
            sx={{
              ...inputStyle(!!errors.contribution),
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
            }}
            displayEmpty
            value={formData.contribution}
            onChange={(e) => handleInputChange('contribution', e.target.value)}
            MenuProps={menuProps}
            variant='outlined'
          >
            <MenuItem value="" disabled><em>-select-</em></MenuItem>
            <MenuItem value="events">Events & logistics</MenuItem>
            <MenuItem value="content">Content writing</MenuItem>
            <MenuItem value="ui">UI/UX Design</MenuItem>
            <MenuItem value="app">App Development</MenuItem>
            <MenuItem value="web">Web Development</MenuItem>
          </Select>
          {errors.contribution && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.contribution}
            </FormHelperText>
          )}
        </FormControl>

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
          // This keeps the input empty while you append values to your selectedSkills array
          value=""
          onChange={(e) => {
            const val = e.target.value;
            if (val && !selectedSkills.includes(val)) {
              setSelectedSkills([...selectedSkills, val]);
            }
          }}
          MenuProps={menuProps}
          sx={{
            ...inputStyle(), // Spreads your existing styles
            borderRadius: '16px',
            '& .MuiOutlinedInput-notchedOutline': {
              // For a clean pill shape, match this to the container (36px)
              borderRadius: '16px',
            },
            '& .MuiSelect-select': {
              borderRadius: '16px',
              paddingLeft: '16px'
            },
            '& .MuiSelect-icon': {
              right: '14px',
              fontSize: '18px', // Your reduced SVG size
              color: '#000',
              transition: 'transform 0.3s ease-in-out',
            },
            // Fix: Ensures your custom icon rotates when the menu opens
            '&.Mui-expanded .MuiSelect-icon': {
              transform: 'rotate(180deg)',
            }
          }}
        >
          <MenuItem value="" disabled>
            <em>-select-</em>
          </MenuItem>
          <MenuItem value="Flutter">Flutter</MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
          <MenuItem value="Api Integration">Api Integration</MenuItem>
          <MenuItem value="Cloud Services">Cloud Services</MenuItem>
          <MenuItem value="Data Analysis">Data Analysis</MenuItem>
        </Select>

        <Typography sx={labelStyle}>Experience Level</Typography>
        <FormControl fullWidth error={!!errors.experience}>
          <Select
            IconComponent={CustomDropDownIcon}
            fullWidth
            sx={{
              ...inputStyle(!!errors.contribution),
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
            }}

            displayEmpty
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            MenuProps={menuProps}
          >
            <MenuItem value="" disabled>Just getting started</MenuItem>
            <MenuItem value="0-1">0–1 years</MenuItem>
            <MenuItem value="1-3">1–3 years</MenuItem>
            <MenuItem value="3+">3+ years</MenuItem>
          </Select>
          {errors.experience && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.experience}
            </FormHelperText>
          )}
        </FormControl>

        <Typography sx={labelStyle}>How much time can you contribute per week?</Typography>
        <FormControl fullWidth error={!!errors.weeklyTime}>
          <Select
            IconComponent={CustomDropDownIcon}
            fullWidth
            sx={{
              ...inputStyle(!!errors.contribution),
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
            }}
            displayEmpty
            value={formData.weeklyTime}
            onChange={(e) => handleInputChange('weeklyTime', e.target.value)}
            MenuProps={menuProps}
          >
            <MenuItem value="" disabled><em>-select-</em></MenuItem>
            <MenuItem value="2-4">less than 2 hours</MenuItem>
            <MenuItem value="2-6">2-4 hours</MenuItem>
            <MenuItem value="2-8">4-6 hours</MenuItem>
            <MenuItem value="2-10">Flexible</MenuItem>
          </Select>
          {errors.weeklyTime && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.weeklyTime}
            </FormHelperText>
          )}
        </FormControl>

        <Typography sx={labelStyle}>Work / Profile Links</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1.5 }}>

          {/* 1. GitHub Link */}
          {/* 1. GitHub Link */}
          <TextField
            fullWidth
            placeholder="GitHub link"
            value={formData.github || ''}
            onChange={(e) => handleInputChange('github', e.target.value)} // Use handleInputChange
            sx={inputStyle()}
            InputProps={{
              endAdornment: formData.github && (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleInputChange('github', '')} edge="end">
                    <DeleteOutlineIcon sx={{ color: '#FF5252', fontSize: '20px' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* 2. LinkedIn Link */}
          <TextField
            fullWidth
            placeholder="LinkedIn link"
            value={formData.linkedin || ''}
            onChange={(e) => handleInputChange('linkedin', e.target.value)} // Use handleInputChange
            sx={inputStyle()}
            InputProps={{
              endAdornment: formData.linkedin && (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleInputChange('linkedin', '')} edge="end">
                    <DeleteOutlineIcon sx={{ color: '#FF5252', fontSize: '20px' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* 3. Portfolio / Website */}
          <TextField
            fullWidth
            placeholder="Portfolio / Website"
            value={formData.portfolio || ''}
            onChange={(e) => handleInputChange('portfolio', e.target.value)} // Use handleInputChange
            sx={inputStyle()}
            InputProps={{
              endAdornment: formData.portfolio && (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleInputChange('portfolio', '')} edge="end">
                    <DeleteOutlineIcon sx={{ color: '#FF5252', fontSize: '20px' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Typography sx={labelStyle}>Why do you want to contribute?</Typography>
        <FormControl fullWidth error={!!errors.reason}>
          <TextField
            fullWidth multiline rows={4}
            sx={inputStyle(!!errors.reason)}
            placeholder="In your words..."
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
          />
          {errors.reason && (
            <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#d32f2f', mt: 1, ml: 0 }}>
              <WarningAmberIcon sx={{ fontSize: 18 }} /> {errors.reason}
            </FormHelperText>
          )}
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
