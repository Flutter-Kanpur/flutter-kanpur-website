<<<<<<< HEAD
// src/components/buttons/revampbutton/RevampButton.jsx
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RevampButton = ({ text, onClick, width = '100%', bgColor = '#000', hasIcon = true, sx = {} }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      endIcon={hasIcon ? <ArrowForwardIcon /> : null}
      sx={{
        width: width,
        // ✅ Uses backgroundImage to ensure the reflection layers correctly over the bgColor
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0) 100%)`,
        backgroundColor: bgColor,
        color: '#fff',
        borderRadius: '100px',
        py: 1,
        textTransform: 'none',
        fontWeight: '400',
        fontSize: '16px',
        fontFamily: 'var(--font-product-sans)',
        
        // ✅ Multi-layered shadow for 3D depth and rim highlight
        boxShadow: `
          0px 4px 10px rgba(0, 0, 0, 0.3), 
          inset 0px 1.5px 2px rgba(255, 255, 255, 0.25)
        `,
        
      
        
        '&:hover': {
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0) 100%)`,
          backgroundColor: bgColor,
          boxShadow: `
            0px 6px 15px rgba(0, 0, 0, 0.4), 
            inset 0px 1.5px 2px rgba(255, 255, 255, 0.35)
          `,
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(1px)',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
        },
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default RevampButton;
=======
import { Button } from '@mui/material';

const RevampButton = ({ text, onClick, width = '100%', bgColor = '#000', sx = {}, disabled = false }) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={{
                width: width,
                backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0) 100%)`,
                backgroundColor: bgColor,
                color: '#fff',
                borderRadius: '100px',
                py: 1,
                textTransform: 'none',
                fontWeight: '400',
                fontSize: '16px',
                fontFamily: 'var(--font-product-sans)',
                boxShadow: `
          0px 4px 10px rgba(0, 0, 0, 0.3), 
          inset 0px 1.5px 2px rgba(255, 255, 255, 0.25)
        `,

                '&:hover': {
                    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0) 100%)`,
                    backgroundColor: bgColor,
                    boxShadow: `
            0px 6px 15px rgba(0, 0, 0, 0.4), 
            inset 0px 1.5px 2px rgba(255, 255, 255, 0.35)
          `,
                    transform: 'translateY(-1px)',
                },
                '&:active': {
                    transform: 'translateY(1px)',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                },
                '&:disabled': {
                    backgroundImage: 'none',
                    backgroundColor: '#ccc',
                    color: '#666',
                },
                ...sx,
            }}
        >
            {text}
        </Button>
    );
};

export default RevampButton;
>>>>>>> d591d3867148159437cac86c0c957df21a085fdc
