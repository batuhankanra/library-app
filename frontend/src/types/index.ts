export interface User {
  _id: string;
  name: string;
  email: string;
  role:string;
}


export interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
}