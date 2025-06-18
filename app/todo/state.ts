export interface ITodo {
    id: number
    text: string
    done: boolean
}

export type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }


export const todoReducer = (state: ITodo[] = [], action: TodoAction) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {id: Math.random(), text: action.payload, done: false}]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload ? {...todo, done: !todo.done} : todo
            )
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload)
        default:
            return state
    }
}
