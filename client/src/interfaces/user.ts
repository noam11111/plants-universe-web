export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  tokens?: string[];
  photoSrc?: string;
}

export interface UpdateUser {
  _id: string;
  username: string;
  photoSrc?: string;
  email: string;
}
