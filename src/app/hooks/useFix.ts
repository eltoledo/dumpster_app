 import { api } from "../lib/api"; 
import { Fix } from "../types/Fix";
export function useFix()  { 
    
  // CREATE
  const createFix = async (fixData:Fix) => {
    try {
      const response : Fix = (await api.post('/fix', fixData)).data;
      return response;
    } catch (error) {
      throw new Error('Error create dumpster status.');
    }
  };

  // READ
  const getFixs = async (page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
      const response = await api.get('/fix');
      let  allFixs:Fix[] = response.data;
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allFixs = allFixs.filter(fix =>
         ((searchField=="all"||searchField=="description") && fix.description.toLowerCase().includes(term)) 
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFixs = allFixs.slice(startIndex, endIndex);
      
      return {
        data: paginatedFixs,
        total: allFixs.length,
        page,
        limit,
        totalPages: Math.ceil(allFixs.length / limit)
      };
    } catch (error) {
      throw new Error('Error getting Fixs.');
    }
  };

 const getFixById = async (id:number) => {
    try {
      const response = await api.get(`/fix/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting Fix.');
    }
  };

  // UPDATE
  const updateFix = async (id:number, fixData:Fix) => {
    try {
      const response = await api.put(`/fix/${id}`, fixData);
      return response.data;
    } catch (error) {
      throw new Error('Error update Fix.');
    }
  };

  // DELETE
  const deleteFix = async (id:number) => {
    try {
      const response = await api.delete(`/fix/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error delete Fix');
    }
  };

  return {createFix, getFixs, getFixById, updateFix,deleteFix};
};