import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res,) {
  try{
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt( req.body.description, req.body.previous),
      temperature: 0.8,
      max_tokens: 400,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    });
    console.log('Completion Data: ', completion.data)
    let respondWith = req.body.previous ? req.body.previous + " " + completion.data.choices[0].text : completion.data.choices[0].text; 
    res.status(200).json({ result:  respondWith, finish_reason:  completion.data.choices[0].finish_reason, completion_data: completion.data});
  }catch(err){
    res.status(400).json({error: err});
  }
}

function generatePrompt(details, previous) {
  try{
    let prompt =  previous ? details + previous + "\n" : details;
    console.log('Prompt:', prompt)
    return prompt;
  }catch(err){
    console.log("Prompt Error:", err);
  }
}
