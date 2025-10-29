import Server2 from "./Server2.js";

import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import http from "http";
import https from "https";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prod = process.env.NODE_ENV === 'production';

export default class Server3 extends Server2 {

    initialize(){
		this.initialize_server();
		this.listen();
	}

	initialize_server(){

		this.initialize_express_app();
		this.initialize_http_server();
		this.initialize_sockets();

			this.initialize_directorize_framework();

	}

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

    initialize_http_server(){
        if (prod){
            // The domain name is used as the directory name
            const domainName = 'lew42.com'; 

            // Correctly constructed absolute paths
            const privateKeyPath = `/etc/letsencrypt/live/${domainName}/privkey.pem`;
            const certificatePath = `/etc/letsencrypt/live/${domainName}/fullchain.pem`;

            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            const certificate = fs.readFileSync(certificatePath, 'utf8');

            const credentials = { key: privateKey, cert: certificate };

            this.http_server = https.createServer(credentials, this.express_app);
        } else {
            this.http_server = http.createServer(this.express_app);
        }
    }

    listen(){
        if (prod){
            this.http_server.listen(443, () => {
                console.log("Listening [port 443, !!!! PROD !!!! ] (" + this.webroot + ")");
            });
        } else {
            this.http_server.listen(80, '0.0.0.0', () => {
                console.log("Listening [port 80, not prod] (" + this.webroot + ")");
            });
        }
	}
}

/**
 * export default {
    directorize: true,
    initialize(){
        this.initialize_server();
 
        // this is bad, won't work unless I set this up similarly...
        this.express_app.use("/three.js", this.express.static(this.dirname + "/../../three.js/"));
        this.listen();
    },
 
    initialize_http_server(){
        const dirname = path.dirname(url.fileURLToPath(import.meta.url))
        const privateKey = fs.readFileSync(path.join(dirname, 'key.pem'), 'utf8');
        const certificate = fs.readFileSync(path.join(dirname, 'cert.pem'), 'utf8');
        const credentials = { key: privateKey, cert: certificate };
        // this.https_server = https.createServer(credentials, this.express_app);
        this.http_server = https.createServer(credentials, this.express_app);
        // this.http_server = http.createServer(this.express_app);
    },
 
    listen(){
        this.http_server.listen(443, () => {
            console.log("HTTPS Secure Server running on port 443");
        });
    }
 };
 */