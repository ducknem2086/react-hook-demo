import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ButtonComponent from './component/button'
import { TodoContext } from './provider'

const mockDataFromCountNumber = (number: number) => {
    return Array.from({length: number}, (_, i) => {
        return {
            value: i + 1,
            title: 'key ' + (i + 1),
        }
    })
}


const functionList = new Set<() => void>([])

export const TodoComponent = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null)
    const [countEffect, setCountEffect] = useState(count);
    const [mockTitleRender, setMockTitleRender] = useState<string>('init');
    const {todos, dispatch} = useContext(TodoContext)

    useEffect(() => {
        setCountEffect(count);
    }, [count]);


    useEffect(() => {
        // interval thử nghiệm quá trị fn component này render
        // nếu giá trị title được gắn lại giống với giá trị trước thì biến lúc này
        // không thay đổi => các component dùng đến nó sẽ không bị đọc lại do chưa có
        // biến props nào thay đổi .

        let count = 0;
        const timer = setInterval(() => {
            if (count === 3) {
                clearInterval(timer);
            }
            setMockTitleRender(() => 'giảm');
            count++;

            console.log('timer run !!!', count)
            // nếu gắn giá trị mới thì toàn bộ các implemented đều được init lại
            // setMockTitleRender('giảm' + Math.random().toFixed(0));
        }, 2000)

    }, []);
    // const decrease = () => {
    //     setCount((state) => state + 1);
    // }
    // const increase = () => {
    //     setCount((state) => state - 1);
    // }


    /**
     * dùng use callback để tránh bị khởi tạo lại function
     * function chỉ khởi tạo lại khi giá trị trong deps thay đổi
     */
    const decrease = useCallback(() => {
        setCount(state => state + 1)
    }, [count])
    const increase = useCallback(() => {
        setCount(state => state - 1)
    }, [count])

    const trigger = useCallback(() => {
        decrease();
    }, [countEffect])

    // const trigger = () => {
    //     decrease();
    // }

    useEffect(() => {
        console.log('todo_________', todos)
    }, [todos]);


    const addTask = (e: any) => {
        if (e.code.toString().toLowerCase() === 'enter') {
            const content = inputRef.current?.value
            dispatch({
                type: 'ADD_TODO',
                payload: content ?? ""
            })
            if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus()
            }
        }

    }

    functionList.add(decrease)
    functionList.add(increase)
    console.log(functionList)

    const navigateToOtherPage = (e: Event | any) => {
        console.log('navigateToOtherPage')
        e.stopPropagation();
    }
    const removeTodo = (id: number) => {
        console.log('id', id)
        dispatch({
            type: 'DELETE_TODO',
            payload: id
        })
    }
    return (
        <div className={'max-w-[1200px] m-auto'}>
            <div className={'p-5 flex flex-col g-2'}>
                <h1 className={'text-center py-3'}>testing todolist with built-in hook ! <ButtonComponent
                    clickEvent={navigateToOtherPage} title={'navigate to other page !'}>

                </ButtonComponent></h1>
                <div>count : {countEffect}</div>
                <div className={'flex flex-row gap-3'}>
                    <ButtonComponent title={'Tăng'} clickEvent={trigger}/>
                    <ButtonComponent clickEvent={increase} title={mockTitleRender}/>
                </div>
            </div>
            <hr/>

            <div className={'p-5 flex flex-col g-2'}>
                <h1>todo list using useReducer and useContext</h1>
                <input ref={inputRef} type={'text'} className={'p-3 mt-3 bg-gray-700 text-purple-300'}
                       onKeyPress={addTask}/>
            </div>
            <div className={'p-5 flex flex-col g-2'}>
                {todos.length > 0 ? [...todos].map(item => {
                    return <div className={'flex flex-row gap-3 my-2 justify-between'}>
                        <h1>{item.text ?? ''}</h1>
                        <div className={'flex gap-2'}>
                            {/*chỗ này nếu không để key vào thì phần id bị cache do các item còn lại không bị render lại*/}
                            {/*JSX elements directly inside a map() call always need keys!*/}
                            {/*https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key*/}
                            <ButtonComponent key={item.id} clickEvent={() => removeTodo(item.id)} title={'Remove'}/>
                        </div>
                    </div>
                }):<h1>không có todo nào !</h1>}
            </div>

        </div>

    )
}