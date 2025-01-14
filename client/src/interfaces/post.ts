import { PostComment } from "./comment";
import { User } from "./user";

export interface Post {
  _id: string;
  owner: User;
  photoSrc: string;
  content: string;
  editMode?: boolean; // Flag to indicate if the post is in edit mode
  likedBy: User[];
  comments: PostComment[];
}
