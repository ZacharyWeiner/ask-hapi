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
    } else if (req.body.version === "a8cd5deb8f36f64f267aa7ed57fce5fc7e1761996f0d81eadd43b3ec99949b70"){
      _body = JSON.stringify({
        version:req.body.version, 
        input: { prompt: "arcane style " + req.body.prompt, grid_size: 1 }, 
      })
    } else if (req.body.version === "5eb8c570de53a4325cb8e05ea591bd32befde542edb84991da4e416c1adeef52"){
      _body = JSON.stringify({
        version:req.body.version, 
        input: { prompt: "archer style " + req.body.prompt, grid_size: 1 }, 
      })
    }
    
    else {
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
  