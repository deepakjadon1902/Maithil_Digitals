import type { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
        role: "admin";
        tokenVersion: number;
      };
      file?: Multer.File;
    }
  }
}

export type MongoId = Types.ObjectId | string;
