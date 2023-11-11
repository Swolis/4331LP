import mongoose from "mongoose";
declare function connectToClient(uriEnd: String): Promise<typeof mongoose>;
export { connectToClient };
