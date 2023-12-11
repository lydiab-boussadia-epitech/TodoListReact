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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {TextField} from "@mui/material";

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
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);





    const [checked, setChecked] = React.useState([0]);



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
    const handleCreate = () => {

        axios.post('http://localhost:3000/', {name:name, description:description})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }



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
    const handleUpdate = (item) => {
        console.log("id", item)

        axios.put('http://localhost:3000/?id=' + item)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <TextField  id={"standard-basic"} label="Titre" variant="standard"  onChange={(e)=>{
                setName(e.target.value)
                console.log(e.target.value)
            }}/>
            <TextField id={"standard-basic"} label="Description" variant="standard" onChange={(e)=>{
                setDescription(e.target.value)
                console.log(e.target.value)}} />
            <ListItemButton role={undefined} dense   onClick={() => handleCreate()}>
                <ListItemText primary={"Ajouter"}>
                </ListItemText>
            </ListItemButton>
            {todos.map((todo, index) => {
                const labelId = `checkbox-list-label-${todo.name}`;


                return (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <>

                                <IconButton edge="end" aria-label="comments" onClick={() => handleUpdate(todo._id)}
                                            sx={{mr: 0.5}}>
                                    <ModeEditIcon/>

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
                                    checked={checked.indexOf(todo) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${todo.name}`}/>
                        </ListItemButton>
                    </ListItem>

                );
            })}
        </List>
    );
}


