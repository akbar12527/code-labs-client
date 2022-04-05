import { NextApiRequest, NextApiResponse } from "next";

// getting api endpoint from enviroment
const API = process.env.API;

// OPERATIONS WITH STATUS RESPONSE CODE.
// read    --> 200 [OK]
// created --> 201 [CREATE]
// update  --> 202 [ACCESS]
// delete  --> 204 [DELETE]

async function compile(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  // compile Request Body Data
  const { language, code } = JSON.parse(req.body);

  // Request Configurations Object
  const requestInitials = {
    method: "POST",
    body: JSON.stringify({
      language,
      code,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };

  // sending request to service.
  const response = await fetch(`${API}/compile`, requestInitials);

  // constructing data from response
  const responseData = await response.json();

  // if the response status doesn't match global response compliance standard throw error.
  if (!response.ok) {
    return res.status(400).json("something went wrong");
  }

  if (responseData.error) {
    return res.status(400).json(responseData.error);
  }

  // return response
  return res.status(201).json(responseData);
}

export default compile;
