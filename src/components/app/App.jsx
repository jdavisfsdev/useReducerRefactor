import React, { useReducer } from 'react';
          
const initialState = { 
  current: '#FF0000',
  before: [],
  after: [] 
};

function reducer(state, action) {

  switch(action.type) {
    case 'undo':
      return { ...state, 
        after: [state.current, ...state.after], 
        current: state.before[state.before.length - 1], 
        before: state.before.slice(0, -1) };
    case 'redo':
      return { ...state,
        before: [...state.before, state.current],
        current: state.after[0],
        after: state.after.slice(1)
      };
    case 'record':
      return { ...state,
        before: [...state.before, state.current],
        current: action.payload
      };   
  }
}
    
    
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button data-testid="undo" onClick={() => dispatch({ type: 'undo' })}>undo</button>
      <button data-testid="redo" onClick={() => dispatch({ type: 'redo' })}>redo</button>
      <input
        data-testid="input"
        type="color"
        value={state.current}
        onChange={({ target }) => dispatch({ type: 'record', payload: target.value })}
      />
      <div 
        data-testid="display"
        style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}

export default App;
