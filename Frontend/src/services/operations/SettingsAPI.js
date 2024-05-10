import {toast} from "react-hot-toast"
import{setUser} from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import {logout} from "./authAPI"
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
  } = settingsEndpoints
  


export function updateDisplayPicture(token,formData){
    console.log("token in update display-",token);
    
    return async(dispatch)=>{
        const toastId =toast.loading("Loading...")

        try {
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,
                {
                    "content-Type":"multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            )
            //checking the updated api ;
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE.....",
                response
            )

            //check if response is not found 
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            //return successfull status...
            toast.success("Display PIcture Updated Successfully")
            dispatch(setUser(response))
            


        } catch (error) {
            console.log("UDPATE_DISPLAY_PICTUREAPI API ERROR.....",error)
            toast.error("Could Not Updated Display Picture");

            
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token,formData){
    return async(dispatch) =>{
       const toastId=toast.loading("Loading...");
       try {
        const response =await apiConnector("PUT",UPDATE_PROFILE_API,formData,{
            Authorization:`Bearer ${token}`,

        })
        console.log("UPDATE_PROFILE_API API RESPOSNE.........",response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        const userImage=response.data.updatedUserDetails.image?
              response.data .updatedUserDetails.image
              :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
              dispatch(
                setUser({...response.data.updatedUserDetails,image:userImage})
              )
              toast.success("Profile Updated Successfully")

       } catch (error) {
         console.log("UPDATE_PROFILE_API API ERROR.......",error)
         toast.error("Could Not Update Profile")
       }
       toast.dismiss(toastId)
    }

}

export async function changePassword(token,formData){
    const toastId=toast.loading("Loading...");
    try {
        const response=await apiConnector("PUT",CHANGE_PASSWORD_API,formData,{
            Authorization:`Bearer ${token}`,
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE.....",response)
        if (!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Password change successfully ")


    } catch (error) {
        console.log("CHANGE_PASSWORD_API API ERROR.......",error)
        toast.error(error.respose.data.message)

        
    }
    toast.dismiss(toastId)
}

export async function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading....")
        try {
            const response =await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization: `Bearer ${token}`,

            })
            console.log("DELETE_PROFILE_API API RESPONSE.....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted successfully ")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR.....",error)
            toast.error("Could Not Delete Profile");
        }
        toast.dismiss(toastId)
    }
}
