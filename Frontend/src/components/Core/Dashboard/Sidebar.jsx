import {useState} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from "../../../data/dashboard-links";




export default function Sidebar(){
    const {user,loading :profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigation =useNavigate();
    //to keep tarck of confirmation modal

    cosnt [confirmationModal,setConformationModal]=useState(null)

    if(profileLoading || authLoading){
        return(
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <>
        <div className="flex h-[calc(100hv-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
            <div className="flex flex-col">
                {sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType!==link.type) return null;
                    return (
                        <sidebarLinks key={link.id} link={link} iconName={link.icon}/>
                    )
                })
                }
            </div>
        </div>


        
        
        
        </>
    )



}