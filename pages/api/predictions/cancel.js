export default async function handler(req, res) {
    let response;
    try{
      response = await fetch(`https://api.replicate.com/v1/predictions${req.body.id}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
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
  