import React, { useEffect, useState } from 'react';
import {
    fetchInitialList,
    selectList, addToList, deleteFromList, changeListItemStatus
} from './listSlice';
import { useDispatch, useSelector } from 'react-redux';

export function ToDoList() {
    const toDoList = useSelector(selectList);
    const dispatch = useDispatch();
    const [inputListItem, setInputListItem] = useState('');
    const [category, setCategory] = useState('all');

    const listItem = {
        "userId": 1,
        "title": inputListItem,
        "completed": false
    };

    useEffect(() => {
        dispatch(fetchInitialList());
    }, []); // to get initial list

    return (
        <div>
            <input
                type="text"
                value={inputListItem}
                onChange={(e) => setInputListItem(e.target.value)}>
            </input>
            <button onClick={() => dispatch(addToList(listItem))}>
                Add
            </button>
            <br></br>
            <button onClick={() => setCategory('all')}>All</button>
            <button onClick={() => setCategory('active')}>Active</button>
            <button onClick={() => setCategory('completed')}>Completed</button>
            <br></br>
            {toDoList.filter(item => {
                if (category === 'active') {
                    return item.completed === false;
                }
                else if (category === 'completed') {
                    return item.completed === true;
                }
                return item;
            }).map((item) =>
                <span>{item.completed ?

                    <p className='completed strikethrough'>{item.title}<input type='checkbox' onClick={() => {
                        dispatch(changeListItemStatus([toDoList, item]))
                    }} checked></input> <button onClick={() => dispatch(deleteFromList([toDoList, item]))}>Delete</button></p>
                    :

                    <p className='active'>{item.title} <input type='checkbox' onClick={() => {
                        dispatch(changeListItemStatus([toDoList, item]))
                    }}></input> <button onClick={() => dispatch(deleteFromList([toDoList, item]))}>Delete</button> </p>
                }
                    <br></br>
                </span>)}
        </div>
    );
};