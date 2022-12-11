export default async function handler(req, res) {
    console.log(req.body.prompt)
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pinned to a specific version of kuprel/min-dalle, fetched from:
        // https://replicate.com/kuprel/min-dalle/versions
        version:req.body.version, 
          //"6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c", // - Stable Diffusion
          //"3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912", // Text to Pokemon
        input: { prompt: req.body.prompt, grid_size: 1 }, 
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
  