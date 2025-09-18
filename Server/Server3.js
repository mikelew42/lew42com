import Server2 from "./Server2.js";

import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Server3 extends Server2 {

	initialize_express_app(){
		this.express = express;
		this.express_app = express();
		this.express_app.use(express.static("public", { redirect: false }));
        this.express_app.use((req, res, next) => {
            console.log("req.path", req.path);

            // If this ends in ".ext", let it 404
            if (/\.[a-zA-Z0-9]+$/.test(req.path)) {
                return res.status(404).end();
            }

            res.sendFile(path.join(__dirname, '../public', 'index.html'));
            
        });
	}
}