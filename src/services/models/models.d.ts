interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  phoneNumber: number;
  address: Address;
  avatar: string;
  rules: string[];
}
interface IOrder {
  id: string;
  idUser: string;
  urlImg: string;
  productName: string;
  size: number;
  quantity: number;
  price: number;
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

interface Product {
  id: number;
  name: string;
  price: number;
  color: number;
  thumbnail: string;
  detailimg: Array[string];
  colorimg: Array[string];
  size: Array[string];
  type: string;
}

interface CartItem {
  id: string;
  idUser: string;
  urlImg: string;
  productName: string;
  size: number;
  quantity: number;
  price: number;
}

interface UserSettingsStatus {
  status:number;
  message:string;
}