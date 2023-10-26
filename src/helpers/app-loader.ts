import { Express } from "express";
import mongoose from "mongoose";
import { MONGODB_URI, server } from "../data/constants";

export default async function start(app: Express): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI);

        app.listen(server.port, () => {
            console.log(`Server is running at ${server.url}`);
        });
    } catch {
        console.log('Server failed to start');
    }
}