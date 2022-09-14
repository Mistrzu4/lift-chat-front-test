import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const { forwardRef, useImperativeHandle } = React;

export default forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    useImperativeHandle(ref, () => ({
        openDialog() {
            handleClickOpen();
        }
    }));

    const handleClickDelete = () => {
        sessionStorage.setItem("nickname", '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.onNicknameSave();
        setOpen(false);
    };

    const handleChangeNickname = (event) => {
        props.onNickname(event.target.value);
    };


    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickDelete}>
                usuń nickname
            </Button> */}
            <Dialog open={open}>
                <DialogTitle>Wpisz swoja nazwę</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        variant="standard"
                        value={props.nickname}
                        onChange={handleChangeNickname}
                        inputProps={{ maxLength: 20 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})