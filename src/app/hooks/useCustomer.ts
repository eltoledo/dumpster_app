 import { api } from "../lib/api";
import { Customer } from "../types/Customer";

export function useCustomer()  { 
    
  // CREATE
  const createCustomer = async (customersData:Customer) => {
    try {
      const response : Customer = (await api.post('/customers', customersData)).data;
      return response;
    } catch (error) {
      throw new Error('Error create customers');
    }
  };

  // READ
  const getCustomers = async (page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
      const response = await api.get('/customers');
      let  allCustomers:Customer[] = response.data;
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allCustomers = allCustomers.filter(customer =>
          ((searchField=="all"||searchField=="name") && customer.name.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="homeAddress") && customer.homeAddress.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="email") && customer.email.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="phone") && customer.phone.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="description") && customer.description.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="workAddresses") && searchworkAddresses) 
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCustomer = allCustomers.slice(startIndex, endIndex);
      
      return {
        data: paginatedCustomer,
        total: allCustomers.length,
        page,
        limit,
        totalPages: Math.ceil(allCustomers.length / limit)
      };
    } catch (error) {
      throw new Error('Error getting customers');
    }
  };

   const searchworkAddresses = (workAddresses:string[],searchTerm = '') => {
    return workAddresses.some(item => 
            item.toLowerCase() === searchTerm.toLowerCase()
        );
  };

 const getCustomersById = async (id:number) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting customers');
    }
  };

  // UPDATE
  const updateCustomer = async (id:number, CustomersData:Customer) => {
    try {
      const response = await api.put(`/customers/${id}`, CustomersData);
      return response.data;
    } catch (error) {
      throw new Error('Error update customers');
    }
  };

  // DELETE
  const deleteCustomer = async (id:number) => {
    try {
      const response = await api.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error delete customers');
    }
  };

  return {createCustomer, getCustomers, getCustomersById, updateCustomer,deleteCustomer};
};