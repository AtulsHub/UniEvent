import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/userSlice";

const GoogleLoginButton = (prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/users/google",
          {
            access_token: tokenResponse.access_token, // ✅ real access token
          },
          { withCredentials: true }
        );

        // console.log("User:", res.data.user);

        dispatch(login({ userData: res.data.user })); // Assuming you have a login action in your Redux store
        navigate("/");
      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
    flow: "implicit", // keep it simple for client-side token
  });

  return (
    <button
      onClick={() => loginByGoogle()}
      className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition shadow-sm"
    >
      {prop.children}
    </button>
  );
};

export default GoogleLoginButton;
