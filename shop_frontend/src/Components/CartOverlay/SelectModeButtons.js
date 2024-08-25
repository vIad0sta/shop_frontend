import React from 'react';
import {Button} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function SelectModeButtons({handleOrderSelectedItems, handleCancelSelection, selectionDisabled}) {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOrderSelectedItems}
                disabled={selectionDisabled}
            >
                Замовити обране окремо
            </Button>
            <Button
                startIcon={<ClearIcon/>}
                variant="outlined"
                color="secondary"
                onClick={handleCancelSelection}
                style={{marginLeft: 10}}
            >
            </Button>
        </div>
    );
}

export default SelectModeButtons;