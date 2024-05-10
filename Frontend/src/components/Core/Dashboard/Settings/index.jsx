import DeleteAccount from "./DeleteAccount";
import ChangeProfilePictiure from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";




export default  function Setting(){
    return(
        <>
        <h1 >
            Edit Profile

        </h1>
        {/* change profile picture */}
        <ChangeProfilePictiure/>
        {/* edit profile details */}
        <EditProfile/>
        {/* UpdatePassword */}
        <UpdatePassword/>
        {/* delete account */}
        <DeleteAccount/>


        </>
    )
}