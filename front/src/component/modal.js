import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ModalTodo ({todo, open, setOpen}) {
    const handleClose = () => {
        setOpen(!open)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if (todo && open === false) {
        return null
    } else {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {todo.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {todo.description}
                    </Typography>
                </Box>
            </Modal>
        )
    }
}