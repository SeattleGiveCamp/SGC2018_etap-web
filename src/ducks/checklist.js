const CHECKED = 'CHECKED';



//action creators
export const checked = (listItem, boolean)  => ({
  type: CHECKED,
  payload: {[listItem]: !boolean},
});


//reducer

const initialState = {foo: false, bar: false, baz: false}

export default (state = initialState, action) => {

  let {type, payload} = action;

  switch(type) {
    case CHECKED: return {...state, ...payload}
    default: return state;
  }

};