const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/prediksiCuaca");
const getBerita = require("./utils/berita");

const app = express();

const direktoriPublic = path.join(__dirname, "../public");
const direktoriViews = path.join(__dirname, "../templates");
const direktoriPartials = path.join(__dirname, "../partials");

app.set("view engine", "hbs");
app.set("views", direktoriViews);
hbs.registerPartials(direktoriPartials);

//
app.use(express.static(direktoriPublic));

//ini halaman utama
app.get("", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Mubarakh Khairy",
  });
});

// Halaman bantuan/FAQ (Frequently Asked Questions)
app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Tentang Saya",
    nama: "Mubarakh Khairy",
    teksBantuan: "ini adalah teks bantuan",
  });
});

// Halaman infoCuaca
app.get("/infoCuaca", (req, res) => {
  res.send([
    {
      PrediksiCuaca: "Cuaca Sedang Hujan",
      Lokasi: "Padang",
    },
  ]);
});

//ini halaman tentang
app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Mubarakh Khairy",
  });
});

app.get("/bantuan/*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Mubarakh Khairy",
    pesanKesalahan: "Artikel yang dicari tidak ditemukan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Mubarakh Khairy",
    pesanKesalahan: "Halaman tidak ditemukan",
  });
});

app.listen(4000, () => {
  console.log("Server berjalan pada port 4000.");
});
