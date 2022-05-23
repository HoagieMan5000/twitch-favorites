import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CategoryActionMenuProps {
    onRemove: () => void
}

export const CategoryActionMenu = (props: CategoryActionMenuProps) => {
    const { onRemove } = props;

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return <>
        <div style={{ cursor: "pointer"}} onClick={handleClick}>
            <MoreVertIcon />
        </div>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => {
                onRemove();
                handleClose();
            }}>Remove</MenuItem>
        </Menu>
    </>
}