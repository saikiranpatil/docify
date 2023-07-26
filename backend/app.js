const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Document = require("./Document");
const connectDB = require("./database");

dotenv.config({ path: "./.env" });

// Connect to Database
connectDB();

const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {
    socket.on("get-document", async documentId => {
        const document = await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document);

        socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        })

        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, { data, modifiedAt: Date.now() });
        })

        socket.on("change-title", async data => {
            await Document.findByIdAndUpdate(documentId, { title: data });
        })
    })

    socket.on("create-new-document", async (newDocumentTitle) => {
        const newDocument = await Document.create({ title: newDocumentTitle });
        socket.emit("receive-new-documents", newDocument._id);
    })

    socket.on("load-documents", async () => {
        const documents = await Document.find();
        socket.emit("receive-documents", documents);
    });

    socket.on("delete-document", async (documentId) => {
        await Document.findOneAndDelete({ _id: documentId })
        const documents = await Document.find();
        socket.emit("receive-documents", documents);
    })
})

async function findOrCreateDocument(id) {
    if (id == null) return;

    const document = await Document.findById(id);
    return document;
}