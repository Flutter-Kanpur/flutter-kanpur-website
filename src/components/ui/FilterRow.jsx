'use client';

import { Stack, Button, Chip, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

export default function FilterRow({
  filters = [],
  active,
  onChange,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Stack direction="row" spacing={1} mb={2} alignItems="center">
      <Button
        size="small"
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
        sx={{
          borderRadius: 5,
          height: 32,
          px: 1.5,
          minWidth: 0,
          textTransform: 'none',
          fontSize: 13,
          borderColor: '#e5e7eb',
          color: '#374151',
          background: '#fff',
        }}
      >
        Filters
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { onChange(''); setAnchorEl(null); }}>
          All
        </MenuItem>
        {filters.map((f) => (
          <MenuItem
            key={f}
            selected={active === f}
            onClick={() => {
              onChange(f);
              setAnchorEl(null);
            }}
          >
            {f}
          </MenuItem>
        ))}
      </Menu>

      {filters.map((f) => {
        const activeChip = active === f;
        return (
          <Chip
            key={f}
            label={f}
            size="small"
            clickable
            onClick={() => onChange(activeChip ? '' : f)}
            sx={{
              height: 32,
              borderRadius: 5,
              fontSize: 13,
              border: '1px solid #e5e7eb',
              backgroundColor: activeChip ? '#4F70F4' : '#fff',
              color: activeChip ? '#fff' : '#374151',
            }}
          />
        );
      })}
    </Stack>
  );
}
