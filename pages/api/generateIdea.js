import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res, about) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt( req.body.about, req.body.businessType),
    temperature: 0.8,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.11,
    presence_penalty: 0.11
  });
  console.log('Completion Data:', completion.data)
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(about, businessType) {

  let prompt =  "";
  if(!businessType || businessType === ""){ prompt = `"generate an business idea with a(n) ${about} theme"`}
  else{ prompt = `"generate an business idea for a ${businessType} business with a(n) ${about} theme"`}
  console.log('Prompt: ', prompt})
  return prompt;
}
