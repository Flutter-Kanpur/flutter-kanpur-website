import { Button, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import React from 'react';

const ViewProfileButton = ({
    text = 'APPLY NOW',
    width = '130px',
    height = '36px',
    fontSize = '8px',
    style = {},
    textStyle = {},
    onClick = () => { },
}) => {
    return (
        <div
            style={{
                position: 'relative',
                display: width === '100%' ? 'block' : 'inline-block',
                width: width === '100%' ? '100%' : 'auto',
            }}
        >
            {/* SVG background behind everything */}
            <img
                src="/assets/btn_background.svg"
                alt="Button Animation"
                style={{
                    position: 'absolute',
                    left: '10px',
                    top: '40%',
                    transform: 'translateY(-50%)',
                    width: '124px',
                    height: '117px',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <Button
                onClick={onClick}
                sx={{
                    position: 'relative',
                    background: '#010A10',
                    borderRadius: '999px',
                    padding: '4px 18px',
                    width: width === '100%' ? '100%' : width,
                    minWidth: width === '100%' ? 'auto' : width,
                    minHeight: height,
                    border: 'none',
                    overflow: 'hidden',
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px', // 👈 space between text & icon
                    zIndex: 1,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '999px',
                        padding: '1px',
                        background:
                            'linear-gradient(90deg, #37ABFF, #0C1217 , #0C1217 )',
                        WebkitMask:
                            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        zIndex: -1,
                    },
                    ...style,
                }}
            >
                <Typography
                    sx={{
                        color: '#F5F5F5',
                        fontSize: fontSize,
                        fontWeight: 400,
                        textTransform: 'none',
                        letterSpacing: '1px',
                        position: 'relative',
                        zIndex: 1,
                        ...textStyle,
                    }}
                >
                    {text}
                </Typography>


                <VisibilityOutlinedIcon
                    sx={{ fontSize: '16px', color: '#66B5FF', zIndex: 1 }}
                />
            </Button>
        </div>
    );
};

export default ViewProfileButton;
