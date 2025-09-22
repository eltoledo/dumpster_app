export interface Customer {
  id: number;
  name: string;
  taxId: string;
  homeAddress: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  zipCode: string;
  description: string;
  workAddress: WorkAddress[];
}
export interface WorkAddress {
  id: number;
  name: string; 
  address: string; 
  city: string; 
  state: string; 
  zipCode: string; 
  contactName: string; 
  contactPhone: string; 
  latitude: number; 
  longitude: number; 
  customerId:string
}
 
  