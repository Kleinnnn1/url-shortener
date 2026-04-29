const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const generateCode = () => Math.random().toString(36).substring(2, 8);

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL is required." });

  try {
    const shortCode = generateCode();
    const link = await prisma.link.create({
      data: { originalUrl, shortCode },
    });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const redirectUrl = async (req, res) => {
  const { code } = req.params;
  try {
    const link = await prisma.link.findUnique({ where: { shortCode: code } });
    if (!link) return res.status(404).json({ error: "Link not found." });

    await prisma.link.update({
      where: { shortCode: code },
      data: { clicks: link.clicks + 1 },
    });
    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await prisma.link.findMany({ orderBy: { createdAt: "desc" } });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { shortenUrl, redirectUrl, getLinks };