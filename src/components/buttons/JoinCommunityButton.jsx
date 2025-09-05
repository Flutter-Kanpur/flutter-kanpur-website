import { Button, Typography } from '@mui/material';
import React from 'react';

const JoinCommunityButton = ({
  text = "Join Community",
  style = {},
  textStyle = {},
  onClick = () => { }
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        position: 'relative',
        backgroundColor: '#010A10',
        borderRadius: '8px',
        padding: '12px 24px',
        minWidth: '160px',
        minHeight: '48px',
        border: 'none',
        overflow: 'hidden',
        boxShadow: 'none',
        zIndex: 1,

        // Pseudo-element for rotating gradient border
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '8px',
          padding: '2px', // border thickness
          background: 'conic-gradient(white, black, white)',
          animation: 'spinBorder 3s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: -1
        },

        '&:hover': {
          backgroundColor: '#0a1922'
        },

        '&:active': {
          backgroundColor: '#050d13'
        },

        // Rotation keyframes
        '@keyframes spinBorder': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },

        ...style
      }}
    >
      <Typography
        sx={{
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: 700,
          textTransform: 'none',
          letterSpacing: '0.5px',
          ...textStyle
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default JoinCommunityButton;
