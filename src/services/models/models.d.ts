interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  phoneNumber: number;
  address: Address;
  avatar: string;
}
interface Order {
  productName: string;
  itemCost: number;
}
interface State {
  abbreviation: string;
  name: string;
}
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  state: State;
  orders: Order[];
  latitude: number;
  longitude: number;
  orderTotal: number;
}

interface CustomersByPage {
  results: Customer[];
  totalRecords: number;
}

interface FormData {
  email: string;
  password: string;
}
