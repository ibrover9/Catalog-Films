import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userReduce } from "../store/userReducer";

export default function ButtonWithModalWindow() {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const { CHANGE_TOKEN_CATALOG_FILMS } = userReduce.actions;
  console.log(1);

  function handleCookie() {
    dispatch(CHANGE_TOKEN_CATALOG_FILMS(token));
  }

  function handleToken(event) {
    setToken(event.target.value);
  }

  const styleModalWindow = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "150px",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>{"Enter"}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={"modal-enter-a-token"}
        aria-describedby={"input-token"}
      >
        <Box sx={styleModalWindow}>
          <Typography id={"modal-enter-a-token"} variant="h6" component="h2">
            {"Enter a token"}
          </Typography>
          <Typography id={"input-token"} sx={{ mt: 2 }}>
            <TextField
              id="standard-basic"
              label={"Token"}
              variant="standard"
              sx={{ width: "400px" }}
              onChange={handleToken}
              value={token}
            />
            <Box textAlign="right" margin="30px 0 10px 150px">
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="text" onClick={handleCookie}>
                Send
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
