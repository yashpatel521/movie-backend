require("dotenv").config();
const port = process.env.PORT ?? 4000;
const app = require("./src/app");
const db = require("./src/database/db");
// Configure Database
async function initializeDB() {
  try {
    await db.initialize();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    return db;
  }
}
initializeDB();

// Set Server to Listen
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
