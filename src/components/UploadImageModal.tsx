import { Box, BoxProps, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import uploadIcon from "/upload-icon.png";
import { uploadAvatar } from "../services/uploadService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setAvatar } from "../store/userSlice";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  top: "50%",
  left: "50%",
  width: "70%",
  height: "70vh",
  transform: "translate(-35%, -50%)",
  position: "absolute",
  zIndex: theme.zIndex.modal,
  display: "flex",
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  display: "flex",
}));

const CloseModalButton = styled(Button)(() => ({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  zIndex: 1000,
}));

const DropZone = styled(Box)<{
  component?: React.ElementType;
  htmlFor?: string;
}>(({ theme }) => ({
  padding: "1.875rem",
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  cursor: "pointer",
  border: "2px dashed #000",
  borderRadius: theme.shape.borderRadius,
  position: "relative",
}));

const FileInput = styled(Box)<{
  id: string;
  component?: React.ElementType;
  type?: string;
  accept?: string;
}>(() => ({
  display: "none",
}));

const UploadImage = styled("img")(() => ({}));

const DragAndDropText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.25rem",
  textAlign: "center",
  fontWeight: theme.typography.fontWeightBold,
  marginTop: theme.spacing(1),
}));

const SpanUploadImageFromComputer = styled("span")(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: "1rem",
  textAlign: "center",
  fontWeight: theme.typography.fontWeightBold,
  marginTop: theme.spacing(4),
}));

const UploadButton = styled(Button)(() => ({
  position: "absolute",
  top: "90%",
  right: "50%",
  transform: "translate(50%, -50%)",
}));

type Props = BoxProps & {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function UploadImageModal({ setShowModal, ...props }: Props) {
  const [showUploadButton, setShowUploadButton] = React.useState(false);
  const [image, setImage] = React.useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = React.useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleImageUpload = React.useCallback(() => {
    const dropZone = document.getElementById("dropZone");
    if (!dropZone) return;
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (!fileInput) return;
    const file = fileInput.files?.item(0);
    if (!file) return;
    setImage(file);
    const fileUrl = URL.createObjectURL(file);

    dropZone.style.background = `url(${fileUrl}) center center no-repeat`;
    dropZone.style.backgroundSize = "cover";
    dropZone.style.border = "none";
    dropZone.textContent = "";

    const upLoadButton = document.getElementById("uploadButton");
    if (!upLoadButton) return;
    setShowUploadButton(true);
  }, [setShowUploadButton]);

  const handleImageDrag = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleImageDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const fileInput = document.getElementById(
        "fileInput"
      ) as HTMLInputElement;
      if (!fileInput) return;
      fileInput.files = e.dataTransfer?.files;
      handleImageUpload();
    },
    [handleImageUpload]
  );

  const handleUploadButtonClick = React.useCallback(async () => {
    if (!image) return;
    const avatarUrl = await uploadAvatar(image);

    if (avatarUrl !== null) dispatch(setAvatar(avatarUrl));
    handleCloseModal();
    location.reload();
  }, [image, handleCloseModal, dispatch]);

  return (
    <StyledPaper elevation={3}>
      <CloseModalButton
        variant="contained"
        color="error"
        aria-label="Close modal"
        onClick={handleCloseModal}
      >
        X
      </CloseModalButton>
      <StyledContainer {...props}>
        <DropZone
          component="label"
          htmlFor="fileInput"
          id="dropZone"
          onDragOver={handleImageDrag}
          onDrop={handleImageDrop}
        >
          <FileInput
            id="fileInput"
            component="input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <UploadImage src={uploadIcon} />
          <DragAndDropText>
            Drag and drop your image here <br />
            To upload your image
          </DragAndDropText>
          <SpanUploadImageFromComputer>
            Upload any images from your device
          </SpanUploadImageFromComputer>
        </DropZone>
        <UploadButton
          variant="contained"
          color="primary"
          id="uploadButton"
          aria-label="Upload your image"
          disabled={!showUploadButton}
          sx={{
            display: showUploadButton ? "block" : "none",
          }}
          onClick={handleUploadButtonClick}
        >
          Upload
        </UploadButton>
      </StyledContainer>
    </StyledPaper>
  );
}

export default UploadImageModal;
