import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import router from './routes/index';
const app = express();

app.use(cors({
  allowedHeaders: 'Content-Type, authorization',
  methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
}));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/', router);

const PORT = process.env.PORT || 9001;
app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});