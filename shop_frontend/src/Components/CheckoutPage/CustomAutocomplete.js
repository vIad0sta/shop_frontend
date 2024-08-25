import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import {VariableSizeList} from 'react-window';

const LISTBOX_PADDING = 4;

const renderRow = (props) => {
    const {data, index, style} = props;
    const item = data[index];

    return (
        <div style={{...style, top: style.top + LISTBOX_PADDING}} key={item.Ref}>
            {item}
        </div>
    );
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

const useResetCache = (data) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
};

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const {children, ...other} = props;
    const itemData = React.Children.toArray(children);
    const itemCount = itemData.length;
    const itemSize = 36;

    const getChildSize = () => {
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemCount * itemSize;
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={getChildSize}
                    itemCount={itemCount}
                    overscanCount={5}
                    itemData={itemData}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

const CustomAutocomplete = ({
                                label = "Select an option",
                                placeholder = "Start typing...",
                                fetchOptions,
                                staticOptions,
                                isOptionEqualToValue = (option, value) => option.Ref === value.Ref,
                                getOptionLabel = (option) => option.description,
                                disabled = false,
                                setSelectedOption
                            }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const fetchHandler = async (inputValue) => {
        if (fetchOptions) {
            setLoading(true);
            try {
                const response = await fetchOptions(inputValue);
                setOptions(response);
            } catch (error) {
                console.error("Error fetching options", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const debounceFetchOptions = useCallback(debounce(fetchHandler, 300), []);

    useEffect(() => {
        return () => {
            debounceFetchOptions.cancel();
        };
    }, [debounceFetchOptions]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={staticOptions && staticOptions.length !== 0 ? staticOptions : options}
            loading={loading}
            disabled={disabled}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            onChange={(event, newValue) => {
                setSelectedOption(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                debounceFetchOptions(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            ListboxComponent={React.forwardRef((props, ref) => (
                <ListboxComponent {...props} ref={ref}/>
            ))}
        />
    );
};

export default CustomAutocomplete;