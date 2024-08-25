import React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

function CustomFormControl({params, label, items, handleFiltersChange, fieldName}) {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                {items && items.map((item) => (
                    <FormControlLabel
                        key={item.id}
                        control={<Checkbox
                            checked={params[fieldName] && params[fieldName].includes(item.name.toUpperCase())}
                            onChange={(event) => handleFiltersChange(fieldName, item.name.toUpperCase(), event.target.checked)}/>}
                        label={item.name}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default CustomFormControl;