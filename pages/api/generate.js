import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  let prompt = generatePrompt(req.body.previous, req.body.what)
  console.log({prompt})
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0.11,
    presence_penalty: 0.11
  });
  console.log("Completion Data", completion.data)
  console.log("Finish Reason:", completion.data.choices[0].finish_reason)
  res.status(200).json({ result: completion.data.choices[0].text, finish_reason:  completion.data.choices[0].finish_reason });
}

function generatePrompt(previous, what) {
  if(previous){
    console.log("Previous Prompt: ", previous)
    return  `"generate an business plan for ${what}"` + previous;
  }
  return `"generate an business plan for ${what}"`;
}
