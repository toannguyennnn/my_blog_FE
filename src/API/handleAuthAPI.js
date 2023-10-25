import axiosInstance from "@/utils/axiosInstance";
import router from "@/router";

const signUp = async (newUserData) => {
  try {
    const response = await axiosInstance.post("sign-up", newUserData);
    if (response.data.user && response.token) {
      const currentUser = {
        id: response.data.user.id,
        fullname: response.data.user.fullname,
        email: response.data.user.email,
        userGroupId: response.data.user.userGroup_id,
      };
      const token = response.token;

      localStorage.setItem("token", `${token}`);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      router.push("/");
    }
    // console.log("get user", JSON.parse(localStorage.getItem("currentUser")));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const logIn = async (userData) => {
  try {
    const response = await axiosInstance.post("log-in", userData);
    if (response.data.user && response.token) {
      const currentUser = {
        id: response.data.user.id,
        fullname: response.data.user.fullname,
        email: response.data.user.email,
        userGroupId: response.data.user.userGroup_id,
      };
      const token = response.token;

      localStorage.setItem("token", `${token}`);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      router.push("/");
    }
    // console.log("get user", JSON.parse(localStorage.getItem("currentUser")));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { signUp, logIn };
