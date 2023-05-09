import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Connected to PostgreSQL database at ${res.rows[0].now}`);
    client.end();
});

