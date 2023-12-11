import * as React from 'react';
import {useState, useEffect} from "react"
import axios from "axios"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function CheckboxList() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(response => {
                console.log(response.data)
                setTodos(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    const [checked, setChecked] = React.useState([0]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(!open);

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

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const handleDelete = (item) => {
        console.log("id", item)

        axios.delete('http://localhost:3000/?id=' + item)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {todos.map((todo, index) => {
                const labelId = `checkbox-list-label-${todo.name}`;


                return (
                    <ListItem
                        key={index}
                        onClick={handleClose}
                        secondaryAction={
                            <>
                                <IconButton aria-label="comments">
                                    <CommentIcon/>
                                </IconButton>
                                <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(todo._id)}>
                                    <DeleteIcon/>

                                </IconButton>
                            </>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(todo)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(todo._id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${todo.name}`}/>
                        </ListItemButton>
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
                    </ListItem>

                );
            })}
        </List>
    );
}


