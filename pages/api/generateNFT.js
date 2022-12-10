import bsv from "bsv"
import Mnemonic from "bsv/mnemonic"
import Run from 'run-sdk'
export default async function (req, res) {
  let payPath = "m/44'/236'/0'/0/0"
  let dpath = "m/44'/236'/0'/2/0"
  console.log(process.env.RUN_SEED)
  const mnemonic = Mnemonic.fromString(process.env.RUN_SEED);
  const hdPrivKey = bsv.HDPrivateKey.fromSeed(mnemonic.toSeed())
    const payKey = hdPrivKey.deriveChild(payPath)
    const ownerKey = hdPrivKey.deriveChild(dpath) 
    const payPubKey = payKey.publicKey
    const ownerPubKey = ownerKey.publicKey
    const ownerAddress = ownerPubKey.toAddress()
    const payAddress = payPubKey.toAddress()

const run = new Run({
      owner: ownerKey.privateKey.toString(),
      purse: payKey.privateKey.toString(),
      trust: '*',
      timeout: 10000000,
      api: 'run',
      logger: console,
      splits: 6
  });
  await run.sync() 

//   let prompt = generatePrompt(req.body.previous, req.body.what)
//   console.log({prompt})
//   const completion = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: prompt,
//     temperature: 0.7,
//     max_tokens: 400,
//     top_p: 1,
//     frequency_penalty: 0.11,
//     presence_penalty: 0.11
//   });
//   console.log("Completion Data", completion.data)
//   console.log("Finish Reason:", completion.data.choices[0].finish_reason)
  res.status(200).json();
}

function generatePrompt(previous, what) {
  if(previous){
    console.log("Previous Prompt: ", previous)
    return  `"generate an business plan for ${what}"` + previous;
  }
  return `"generate an business plan for ${what}"`;
}
