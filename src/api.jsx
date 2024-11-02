
import axios from 'axios';

const api = {
  getUsers: async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  },
  createUser: async (user) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
    return response.data;
  },

  updateUser: async (id, user) => {
    const users = await getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
    return user;
  },


  deleteUser: async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
  },
};

export const getUsers = api.getUsers;
export const createUser = api.createUser;
export const updateUser = api.updateUser;
export const deleteUser = api.deleteUser;