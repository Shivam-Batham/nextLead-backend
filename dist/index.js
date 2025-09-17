'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const dbConnection_1 = require('./db/dbConnection');
dotenv.config({ path: './.env' });
const app = express();
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is 100% healthy.',
  });
});
app.listen(process.env.PORT, () => {
  (0, dbConnection_1.dbConnect)();
  console.log(`server is running at ${process.env.PORT}`);
});
