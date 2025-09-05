 import { api } from "../lib/api";
import { User } from "../types/User";

export function useUserManagement()  { 
    
  // CREATE
  const createUser = async (userData:User) => {
    try {
      const response : User = (await api.post('/users', userData)).data;
      return response;
    } catch (error) {
      throw new Error('Error create user');
    }
  };

  // READ
  const getUsers = async (page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
      const response = await api.get('/users');
      let  allUsers:User[] = response.data;
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allUsers = allUsers.filter(user =>
          ((searchField=="all"||searchField=="username") && user.username.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="role") && user.role.toLowerCase().includes(term))/*||
          user.phone.toLowerCase().includes(term) ||
          (user.company?.name || '').toLowerCase().includes(term) ||
          (user.website || '').toLowerCase().includes(term)*/
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedUsers = allUsers.slice(startIndex, endIndex);
      
      return {
        data: paginatedUsers,
        total: allUsers.length,
        page,
        limit,
        totalPages: Math.ceil(allUsers.length / limit)
      };
    } catch (error) {
      throw new Error('Error getting users');
    }
  };

 const getUsersById = async (id:number) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting user');
    }
  };

  // UPDATE
  const updateUser = async (id:number, userData:User) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Error update user');
    }
  };

  // DELETE
  const deleteUser = async (id:number) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error delete user');
    }
  };

  return {createUser, getUsers, getUsersById, updateUser,deleteUser};
};