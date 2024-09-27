import express from 'express'
import {connectDB} from './config/db.js';
import { fetchNews } from './utils/fetchNews.js';
import cron from 'node-cron';
import { createServer } from 'http';
import { newsRouter } from './routes/news.js';
import { authRouter } from './routes/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server, {cors: {
    origin: "http://localhost:5173",
}});
// Connect Database
connectDB();

io.on('connection', (socket) => {
    console.log('a user connected');
  });


app.use(cors({
    origin: 'http://localhost:5173', 
}));

app.get('/', (req, res) => res.send('API Running'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(newsRouter)
app.use(authRouter)

const PORT = process.env.PORT || 5000;



cron.schedule('*/30 * * * * *', () => {
    console.log('Récupération des actualités...');
    fetchNews(io);
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
