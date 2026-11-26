import express from "express"
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("Public"));
app.get("/",(req, res)=>{
    res.send("server is running")
})

app.get("/fun-fact", async(req, res)=>{
    try{
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {   
            method: "POST",

            headers: {
                "Content-Type":"application/json",
                "x-goog-api-key": process.env.gemini_api_key
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: "Guve me one interesting random fun fact. Return only one short senttence."
                            }
                        ]
                    }
                ]
            })
        }
    );
    const data = await response.json();
    const fact = data.candidates[0].content.parts[0].text;

    res.json({
        fact: fact
    });
    }
    catch(error){
        console.log("Gemini Error", error);

        res.status(500).json({
            error: "Failed to generate fun fact"
        });
        
    }
    
})


app.listen(8000, ()=>{
    console.log("server startet at port 8000");
    
})