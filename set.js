const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVBCcFBlUi90SUcyUzJBQm9HaTh1anh0RHp4UThNS2U4MVY2aGRQeXEwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmdaRy8rdThjYnpoMUp0T1NRWnA2eXd3YVJTc1k2UGxjbWw3enFqMndtdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRFJZU1RSQ0FDMUtoUmo5NG1DUXpvU09EM24rL1NrK1ptSTU4eWthSzBVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0MjZpeHRTem10c3RWbXZNYk1qTHQ0aSsxSVFqOURLV3ZZV3pBMVVRV0hJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitMNXJuYXhaZHZJUmRpMVRBb21MV3RMTW80MmNtdDFxVHZ4eW5PMDI2bHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iis0enlWSFliYkhuUXY3L0piQW8wamtEeGdWdVcvOW5WUVdrY0gzbHpRUjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VXSGgyc0llNW1yRmNFdWk4UUJRZjdLQUl1azBHU1VaYld6RkVTb3NGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFlMFNmZkdKRGpzdFZzaDJTQ3FJTUlNbUVIV1pITE00SlcwbVdKNDFGTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNKZldPSGE0RU52ZzN4clNuUFRQc3RFODhhY0p3SkVkRmYxZUlLNzVpRmRuZnFwQlp2dC95M2pSeXNlYjZPK2owb3owRVJNTElJa3piNXhRLzhKZkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoiYzdZK0Mzdk91d1p5eTNHSENCV1FNNG9OSjhzQU13VHYwQ3hQc3ZtTXVmTT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQzljQ090cG1TeEtZUmdNQW5sRV9KdyIsInBob25lSWQiOiJiMmEzM2ZhYy1iMTA3LTRlNmEtOTA2OS0zYzA0MWJjYjM3OTMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWhCMzd5b29iMG5IT20zKzB4eE02QXM5RUNVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1QYWNOVHd2ejZ2MjN3c2R0K1hqcmtHVGM5TT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJLQUdFSEVSRSIsIm1lIjp7ImlkIjoiMjM0NzAyNjEzODM4NDo3OUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE4NDMyMzE1MjA4MDk1MTo3OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lUDBwa0hFUDJzb3NFR0dCZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJVRmZmK29ucjV5TVlaT3lqT29UVDJlY1NOU3c4ejJpdzg1TU9tQUpzQUU9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBVbUxWY0k4RE5lMlNHZS9iQjFUdTBxNnZOcDR5bXZ5eWF0QlZGa1hyckM0OW1meFo0cWtva0tsZ0RuSEE2Ny83ZXhGZnJKVVQ4djNjNDVhRDRpTkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvZVZNMTFQVXR1c2JTUTIrVE52anYxNlRUbHpramZNUTNMTjNLRUFja0RGbVJvTUV5ZUl0R3BrTXlRenppMVVmYm5NRnRJYUtUdmZYTEdPVGxJMTlBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMjYxMzgzODQ6NzlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGxCWDMvcUo2K2NqR0dUc296cUUwOW5uRWpVc1BNOW9zUE9URHBnQ2JBQiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3NDkwNDQyLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9laiJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "𝕴𝕿𝖅 𝕭𝕽𝕴𝕬𝕹",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347026138384",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "no",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'available'
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
