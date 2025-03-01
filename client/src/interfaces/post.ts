import { PostComment } from "./comment";
import { User } from "./user";

export interface Post {
  _id: string;
  owner: User;
  photoSrc: string;
  content: string;
  likedBy: User[];
  comments: PostComment[];
}

export interface CreatePost {
  owner: string;
  content: string;
  photo?: File | null;
}

export interface UpdatePost {
  content?: string;
  photo?: File | null;
  likedBy?: User[];
}
