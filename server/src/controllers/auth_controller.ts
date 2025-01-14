import ms from "ms";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";
import { User } from "../dtos/user";
import { Request, Response } from "express";
import { uploadFile } from "../utils/multer";
import { UserModel } from "../models/user_model";
import { createNewUser } from "../services/user_service";
import { generateRefreshToken } from "../utils/auth/generate_refresh_token";

import {
  convertUserToJwtInfo,
  generateAccessToken,
} from "../utils/auth/generate_access_token";

export const register = async (req: Request, res: Response) => {
  try {
    await uploadFile(req, res);

    const user: User = JSON.parse(req.body.user);
    user.photo = req.file.filename;

    const userExistsCheck = await UserModel.findOne({
      username: user.username,
    });

    if (userExistsCheck) {
      res.status(400).send({ userExist: true, message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await createNewUser({ ...user, password: hashedPassword });

    req.body = { username: user.username, password: user.password };
    login(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user == null) throw Error("Invalid Credentials");

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) throw Error("Invalid Credentials");

    const accessToken = generateAccessToken(
      convertUserToJwtInfo(user),
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );
    const refreshToken = generateRefreshToken(
      convertUserToJwtInfo(user),
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRATION
    );

    user.tokens = user.tokens ? [...user.tokens, refreshToken] : [refreshToken];
    await user.save();

    res.status(200).send({
      accessToken: {
        token: accessToken,
        expireDate: moment().add(ms(process.env.ACCESS_TOKEN_EXPIRATION)),
      },
      refreshToken: {
        token: refreshToken,
        expireDate: moment().add(ms(process.env.REFRESH_TOKEN_EXPIRATION)),
      },
      user,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const logout = (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization?.split(" ")?.[1];
  if (!refreshToken) return res.status(401).send("No refresh token provided");

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, userInfo: User) => {
      if (err) return res.status(403).send("Unauthorized");
      const userId = userInfo._id;
      try {
        const user = await UserModel.findById(userId);
        if (user == null) return res.status(403).send("Unauthorized");
        if (!user.tokens.includes(refreshToken)) {
          user.tokens = [];
          await user.save();
          return res.status(403).send("Unauthorized");
        }
        user.tokens = user.tokens.filter((token) => token !== refreshToken);
        await user.save();
        res.status(200).send("Logged out successfully");
      } catch (err) {
        res.status(403).send(err.message);
      }
    }
  );
};

export const refreshToken = async (req: Request, res: Response) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, userInfo: User) => {
      if (err) return res.status(403).send("Unauthorized");

      const userId = userInfo._id;
      try {
        const user = await UserModel.findById(userId);
        if (user == null) return res.status(403).send("Unauthorized");
        if (!user.tokens.includes(token)) {
          user.tokens = [];
          await user.save();
          return res.status(403).send("Unauthorized");
        }

        const accessToken = generateAccessToken(
          convertUserToJwtInfo(user),
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRATION
        );
        const refreshToken = generateRefreshToken(
          convertUserToJwtInfo(user),
          process.env.REFRESH_TOKEN_SECRET,
          process.env.REFRESH_TOKEN_EXPIRATION
        );

        user.tokens[user.tokens.indexOf(token)] = refreshToken;
        await user.save();
        res.status(200).send({
          accessToken: {
            token: accessToken,
            expireDate: moment().add(ms(process.env.ACCESS_TOKEN_EXPIRATION)),
          },
          refreshToken: {
            token: refreshToken,
            expireDate: moment().add(ms(process.env.REFRESH_TOKEN_EXPIRATION)),
          },
        });
      } catch (err) {
        res.status(403).send(err.message);
      }
    }
  );
};
