import React ,{createContext , useState} from 'react';


export let DataContext = createContext('');
const DataContextProvider=(props)=> {
  

  return (
    <DataContext.Provider value={'hi'}>
        {props.children}
    </DataContext.Provider>
  )
}
export default DataContextProvider;