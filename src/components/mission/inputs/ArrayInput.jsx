import {
  Accordion,
  AccordionDetails,
  accordionDetailsClasses,
  AccordionGroup, AccordionSummary,
  accordionSummaryClasses,
  Box, Button,
  IconButton,
  Tooltip,
  Typography
} from '@mui/joy'
import {FiPlus, FiTrash} from 'react-icons/fi'
import * as React from 'react'

import DeleteDialog from './DeleteDialog.jsx'

export default function ArrayInput(
  {
    title,
    addButtonText,
    addButtonClick,
    array,
    renderComponent,
    noItemsText,
    itemTitle,
    updateData,
    deleteData,
    level = 0
  }
) {
  const [deleteDialogOpenIndex, setDeleteDialogOpenIndex] = React.useState(-1)

  return <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <Typography level={`h${5 + level}`} component={`h${3 + level}`}>{title}</Typography>
      <Tooltip title={addButtonText}>
        <IconButton onClick={addButtonClick}>
          <FiPlus/>
        </IconButton>
      </Tooltip>
    </Box>

    <AccordionGroup
      variant="outlined"
      sx={{
        flexGrow: 0,
        borderRadius: 'lg',
        [`& .${accordionSummaryClasses.button}:hover`]: {
          bgcolor: 'transparent !important',
        },
        [`& .${accordionDetailsClasses.content}`]: {
          boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider} !important`,
          [`&.${accordionDetailsClasses.expanded}`]: {
            paddingBlock: '0.75rem',
          },
        },
      }}
    >
      {array.length
        ? array.map((item, index) => {
          const itemTitleText = typeof itemTitle === 'function'
            ? itemTitle({item, index})
            : itemTitle

          return (
            <Accordion key={index} sx={{
              '&:last-child': {
                borderBottomWidth: 0,
              }
            }}>
              <AccordionSummary>
                <Typography level="h5" component="h3">{itemTitleText}</Typography>
              </AccordionSummary>
              <AccordionDetails variant="soft">
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem 1rem'
                }}>
                  {renderComponent({item, index, updateData: updateData(index)})}
                  <Button variant="outlined" color="danger" startDecorator={<FiTrash/>}
                          onClick={() => setDeleteDialogOpenIndex(index)}>
                    Delete {itemTitleText}
                  </Button>
                  <DeleteDialog labelToDelete={itemTitleText} open={deleteDialogOpenIndex === index}
                                onClose={() => setDeleteDialogOpenIndex(-1)} onDelete={() => deleteData(index)}/>
                </Box>
              </AccordionDetails>
            </Accordion>
          )
        })
        : <Typography sx={{
          textAlign: 'center',
          color: 'text.tertiary',
          m: '0.5rem'
        }}>{noItemsText}</Typography>}
    </AccordionGroup>
  </>
}