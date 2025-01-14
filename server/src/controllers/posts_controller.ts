import { Post } from "../dtos/post";
import { Request, Response } from "express";
import { PostModel } from "../models/posts_model";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const postOwner: string = String(req.query.postOwner || "");
    let posts: Post[];

    if (postOwner) {
      posts = await PostModel.find({ owner: postOwner })
        .sort({ createdAt: -1 })
        .populate("owner");
    } else {
      posts = await PostModel.find().sort({ createdAt: -1 }).populate("owner");
    }

    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPostById = async (req: Request, res: Response) => {
  const postId: string = req.params.postId;

  try {
    const post: Post = await PostModel.findById(postId).populate("owner");
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Cannot find specified post");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createPost = async (req: Request, res: Response) => {
  const createdPost: Post = req.body;
  try {
    const post: Post = await PostModel.create(createdPost);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const postId: string = req.params.postId;
  const updatedPostContent: Post = req.body;

  try {
    const result = await PostModel.updateOne(
      { _id: postId },
      updatedPostContent
    ).populate("owner");
    if (result.modifiedCount > 0) {
      res.status(201).send();
    } else {
      res.status(404).send("Cannot find specified post");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePostById = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const post = await PostModel.deleteOne({ _id: postId });
    if (post.deletedCount > 0) {
      res.status(200).send("The post deleted");
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePostById };
