import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Sidebar from "../components/Core/Dashboard/Sidebar"
  function Dashboard(){
    const {loading :profileLoading}=useSelector(state=>state.profile)
    const {loading :authLoading}=useSelector(state=>state.auth)

    // check if the profileLoading and the userLoasding is true
    if(profileLoading || authLoading){
      return <div className="flex justify-center items-center h-screen">
       <div className='spinner'></div>
      </div>
    }
    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <Sidebar/>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet/>
                </div>
            </div>
        </div>

    )


  }

  export default Dashboard;