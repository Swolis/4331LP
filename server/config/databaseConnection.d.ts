import mongoose from "mongoose";
declare function connectToClient(): Promise<typeof mongoose>;
export { connectToClient, mongoose };
