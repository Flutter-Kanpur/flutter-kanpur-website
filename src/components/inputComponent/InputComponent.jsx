import React from 'react'

const InputComponent = ({ style, type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            variant="outlined"
            style={{
                ...style,
                width: '100%',
                padding: '12px',
                background: 'transparent',
                border: '1px solid #2E3942',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '16px',
                boxSizing: 'border-box',
                fontFamily: 'Encode Sans, sans-serif'
            }}
        />
    )
}

export default InputComponent
