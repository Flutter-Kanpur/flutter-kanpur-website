'use client';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

export default function SearchBar({
  value,
  onChange,
  onMicClick,
  isListening,
  placeholder = 'Search...',
}) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <MicIcon
              onClick={onMicClick}
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
        '& .MuiOutlinedInput-root': {
          borderRadius: '999px',
          backgroundColor: '#fff',
          height: 52,
          boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        },
      }}
    />
  );
}
