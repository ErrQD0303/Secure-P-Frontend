import {
  CancelButton,
  DeleteButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTransition,
} from "./DeleteParkingLocationDialog.style";

export interface UpdateParkingLocationDialogProps {
  parkingLocationId: string | null;
  open: boolean;
  handleClose?: () => void;
  handleSubmit?: () => void;
}

function DeleteParkingLocationDialog({
  parkingLocationId,
  open,
  handleClose,
  handleSubmit,
}: UpdateParkingLocationDialogProps) {
  return (
    <StyledDialog
      open={open}
      TransitionComponent={StyledTransition}
      // keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledDialogTitle>Delete Parking location</StyledDialogTitle>
      <StyledDialogContent>
        Do you want to delete this parking location with id: {parkingLocationId}
        ?
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={handleClose} />
        <DeleteButton onClick={handleSubmit} />
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default DeleteParkingLocationDialog;
