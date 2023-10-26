import axiosInstance from "@/utils/axiosInstance";
import router from "@/router";

const createUser = async (newUserData) => {
  try {
    return await axiosInstance.post("create-user", newUserData);
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (currentPage, limit) => {
  try {
    return await axiosInstance.get(
      `users/all?page=${currentPage}&limit=${limit}`
    );
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userId, updatedData) => {
  try {
    return await axiosInstance.put(`edit-user/${userId}`, updatedData);
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (userId) => {
  try {
    return await axiosInstance.delete(`delete-user/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

export default { createUser, getUsers, updateUser, deleteUser };
