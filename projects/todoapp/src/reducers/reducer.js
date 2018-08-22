import { ADD_TASK, LOAD_LIST, TOGGLE_CHECK } from '../actions/tasks'

const DEFAULT_STATE = {
        tasks: [],
        showDone: true
};


const todoReduser = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {...state, action};

        case LOAD_LIST:
            return {...state, ...action.payload};
    
        case TOGGLE_CHECK:
            return state.map(item => item.id !== action.payload ? item : {...item, done: !item.done});
        default:
            return state;
    }
}

export default todoReduser;