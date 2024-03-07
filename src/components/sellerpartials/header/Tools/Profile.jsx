import { useSelector } from "react-redux";
import NoProfile from "@/assets/images/avatar/NoProfile.png"
import { userProfile } from "@/constant/apiRoutes";


const Profile = () => {
  const {user} = useSelector(state => state.auth)  
  
  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src={user.profile ? `${userProfile}/${user.profile}` : NoProfile}
            alt={`${user?.first_name} ${user?.last_name}`}
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap block">
          {`${user?.first_name} ${user?.last_name}`}
        </span>
      </div>
    </div>
  );
};

export default Profile;
