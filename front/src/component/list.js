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
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {TextField} from "@mui/material";
import ModalTodo from "./modal";
import {handleCreate, handleDelete, handleStatus, handleUpdate} from "../controller";
import {red} from "@mui/material/colors";

export default function CheckboxList() {
    const [todos, setTodos] = useState([]);
    const [todoOne, setTodoOne] = useState({
        "_id": null,
        "name": "",
        "description": "",
        "status": false
    });
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([0])
    const [modify, setModify] = useState(false)
    const [refreshDelete, setRefreshDelete] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(response => {
                console.log("test")
                setChecked(response.data.filter((filterData) => filterData.status === true))
                setTodos(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        setRefreshDelete(false)
    }, [checked.length, modify, todoOne, refreshDelete]);

    const handleOpen = () => setOpen(true);

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        handleStatus(value)

        setChecked(newChecked);
    };

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <span style={{display: "grid", justifyContent: "center"}}>
        <TextField id={"name"} label="Titre" variant="standard" value={todoOne.name || ""}
                   onChange={(e) => {
                       setTodoOne({
                           ...todoOne,
                           name: e.target.value
                       })
                   }}/>
            <TextField id={"description"} label="Description" variant="standard" value={todoOne.description || ""}
                       onChange={(e) => {
                           setTodoOne({
                               ...todoOne,
                               description: e.target.value
                           })
                       }}/>
                {modify ?
                    <>
                        <ListItemButton role={undefined} dense sx={{textAlign: "center"}} className={"bottom"}
                                        onClick={() => handleUpdate({todoOne, setTodoOne, setModify})}>
                            <ListItemText primary={"Modifier"}>
                            </ListItemText>
                        </ListItemButton>
                    </>

                    :
                    <>
                        <ListItemButton role={undefined} dense  sx={{textAlign: "center"}} className={"bottom"}
                                        onClick={() => handleCreate({todoOne, setTodoOne})}>
                            <ListItemText primary={"Ajouter"}  >
                            </ListItemText>
                        </ListItemButton>
                    </>
                }
                    </span>
                {todos.sort((a, b) => {
                    return a.status - b.status
                }).map((todo, index) => {
                    const labelId = `checkbox-list-label-${todo.name}`;


                    return (
                        <ListItem
                            className={todo.status ? "finishTask" : ""}
                            key={index}
                            secondaryAction={
                                <>

                                    <ModalTodo todo={todoOne} open={open} setOpen={setOpen}/>
                                    <IconButton edge="end" aria-label="update" onClick={() => {
                                        setModify(true)
                                        setTodoOne(todo)
                                    }}
                                                sx={{mr: 0.5}}>
                                        <ModeEditIcon/>

                                    </IconButton>


                                    <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(todo._id, {setRefreshDelete})}>
                                        <DeleteIcon sx={{color: red[500]}}/>

                                    </IconButton>
                                </>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemIcon onClick={() => handleToggle(todo)}>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(todo) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': labelId}}
                                        disabled={todo.status ? true : false}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${todo.name}`} onClick={() => {
                                    setTodoOne(todo)
                                    handleOpen()
                                }}/>
                            </ListItemButton>
                        </ListItem>

                    );
                })}
        </List>
    );
}