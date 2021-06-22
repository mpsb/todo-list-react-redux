import { createSlice } from '@reduxjs/toolkit';
import { fetchList } from './listAPI';

const initialState = {
  value: [],
  status: 'idle',
};

export const listSlice = createSlice({
    name: 'todo', 
    initialState,

    reducers: {
        getInitialList: (state, action) => {
            state.loading = 'idle';
            state.value = action.payload.slice(0,10);
        },
        listLoading: (state, action) => {
            if(state.loading === 'idle') {
                state.loading = 'pending';
            }
        },
        addToList: (state, action) => {
            state.value.push(action.payload);
            console.log(state.value);
        },
        deleteFromList: (state, action) => {
            let toDoList = action.payload[0].slice();
            let itemToDelete = action.payload[1];
            let toDeleteIndex = toDoList.indexOf(itemToDelete);
            toDoList.splice(toDeleteIndex, 1);
            state.value = toDoList;
        },
        changeListItemStatus: (state, action) => {
            let toDoList = action.payload[0].slice();
            let itemToUpdateIndex = toDoList.indexOf(action.payload[1]);

            toDoList = toDoList.map(item => {
                console.log(item);
                if(toDoList.indexOf(item) === itemToUpdateIndex) {
                   return {...item, completed: !item.completed};
                }
                else {
                    return item;
                }
            });

            console.log(toDoList)
            state.value = toDoList;
        },
    },
},
);

export const { listLoading, getInitialList, addToList, deleteFromList, changeListItemStatus } = listSlice.actions;

export const fetchInitialList = () => async (dispatch) => {
    dispatch(listLoading());
    const response = await fetchList();
    dispatch(getInitialList(response));
}

export const selectList = (state) => state.list.value;

export default listSlice.reducer;