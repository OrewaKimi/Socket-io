const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Menyediakan file statis di folder 'public'
app.use(express.static("public"));

// Konfigurasi event Socket.io
io.on("connection", socket => {
    console.log("Socket Connected!!!");

    // Mendengarkan pesan dari klien
    socket.on("kirim-pesan", pesan => {
        console.log("Pesan diterima: ", pesan);
        // Broadcast pesan ke semua klien lain
        socket.broadcast.emit("pesan-baru", pesan);
    });
});

// Jalankan server HTTP
server.listen(5000, () => {
    console.log("Server berjalan di http://localhost:5000");
});
