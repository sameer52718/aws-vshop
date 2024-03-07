import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { resellerVerifyRecovery} from "../../../constant/apiRoutes";
import { websiteRoutes } from "../../../constant/routes";
import { setAuth } from "../../../store/auth/store";

const Recover = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(resellerVerifyRecovery, {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          setError(false);
          dispatch(setAuth({ token: data.token, user: null, userType: null }));
          setTimeout(() => {
            navigate(websiteRoutes.resellerChangePassword);
          }, 5000);
        } else if (data.error === true) {
          setError(true);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [dispatch, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && (
          <p className="text-red-500">
            The link is expired or invalid. Please request a new recovery link.
          </p>
        )}
        {!isLoading && !error && (
          <p className="text-green-500">
            Verification successful! Redirecting to change password page in 5
            seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Recover;
