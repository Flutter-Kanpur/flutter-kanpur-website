'use client';

import { TextField } from '@mui/material';

export default function CustomTextField({
  label,
  multiline = false,
  rows = 1,
  ...props
}) {
  return (
    <TextField
      fullWidth
      label={label}
      multiline={multiline}
      rows={rows}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          backgroundColor: '#fff',
        },
      }}
      {...props}
    />
  );
}
