import {Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog} from '@mui/joy'
import {FiAlertTriangle} from 'react-icons/fi'

export default function WarningDialog({title, content, open, closeText, confirmText, onClose, onConfirm}) {
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
          {title}
        </DialogTitle>
        <Divider/>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => {
            onConfirm()
            onClose()
          }}>
            {confirmText}
          </Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            {closeText}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}