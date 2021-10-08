import axios from "axios"
const url = "http://localhost:4000/todos"
const urlpost = "http://localhost:4000/todos/post"

export const Readtodos = () => axios.get(url)
export const createTodo = newTodo => axios.post(urlpost, newTodo)
export const updateTodo = (id, updateTodo) => axios.patch(`${url}/${id}`, updateTodo)
export const deleteTodo = (id) => axios.delete(`${url}/${id}`)