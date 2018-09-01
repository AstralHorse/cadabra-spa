const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const publicPath = process.cwd() + '/public'
console.log(publicPath)
// the __dirname is the current directory from where the script is running
app.use(express.static(publicPath));

// send the user to index html page inspite of the url
app.get('*', (req: any, res: any) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port);
