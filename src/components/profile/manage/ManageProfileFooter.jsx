import React from 'react';
import { Box, Button } from "@mui/material";
import RevampButton from '@/components/buttons/revampbutton/RevampButton';

const ManageProfileFooter = ({ onSave, onCancel, loading }) => {
    return (
        <Box sx={{ display: "flex", gap: 2, mt: 6 }}>
            <RevampButton
                text={loading ? "Saving..." : "Save changes"}
                onClick={onSave}
                disabled={loading}
            />
            <Button
                fullWidth
                variant="text"
                onClick={onCancel}
                sx={{
                    color: "#000",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: '1rem'
                }}
            >
                Cancel
            </Button>
        </Box>
    );
};

export default ManageProfileFooter;
