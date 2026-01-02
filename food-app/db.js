import Database from "better-sqlite3";
import fs from "fs";

const db = new Database("database.sqlite");

try {
    // 1. Схем (бүтэц) үүсгэх
    const schema = fs.readFileSync("schema.sql", "utf8");
    db.exec(schema);
    console.log("Хүснэгтүүд амжилттай үүслээ.");

    // 2. Дата (өгөгдөл) оруулах
    const seed = fs.readFileSync("seed.sql", "utf8");
    db.exec(seed);
    console.log("Өгөгдөл (Seed) амжилттай орлоо.");

} catch (error) {
    console.error("Алдаа гарлаа:", error.message);
}

export default db;