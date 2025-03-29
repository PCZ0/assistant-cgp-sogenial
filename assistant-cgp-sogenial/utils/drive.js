const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // Place ton fichier d'identifiants ici
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

async function listDriveFiles() {
  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });

  const res = await drive.files.list({
    pageSize: 10,
    fields: "files(id, name)",
  });

  return res.data.files;
}

module.exports = { listDriveFiles };
