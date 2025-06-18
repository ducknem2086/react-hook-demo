import React, { type ReactNode } from 'react'
import { type ITodo, todoReducer } from "~/todo/state";


export const TodoContext = React.createContext<{
    todos: ITodo[]
    dispatch: any
}>({
    todos: [],
    dispatch: undefined
});


export const TodoProvider = ({children}: {
    children: ReactNode
}) => {
    const [todos, dispatch] = React.useReducer(todoReducer, []);
    return (
        <TodoContext.Provider value={{todos, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}
