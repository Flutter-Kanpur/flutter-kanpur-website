import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Chip,
    IconButton,
    Drawer,
    InputAdornment,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const SelectionBottomSheet = ({ open, onClose, items = [], onItemsUpdate, type = "skills" }) => {
    const [search, setSearch] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customValue, setCustomValue] = useState("");

    // Suggested items based on type
    const suggestions = type === "skills"
        ? ["Flutter", "Dart", "Figma", "Kubernetes", "Docker", "Kafka", "Prisma", "Canva", "JavaScript", "Mongo", "Postgres"]
        : ["Student", "Flutter Developer", "Web Developer", "UI/UX Designer", "Full Stack Developer", "Backend Developer", "Frontend Developer"];

    const toggleItem = (item) => {
        const newItems = items.includes(item)
            ? items.filter(i => i !== item)
            : [...items, item];
        onItemsUpdate(newItems);
    };

    const handleAddCustom = () => {
        if (customValue.trim() && !items.includes(customValue.trim())) {
            toggleItem(customValue.trim());
            setCustomValue("");
            setShowCustomInput(false);
        }
    };

    const title = type === "skills" ? "Add skills" : "Add roles";

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    p: 3,
                    maxHeight: '80vh',
                }
            }}
        >
            <Box sx={{ width: '100%', position: 'relative' }}>
                <Box
                    sx={{
                        width: 60,
                        height: 5,
                        bgcolor: '#000',
                        borderRadius: 5,
                        mx: 'auto',
                        mb: 3
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} sx={{ bgcolor: '#eee', p: 0.5 }}>
                        <CloseIcon fontSize="small" sx={{ color: '#000' }} />
                    </IconButton>
                </Box>

                <TextField
                    fullWidth
                    placeholder={type === "skills" ? "Search roles or skills..." : "Search roles..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        mb: 4,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 4,
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E0E0E0',
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: '#ccc' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
                    {suggestions.filter(s => s.toLowerCase().includes(search.toLowerCase())).map((item) => {
                        const isSelected = items.includes(item);
                        return (
                            <Chip
                                key={item}
                                label={item}
                                onClick={() => toggleItem(item)}
                                sx={{
                                    px: 1,
                                    py: 2.5,
                                    borderRadius: 3,
                                    fontWeight: 500,
                                    bgcolor: isSelected ? '#000' : '#fff',
                                    color: isSelected ? '#fff' : '#000',
                                    border: '1px solid #E0E0E0',
                                    '&:hover': {
                                        bgcolor: isSelected ? '#333' : '#f5f5f5',
                                    }
                                }}
                            />
                        );
                    })}
                    {/* Render custom items that are not in suggestions */}
                    {items.filter(item => !suggestions.includes(item)).map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            onClick={() => toggleItem(item)}
                            sx={{
                                px: 1,
                                py: 2.5,
                                borderRadius: 3,
                                fontWeight: 500,
                                bgcolor: '#000',
                                color: '#fff',
                                border: '1px solid #E0E0E0',
                                '&:hover': {
                                    bgcolor: '#333',
                                }
                            }}
                        />
                    ))}
                </Box>

                {showCustomInput ? (
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter custom item..."
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
                            autoFocus
                        />
                        <Button variant="contained" onClick={handleAddCustom} sx={{ bgcolor: '#000', color: '#fff' }}>
                            Add
                        </Button>
                    </Box>
                ) : (
                    <Button
                        variant="text"
                        onClick={() => setShowCustomInput(true)}
                        sx={{
                            color: 'primary.main',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            p: 0
                        }}
                    >
                        Add other
                    </Button>
                )}
            </Box>
        </Drawer>
    );
};

export default SelectionBottomSheet;
