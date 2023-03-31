import express from "express";
import { db, connectToDb} from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req,res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    //const article = articlesInfo.find(a => a.name === name);
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }, //inc = increment; $set = set a val; etc..
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} votes!`);
    } else {
        res.send('That article does not exist!');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send('That article does not exist!');
    }
})

//Connect to db THEN start server listening when successful.
connectToDb(() =>{
    app.listen(8000, () => {
        console.log("The server is listening on port 8000.");
    });
});