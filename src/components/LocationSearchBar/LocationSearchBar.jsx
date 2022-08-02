//Displays Google autocomplete textbox
//Get the result from the autocomplete
import * as React from 'react';
import './LocationSearchBar.css';
import usePlacesAutocomplete from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';

export default function LocationSearchBar({
  setAddress = () => {},
  cityState,
  setCityState = () => {},
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'US' },
    },
  });

  //Changes value in textbox
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  //Updates city and state after an address is selected
  const handleSelect = (val) => {
    setValue(val, false);
    setAddress(val);
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={'Enter an address'}
        className="input location-input"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
