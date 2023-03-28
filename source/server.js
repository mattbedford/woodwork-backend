import express from "express";

let articlesInfo = [{
    name: 'learn-node',
    upvotes: 0,
    comments: [],
},
{
    name: 'learn-react',
    upvotes: 0,  
    comments: [], 
},
{
    name: 'mongodb',
    upvotes: 0,
    comments: [],
}]

const app = express();
app.use(express.json())

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} votes!`);
    } else {
        res.send('That article does not exist!');
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedby, text } = req.body;
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.comments.push({postedby, text});
        res.send(article.comments);
    } else {
        res.send('That article does not exist!');
    }
})

app.listen(8000, () => {
    console.log("The server is listening on port 8000.");
});