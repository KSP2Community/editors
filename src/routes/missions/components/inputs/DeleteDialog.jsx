import {Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog} from '@mui/joy'
import {FiAlertTriangle} from 'react-icons/fi'

export default function DeleteDialog({labelToDelete, open, onClose, onDelete}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <DialogTitle>
          <FiAlertTriangle/>
          Confirmation
        </DialogTitle>
        <Divider/>
        <DialogContent>
          Are you sure you want to delete {labelToDelete}?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => {
            onDelete()
            onClose()
          }}>
            Delete
          </Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}