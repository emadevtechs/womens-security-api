require("dotenv").config();
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const client = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

console.log("is Productions....", isProduction);

client.connect();

const create_user_query = `
    CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name varchar,
        email varchar UNIQUE,
        password varchar,
        phone_number bigint UNIQUE,
        created_at timestamp,
        updated_at timestamp
    );
`;

const create_verify_questions_query = `
    CREATE TABLE IF NOT EXISTS verify_questions (
        id serial PRIMARY KEY,
        user_id int,
        question varchar,
        answer varchar,
        created_at timestamp,
        updated_at timestamp,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`;


const create_emergency_contacts_query = `
    CREATE TABLE IF NOT EXISTS users_emergency_contacts (
        id serial PRIMARY KEY,
        user_id int,
        phone_numbers TEXT[],
        created_at timestamp,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`;

client
    .query(create_user_query)
    .then(result => {
        console.log('user table created successfully'),
            client
                .query(create_emergency_contacts_query)
            .then(result => console.log('emergency_contacts table created successfully'),
                    client
                        .query(create_verify_questions_query)
                        .then(result => console.log('verify_questions table created successfully'))
                        .catch(e => console.error('post verify_questions connection error', e.stack)))
            .catch(e => console.error('post emergency_contacts connection error', e.stack))
    }
    )
    .catch(e => console.error('user db connection error', e.stack));

module.exports = {
    client
};