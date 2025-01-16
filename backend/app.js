// LIBRAIRIES

// Dotenv (permet de manipuler des variables d'environnement, qui deviennent accessibles via la syntaxe "process.env.UNE_VARIABLE")
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
// Authentification
import bcrypt from "bcryptjs";
// Sessions UUIDs
import crypto from "crypto";
// Cookies parser
import cookieParser from "cookie-parser";

// MODULES

import { sendMyMail } from "./lib/mail.mjs";

// CONFIG ---------------------------

// Express
const app = express();

// Prisma
const prisma = new PrismaClient();

// body parser
app.use(express.urlencoded({ extended: true }));

// JSON parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// MIDDLEWARES --------------------------

// LOGGER
app.use("/", (req, res, next) => {
  console.log(req.path);
  next();
});

// API GET example
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello depuis Express!" });
});

// API POST example
app.post("/api/data", (req, res) => {
  const { name } = req.body;
  console.log("Données reçues :", name);
  res.json({ message: `Hello, ${name}!` });
});

// Liste de paires "email: code"
let twofa_codes = {};

// Generate vérif code
function generate_random_code(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// AUTH

app.post("/auth/authenticate_user", async (req, res) => {
  const { email, password } = req.body;
  // Log des données reçues
  console.log("Données reçues : ", { email, password });

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    if (await bcrypt.compare(password, existingUser.password)) {
      const code = generate_random_code(0, 999999) + "";

      twofa_codes[email] = code;
      await sendMyMail({
        from: "buisson@enseeiht.fr",
        to: email,
        subject: "Inspection - Vérifiez votre compte",
        text: `Saisissez le code de vérification suivant pour vous connecter à Inspections : ${code}`,
      });
      res.cookie("verification", "", {
        httpOnly: true,
        maxAge: 2 * 60 * 1000,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(404);
  }
});

// VERIF

app.post("/auth/verify_code", async (req, res) => {
  const { email, code } = req.body;
  // Log des données reçues
  console.log("Données reçues : ", { email, code });
  console.log("2 facteurs : " + twofa_codes[email]);

  if (twofa_codes[email] === code) {
    const uuid = crypto.randomUUID();
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    const session = await prisma.session.create({
      data: { session_id: uuid, user_id: existingUser.id },
    });
    res.cookie("session_id", session.session_id, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

// create_account form
app.post("/create_account", async (req, res) => {
  const { email, password, password_confirm } = req.body;
  if (password === password_confirm) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.render("register", {
        errorMessage: `Un compte associé à l'email ${email} existe déjà.`,
      });
    } else {
      const saltRounds = 3;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await prisma.user.create({
        data: { email, password: hash },
      });
      // res.render("login", {
      //   errorMessage: "",
      // });
    }
  } else {
    // res.render("register", {
    //   errorMessage: "Les mots de passe doivent être identiques.",
    // });
  }
});

// Vérification de session (cookies)
app.use("/", (req, res, next) => {
  if (req.cookies.session_id) {
    next();
  } else {
    res.status(403);
  }
});

// Page "visit-list"
app.get("/visit-list", async (req, res) => {
  const current_session = req.cookies.session_id;
  const authenticated_user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          session_id: current_session,
        },
      },
    },
  });
  const visit_list = await prisma.visit.findMany({
    include: {
      company: true, // Inclut les informations de la compagnie associée
    },
  });
  // res.render("visit-list", {
  //   user: authenticated_user,
  //   visits: visit_list,
  // });
});

// Page "visit-edit"
app.get("/visit-edit", async (req, res) => {
  const current_session = req.cookies.session_id;
  const authenticated_user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          session_id: current_session,
        },
      },
    },
  });

  const company_list = await prisma.company.findMany();

  // res.render("visit-edit", {
  //   user: authenticated_user,
  //   companies: company_list,
  //   errorMessage: "",
  // });
});

// Create new visit
app.post("/create_visit", async (req, res) => {
  const { visit_date, company, report } = req.body;
  const date = new Date(visit_date);

  const current_session = req.cookies.session_id;
  const authenticated_user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          session_id: current_session,
        },
      },
    },
  });

  const new_visit = await prisma.visit.create({
    data: {
      user_id: 4,
      date: date,
      company_id: parseInt(company),
      report,
    },
  });

  const visit_list = await prisma.visit.findMany({
    include: {
      company: true, // Inclut les informations de la compagnie associée
    },
  });

  // res.render("visit-list", {
  //   user: authenticated_user,
  //   visits: visit_list,
  // });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
