import express from "express";

const app = express();
app.use(express.json())

app.post('/hello', (req, res)=> {
    
    res.send(`What\'s up  ${req.body.Name}`);
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
} )
