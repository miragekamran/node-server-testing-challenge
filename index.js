const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const hobbitsRouter = require("./hobbits/hobbitsRouter");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(hobbitsRouter);
server.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        message: "Something went wrong"
    });
});

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`);
    });
}

module.exports = server;
