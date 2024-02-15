import * as React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography
} from '@mui/joy'

import ConditionEditor from './condition/ConditionEditor.jsx'
import RewardEditor from './reward/RewardEditor.jsx'
import DeleteDialog from '../inputs/DeleteDialog.jsx'
import {FiTrash} from 'react-icons/fi'
import TextInput from '../inputs/TextInput.jsx'
import Toggle from '../inputs/Toggle.jsx'

export default function StageEditor({stage, updateStageData, deleteStage}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  return (
    <>
      <Accordion sx={{
        '&:last-child': {
          borderBottomWidth: 0,
        }
      }}>
        <AccordionSummary>
          <Typography level="h5" component="h4">Stage {stage.StageID}</Typography>
        </AccordionSummary>
        <AccordionDetails variant="soft">
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem 1rem'
          }}>
            <TextInput name="StageID" label="Stage ID" type="number" value={stage.StageID} onChange={updateStageData}/>
            <TextInput name="name" label="Name" value={stage.name} onChange={updateStageData}/>
            <TextInput name="description" label="Description" value={stage.description} onChange={updateStageData}/>
            <TextInput name="Objective" label="Objective Localization Key" value={stage.Objective}
                       onChange={updateStageData}/>
            <Toggle name="DisplayObjective" label="Display Objective" value={stage.DisplayObjective}
                    onChange={updateStageData}/>
            <Toggle name="RevealObjectiveOnActivate" label="Reveal Objective On Activate"
                    value={stage.RevealObjectiveOnActivate} onChange={updateStageData}/>

            <Typography level="h5" component="h3">Condition</Typography>
            <ConditionEditor/>

            <Typography level="h5" component="h3">Mission Rewards</Typography>
            <RewardEditor/>

            <Button variant="outlined" color="danger" startDecorator={<FiTrash/>}
                    onClick={() => setDeleteDialogOpen(true)}>
              Delete stage {stage.StageID}
            </Button>

            <DeleteDialog labelToDelete={`stage ${stage.StageID}`} open={deleteDialogOpen}
                          onClose={() => setDeleteDialogOpen(false)} onDelete={() => deleteStage()}/>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}