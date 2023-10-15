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

// const getUsers = async () => {
//   try {
//     return await axiosInstance.get("users/all");
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateUser = async (userId, updatedData) => {
//   try {
//     return await axiosInstance.put(`edit-user/${userId}`, updatedData);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const deleteUser = async (userId) => {
//   try {
//     return await axiosInstance.delete(`delete-user/${userId}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

export default { signUp };
