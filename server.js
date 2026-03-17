import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = '0.0.0.0'; // Listen on all interfaces

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  console.log("page is loading...");
})

app.get('/pic', function (req, res) {
  res.sendFile(path.join(__dirname, 'gorilla.jpg'));
});


app.listen(PORT, HOST, () => {
  console.log(`\n🚀 Server is running!`);
  console.log(`Local: http://localhost:${PORT}`);
});
