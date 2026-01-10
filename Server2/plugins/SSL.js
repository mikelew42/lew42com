import fs from "fs";
import https from "https";

export default class SSL {

    static plugin(server) {
        const prod = process.env.NODE_ENV === 'production';
        if (!prod) return;

        const domain = 'lew42.com';
        const key_path = `/etc/letsencrypt/live/${domain}/privkey.pem`;
        const cert_path = `/etc/letsencrypt/live/${domain}/fullchain.pem`;

        try {
            const key = fs.readFileSync(key_path, 'utf8');
            const cert = fs.readFileSync(cert_path, 'utf8');
            server.credentials = { key, cert };

            // Override http server creation
            server.initialize_http = () => {
                server.http = https.createServer(server.credentials, server.app);
            };
        } catch (e) {
            console.error("Failed to load SSL certificates", e);
        }
    }
}
