import express from "express";
import { prisma } from "./db";
import { createAvatarSchema, createUserSchema } from "./types";
import { uuid } from "uuidv4";
import { createImage } from "./image";
const app = express();

app.post("/api/v1/signup", async (req, res) => {
  const { success, data } = createUserSchema.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.json({
    id: user.id,
  });
});
app.post("/api/v1/signin", async (req, res) => {});
app.post("/api/v1/avatar", async (req, res) => {
  const { success, data } = createAvatarSchema.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      message: "Incorrect",
    });
  }
  const leftProfileId = uuid();
  const rightProfileId = uuid();
  const frontProfileId = uuid();

  await Promise.all([
    createImage(
      "Create a side profile for the user for the left side.It should be a high quality portfoli0 shoot type photo ",
      data.image,
      `./assets/${leftProfileId}.png`,
    ),
    createImage(
      "Create a side profile for the user for the right side.It should be a high quality portfoli0 shoot type photo ",
      data.image,
      `./assets/${rightProfileId}.png`,
    ),
    createImage(
      "Create a side profile for the user for the Front side.It should be a high quality portfoli0 shoot type photo ",
      data.image,
      `./assets/${frontProfileId}.png`,
    ),
  ]);
  //put in s3 then put in db
});
app.post("/api/v1/video", (req, res) => {});
app.get("/api/v1/video/:videoId", (req, res) => {});
app.get("/api/v1/videos", (req, res) => {});
app.get("/api/v1/models", (req, res) => {});
app.get("/api/v1/avatar/:avatarId", (req, res) => {});
app.get("/api/v1/avatars", (req, res) => {});
