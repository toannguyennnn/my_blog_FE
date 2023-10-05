import axiosInstance from "@/utils/axiosInstance";

const createBlog = async (newBlogData) => {
  try {
    return await axiosInstance.post("create-blog", newBlogData);
  } catch (error) {
    console.error(error);
  }
};

const getBlogs = async () => {
  try {
    return await axiosInstance.get("blogs/all");
  } catch (error) {
    console.error(error);
  }
};

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

export default { createBlog,getBlogs };
