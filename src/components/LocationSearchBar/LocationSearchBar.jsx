//Get the result from the autocomplete
//Country will probably be the last section
//Then city will be second to last?
//Second to last will be state....
//Hopefully that works in enough cases

import * as React from 'react';
import axios from 'axios'
import './LocationSearchBar.css'
import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

export default function LocationSearchBar() {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { 'country': 'US' }
        }
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = (val) => {
        setValue(val, false);
        console.log(val)
        //Extracting state and city from address
        const state = val.substring(val.length - 7, val.length - 5)
        console.log(state)
        const short_address = val.substring(0, val.length - 9)
        const city = short_address.substring(short_address.lastIndexOf(", ")+2)
        console.log(city)


    };

    return (
        <Combobox onSelect={handleSelect} aria-labelledby="demo">
            <ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder={"Enter an address"} />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};