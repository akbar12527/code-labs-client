import { NextApiRequest, NextApiResponse } from "next";
// getting api endpoint from enviroment
const API = process.env.API;
import superagent from "superagent";
// OPERATIONS WITH STATUS RESPONSE CODE.
// read    --> 200 [OK]
// created --> 201 [CREATE]
// update  --> 202 [ACCESS]
// delete  --> 204 [DELETE]

async function getJob(request: NextApiRequest, res: NextApiResponse) {
  const { jobId } = request.query;

  // Request Configurations Object
  const requestInitials = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "User-Agent": "*",
    },
  };

  const endpoint = `${API}/${jobId}`;
  // sending request to service.
  // const response = await fetch(endpoint);
  const response: any = await superagent.get(endpoint);

  let responseData;
  // constructing data from response
  if (response.text) {
    responseData = JSON.parse(response.text);
  } else {
    responseData = await response.json();
  }
  // if the response status doesn't match global response compliance standard throw error.
  if (!response.ok) {
    return res.status(400).json(responseData.message);
  }

  if (responseData.error || responseData.message) {
    return res.status(400).json(responseData);
  }

  // return response
  return res.status(201).json(responseData);
}

export default getJob;
