import { User } from "./user";

export type Post = {
  _id: string;
  owner: User;
  content: string;
  photoSrc: string;
  createdAt: Date;
  likedBy: User[];
};
