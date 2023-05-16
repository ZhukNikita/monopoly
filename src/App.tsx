import React, {FC, useContext, useEffect, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Loader from './components/Loader/Loader'
import Cabinet from "./pages/Cabinet/Cabinet";

const App:FC = () => {
    const [isLoginModalOpen , setIsLoginModalOpen] = useState(false)
    const [isRegistrationModalOpen , setIsRegistrationModalOpen] = useState(false)
    const {store} = useContext(Context);
    useEffect(()=>{
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    },[])
    if(store.isLoading && !isRegistrationModalOpen && !isLoginModalOpen){
        return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Loader width={'30%'}/>
        </div>
    }
    return (
    <div className="App">
        <Routes>
          <Route path={'/'} element={<Home
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
              isLoginModalOpen={isLoginModalOpen}
              isRegistrationModalOpen={isRegistrationModalOpen}
          />}/>
            <Route path={'/cabinet/:id'} element={<Cabinet
                setIsLoginModalOpen={setIsLoginModalOpen}
                setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                isLoginModalOpen={isLoginModalOpen}
                isRegistrationModalOpen={isRegistrationModalOpen}
            />}/>
        </Routes>
    </div>
  );
}

export default observer(App);
