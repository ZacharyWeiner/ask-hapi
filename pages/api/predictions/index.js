export default async function handler(req, res) {
    console.log(req.body.prompt)
    let _body; 
    if(req.body.drawer && req.body.drawer !== ''){
      _body = JSON.stringify({
        version:req.body.version, 
        input: { prompts: req.body.prompt, drawer: req.body.drawer, settings: "{quality: better, pixel_size: [128, 64], size: [512, 512], custom_loss: 'smoothness, edge', edge_color: black, alpha_use_g: true, alpha_gamma: 4}" }, 
      })
    } else if(req.body.inputImage){
      _body = JSON.stringify({
        version:req.body.version, 
        input: { input_image: req.body.inputImage}, 
      })
    } else {
      _body = JSON.stringify({
        version:req.body.version, 
        input: { prompt: req.body.prompt, grid_size: 1 }, 
      })
    }
    console.log(_body);
    let response;
    try{
      response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: _body,
      });
    }catch(err){ console.log(err)} 
    console.log('got response', response)
    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await response.json();
    res.statusCode = 201;
    console.log(prediction);
    res.end(JSON.stringify(prediction));
  }
  