 import { api } from "../lib/api";
import { Driver } from "../types/Driver";

export function useDriver()  { 
    
  // CREATE
  const createDriver = async (driverData:Driver) => {
    try {
      const response : Driver = (await api.post('/drivers', driverData)).data;
      return response;
    } catch (error) {
      throw new Error('Error create driver');
    }
  };

  // READ
  const getDrivers = async (page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
       
      const response = await api.get('/drivers');
      let allDrivers:Driver[] = response.data;
      
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allDrivers = allDrivers.filter(driver =>
        //  ((searchField=="all"||searchField=="fullname") && driver.fullname.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="email") && driver.email.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="phone") && driver.phone.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="address") && driver.phone.toLowerCase().includes(term)) 
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedDrivers = allDrivers.slice(startIndex, endIndex);
      
      return {
        data: paginatedDrivers,
        total: allDrivers.length,
        page,
        limit,
        totalPages: Math.ceil(allDrivers.length / limit)
      };
    } catch (error) {
      throw new Error('Error getting drivers');
    }
  };

 const getDriverById = async (id:string) => {
    try {
      const response = await api.get(`/drivers/ById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting driver');
    }
  };

  // UPDATE
  const updateDriver = async (id:number, driverData:Driver) => {
    try {
      const response = await api.put(`/drivers/${id}`, driverData);
      return response.data;
    } catch (error) {
      throw new Error('Error update driver');
    }
  };

  // DELETE
  const deleteDriver = async (id:string) => {
    try {
      const response = await api.delete(`/drivers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error delete user');
    }
  };

  return {createDriver, getDrivers, getDriverById, updateDriver,deleteDriver};
};