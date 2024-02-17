import Autocomplete from '@mui/joy/Autocomplete'
import {AutocompleteOption, createFilterOptions, FormControl, FormLabel, ListItemContent, Typography} from '@mui/joy'

export default function ComplexAutocompleteInput({name, label, options, value, onChange, ...props}) {
  const filterOptions = createFilterOptions({
    stringify: (option) => option.label + option.description + option.type
  })

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        freeSolo
        name={name}
        options={options.sort((a, b) => -b.category.localeCompare(a.category) || -b.label.localeCompare(a.label))}
        value={value || null}
        onChange={(_, newValue) => {
          console.log('newValue', newValue)
          onChange(name, newValue.type)
        }}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.type}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <ListItemContent sx={{fontSize: 'sm'}}>
              {option.label}
              <Typography level="body-xs">
                {option.description}
              </Typography>
            </ListItemContent>
          </AutocompleteOption>
        )}
        filterOptions={filterOptions}
        {...props}
      />
    </FormControl>
  )
}