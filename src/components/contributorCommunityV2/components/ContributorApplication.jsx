'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, MenuItem, Select, Button,
  IconButton, Chip, InputAdornment, FormControl, FormHelperText, useMediaQuery
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { SvgIcon } from '@mui/material';
import ArRevampButton from '@/components/buttons/revampArrowButton/ArRevampButton';

const STORAGE_KEY = "contributor_application_draft";


const TEXT_FIELDS = [
  { field: 'fullName', label: 'Full Name', placeholder: 'Eg. Angelica Singh', type: 'text' },
  { field: 'email', label: 'Email', placeholder: 'Eg. angie.work@gmail.com', type: 'email' },
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
    defaultValue: 'just-getting-started',
    options: [
      { value: 'just-getting-started', label: 'Just getting started' },
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
    experience: 'just-getting-started',
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

  const TriangleErrorIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 16 15" sx={{ ...props.sx, width: 16, height: 15 }}>
      <path
        d="M15.5258 11.5376L9.37693 0.859265C9.22327 0.59765 9.00392 0.380731 8.7406 0.230011C8.47729 0.0792899 8.17915 0 7.87575 0C7.57235 0 7.27422 0.0792899 7.01091 0.230011C6.74759 0.380731 6.52823 0.59765 6.37458 0.859265L0.225754 11.5376C0.0779124 11.7907 0 12.0785 0 12.3715C0 12.6646 0.0779124 12.9524 0.225754 13.2054C0.37744 13.4686 0.596421 13.6867 0.860227 13.8374C1.12403 13.988 1.42316 14.0657 1.72693 14.0625H14.0246C14.3281 14.0655 14.6269 13.9876 14.8905 13.837C15.154 13.6864 15.3728 13.4684 15.5243 13.2054C15.6724 12.9525 15.7506 12.6648 15.7508 12.3717C15.7511 12.0787 15.6734 11.7908 15.5258 11.5376ZM7.31325 5.62505C7.31325 5.47586 7.37252 5.33279 7.47801 5.2273C7.5835 5.12181 7.72657 5.06255 7.87575 5.06255C8.02494 5.06255 8.16801 5.12181 8.2735 5.2273C8.37899 5.33279 8.43825 5.47586 8.43825 5.62505V8.43755C8.43825 8.58673 8.37899 8.7298 8.2735 8.83529C8.16801 8.94078 8.02494 9.00005 7.87575 9.00005C7.72657 9.00005 7.5835 8.94078 7.47801 8.83529C7.37252 8.7298 7.31325 8.58673 7.31325 8.43755V5.62505ZM7.87575 11.8125C7.70888 11.8125 7.54575 11.7631 7.40699 11.6703C7.26824 11.5776 7.16009 11.4459 7.09623 11.2917C7.03237 11.1375 7.01566 10.9679 7.04822 10.8042C7.08077 10.6405 7.16113 10.4902 7.27913 10.3722C7.39713 10.2542 7.54747 10.1738 7.71115 10.1413C7.87482 10.1087 8.04447 10.1254 8.19864 10.1893C8.35282 10.2531 8.48459 10.3613 8.57731 10.5C8.67002 10.6388 8.7195 10.8019 8.7195 10.9688C8.7195 11.1926 8.63061 11.4072 8.47237 11.5654C8.31414 11.7237 8.09953 11.8125 7.87575 11.8125Z"
        fill="#CC3333"
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
    if (!draftLoaded) return;
    const draft = {
      formData,
      selectedSkills,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [formData, selectedSkills, draftLoaded]);


  const handleInputChange = (field, value) => {
    if (field === 'fullName' && value !== '' && !/^[a-zA-Z\s'-]+$/.test(value)) {
      return;
    }
    if (['github', 'linkedin', 'portfolio'].includes(field) && /\s/.test(value)) {
      return;
    }

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^https?:\/\/.+\..+/;

    if (!formData.fullName.trim()) newErrors.fullName = textErrorMsg;
    if (!formData.email.trim()) {
      newErrors.email = textErrorMsg;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.currentRole) newErrors.currentRole = errorMsg;
    if (!formData.contribution) newErrors.contribution = errorMsg;
    if (!formData.weeklyTime) newErrors.weeklyTime = errorMsg;
    if (!formData.reason.trim()) newErrors.reason = textErrorMsg;

    ['github', 'linkedin', 'portfolio'].forEach((field) => {
      if (formData[field] && formData[field].trim() && !urlRegex.test(formData[field].trim())) {
        newErrors[field] = "Please enter a valid URL (e.g. https://...)";
      }
    });

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
    fontWeight: '500',
    fontSize: '16px',
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
      '&.Mui-focused fieldset': {
        borderColor: hasError ? '#d32f2f' : '#4167F2',
        borderWidth: '2px',
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '16px',
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
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: hasError ? '#d32f2f' : '#4167F2',
      borderWidth: '2px',
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
          fontSize: '16px',
          fontWeight: 400,
          fontFamily: 'var(--font-product-sans)',

          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: '#d1e9ff',
            },
          },

          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderRadius: '16px',
          },
        },
      },
    },
  };

  const renderError = (field) =>
    errors[field] && (
      <FormHelperText sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        color: '#CC3333',
        mt: 1,
        ml: 0,
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'var(--font-product-sans)',
      }}>
        <TriangleErrorIcon /> {errors[field]}
      </FormHelperText>
    );

  return (
    <>

      <Box sx={{ width: '100%', px: 3, pt: 2, pb: 12 }}>


        <Box sx={{ bgcolor: '#F0F4FF', p: 2.5, borderRadius: '28px', textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#1a1a1a', fontFamily: 'var(--font-product-sans)' }}>
            Please review your details before submitting.
          </Typography>
        </Box>

        {TEXT_FIELDS.map(({ field, label, placeholder, type }) => (
          <React.Fragment key={field}>
            <Typography sx={labelStyle}>{label}</Typography>
            <FormControl fullWidth error={!!errors[field]}>
              <TextField
                fullWidth
                type={type || 'text'}
                sx={inputStyle(!!errors[field])}
                placeholder={placeholder}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
              {renderError(field)}
            </FormControl>
          </React.Fragment>
        ))}

        {SELECT_FIELDS.map(({ field, label, options, defaultValue, variant }) => (
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
                {!defaultValue && (
                  <MenuItem value="" disabled>
                    -select-
                  </MenuItem>
                )}
                {options.map(({ value, label: optLabel }) => (
                  <MenuItem key={value} value={value}>{optLabel}</MenuItem>
                ))}
              </Select>
              {renderError(field)}
            </FormControl>
          </React.Fragment>
        ))}

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
          renderValue={() => {
            if (selectedSkills.length === 0) return '-select-';
            if (selectedSkills.length === 1) return '1 skill';
            return `${selectedSkills.length} skills`;
          }}
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
          {SKILL_OPTIONS.map((skill) => (
            <MenuItem key={skill} value={skill}>{skill}</MenuItem>
          ))}
        </Select>

        <Typography sx={labelStyle}>Work / Profile Links</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1.5 }}>
          {PROFILE_LINK_FIELDS.map(({ field, placeholder }) => (
            <FormControl key={field} fullWidth error={!!errors[field]}>
              <TextField
                fullWidth
                type="url"
                placeholder={placeholder}
                value={formData[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                sx={inputStyle(!!errors[field])}
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
              {renderError(field)}
            </FormControl>
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
          <ArRevampButton
            text="Continue"
            width={isStrictMobile ? "100%" : "320px"}
            onClick={handleContinueClick}
          />
        </Box>
      </Box>
    </>
  );
};

export default ContributorApplication;
