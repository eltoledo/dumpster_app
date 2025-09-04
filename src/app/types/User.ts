export interface User {
  id: number;
  username: string;
  role: 'AVAILABLE' | 'IN_MAINTENANCE' | 'IN_ROUTE';
  token: string;
}