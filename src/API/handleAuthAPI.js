import axiosInstance from "@/utils/axiosInstance";

const signUp = async (newUserData) => {
  try {
    const response = await axiosInstance.post("sign-up", newUserData);
    if (response.data.user) {
      location.assign("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const logIn = async (userData) => {
  try {
    const response = await axiosInstance.post("log-in", userData);
    // if (response.data.user) {
    //   location.assign("/");
    // }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { signUp, logIn };
