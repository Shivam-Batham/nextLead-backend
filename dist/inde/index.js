import express from 'express';
const app = express();
app.get('/', (req, res) => {
  return res.send('Hello!');
});
app.listen(3000, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map
