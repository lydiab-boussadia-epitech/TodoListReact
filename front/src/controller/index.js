import axios from "axios";

export const handleStatus = (check) => {
    axios.put('http://localhost:3000/status/?id=' + check._id, {status: check.status ? !check.status : true})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export const handleCreate = ({todoOne, setTodoOne}) => {
    axios.post('http://localhost:3000/', {name: todoOne.name, description: todoOne.description})
        .then(response => {
            setTodoOne("")
        })
        .catch(error => {
            console.log(error)
        })
}

export const handleDelete = (item, {setRefreshDelete}) => {
    axios.delete('http://localhost:3000/?id=' + item)
        .then(response => {
            console.log(response.data)
            setRefreshDelete(true)
        })
        .catch(error => {
            console.log(error)
        })
}

export const handleUpdate = ({todoOne, setTodoOne, setModify}) => {
    axios.put('http://localhost:3000/?id=' + todoOne._id, {name: todoOne.name, description: todoOne.description})
        .then(response => {
            setModify(false)
            setTodoOne({name: ""})
            setTodoOne({name: ""})
        })
        .catch(error => {
            console.log(error)
        })
}