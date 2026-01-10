// import Server from "./Server/Server2.js";
import Server from "./Server2/Server.js";
import SocketServer from "./Server2/plugins/SocketServer/SocketServer.js";
import LiveReload from "./Server2/plugins/SocketServer/LiveReload.js";
import Directory from "./Server2/plugins/Directory.js";

SocketServer.use(LiveReload);
Server.use(SocketServer);
Server.use(Directory);
new Server();