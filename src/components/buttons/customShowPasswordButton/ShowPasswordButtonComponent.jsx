import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';

const ShowPasswordButtonComponent = ({ setShowPassword, showPassword }) => {
    return (
        <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0'
            }}
        >
            <Image
                src={showPassword ? "/assets/eyeglasses_filled.png" : "/assets/eyeglasses.png"}
                alt="Toggle password visibility"
                width="30"
                height="30"
                style={{
                    filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                }}
            />
        </Button>

    )
}

export default ShowPasswordButtonComponent
