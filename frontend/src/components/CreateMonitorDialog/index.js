import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box } from "@mui/material";
import useAPI from "../../hooks/useAPI";

export default function CreateMonitorDialog({ nickname, date }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);

  const { post } = useAPI();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
    setIsDone(false);
    setName("");
    setEmail("");
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      await post("/monitor", {
        email,
        name,
        nickname,
        availablenickdate: date,
      });
      setIsDone(true);
      setTimeout(() => handleClose(), 3000);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Box textAlign="center" marginTop={2}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Save the date! (mail me)
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save the date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We'll send you an email one day before the nickname availability
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="filled"
            color="warning"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            color="warning"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubscribe}>
            Subscribe
          </Button>
        </DialogActions>
        {isDone && (
          <Alert severity="success">
            Done! We'll send an email when the day comes
          </Alert>
        )}
      </Dialog>
    </Box>
  );
}
