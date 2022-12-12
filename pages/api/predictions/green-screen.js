export default async function handler(req, res) {
    console.log(req.body)
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "73d2128a371922d5d1abf0712a1d974be0e4e2358cc1218e4e34714767232bac",
        input: { input_video: req.body.imageUrl, output_type: "green-screen" }, 
      }),
    });
  
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
  