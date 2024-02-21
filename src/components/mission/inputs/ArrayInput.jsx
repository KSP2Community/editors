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
import {useState} from 'react'

import WarningDialog from './WarningDialog.jsx'
import {truncate} from '../../../utils/strings.js'

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
  const [deleteDialogOpenIndex, setDeleteDialogOpenIndex] = useState(-1)

  return <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <Typography level={`h${5 + level}`} component={`h${3 + level}`} sx={{
        m: 0,
        alignSelf: 'center'
      }}>{title}</Typography>
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
            <Accordion key={item.__uuid || index} sx={{
              '&:last-child': {
                borderBottomWidth: 0,
              }
            }}>
              <AccordionSummary>
                <Typography level="h5" component="h3" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {itemTitleText}
                </Typography>
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
                    Delete &quot;{truncate(itemTitleText, 50)}&quot;
                  </Button>
                  <WarningDialog title="Confirmation"
                                 content={`Are you sure you want to delete "${truncate(itemTitleText, 50)}"`}
                                 open={deleteDialogOpenIndex === index} closeText="Cancel" confirmText="Delete"
                                 onClose={() => setDeleteDialogOpenIndex(-1)}
                                 onConfirm={() => deleteData(index)}
                  />
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