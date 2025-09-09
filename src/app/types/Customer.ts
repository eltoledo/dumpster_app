export interface Customer {
  id: number;
  name: string;
  homeAddress: string;
  email: string;
  phone: string;
  description: string;
  workAddresses: WorkAddress[];
}
export interface WorkAddress {
  address: string; 
}