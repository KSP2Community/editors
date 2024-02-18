import Autocomplete from '@mui/joy/Autocomplete'
import {
  AutocompleteOption,
  createFilterOptions,
  FormControl,
  FormLabel,
  ListItemContent,
  ListItemDecorator,
  Typography
} from '@mui/joy'
import {FiPlus} from 'react-icons/fi'

export default function ComplexAutocompleteInput({
  name,
  label,
  options,
  value,
  onChange,
  freeSolo,
  sort = false,
  ...props
}) {
  const filterOptions = createFilterOptions({
    stringify: (option) => option.label + option.description + option.value
  })
  const hasCategory = options.some(option => 'category' in option)
  sort = sort || hasCategory

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        {...{freeSolo}}
        {...props}
        name={name}
        options={sort
          ? options.sort((a, b) =>
            (hasCategory ? -b.category.localeCompare(a.category) : 0) || -b.label.localeCompare(a.label))
          : options}
        value={value || null}
        onChange={(_, newValue) => {
          onChange(name, newValue?.value ?? newValue?.inputValue ?? null)
        }}
        {...(hasCategory ? {groupBy: option => option.category} : {})}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return options.find(o => o.value === option)?.label ?? (option || null)
          }

          if (option.inputValue) {
            return option.inputValue
          }

          return option.label
        }}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            {'inputValue' in option && (
              <ListItemDecorator>
                <FiPlus/>
              </ListItemDecorator>
            )}
            <ListItemContent sx={{fontSize: 'sm'}}>
              {option.label}
              <Typography level="body-xs">
                {option.description}
              </Typography>
            </ListItemContent>
          </AutocompleteOption>
        )}
        filterOptions={(options, params) => {
          const filtered = filterOptions(options, params)

          if (freeSolo && params.inputValue !== '') {
            filtered.push({
              ...{
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`
              },
              ...(hasCategory ? {category: 'Add'} : {})
            })
          }

          return filtered
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value || option.value === value}
      />
    </FormControl>
  )
}