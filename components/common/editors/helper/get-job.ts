const getJob: (jobData: { jobId: string }) => Promise<{
  error: {} | undefined;
  data:
    | {
        language: string;
        code: string;
        jobId: string;
        status: string;
        output?: string;
        error?: string;
      }
    | undefined;
}> = async (jobData) => {
  let error: string | undefined;
  let data:
    | {
        language: string;
        code: string;
        jobId: string;
        status: string;
      }
    | undefined;
  const { jobId } = jobData;
  //   sending request to internal api router
  const response = await fetch(`/api/${jobId}`);

  // constructing json data from response
  const responseData: {
    language: string;
    code: string;
    jobId: string;
    status: string;
    output?: string;
    error?: string;
    message?: string;
  } = await response.json();
  //   handling response
  if (response.status === 400) {
    error = responseData.error ? responseData.error : responseData.message; // error
  } else {
    data = responseData; // data
  }
  //   returning error & data to handle changes gracefully.
  return { error, data };
};

export { getJob };

// ////
// import { headers } from "../../../../pages/api/libs/methods-config";

// // React Toastify
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const signIn: (credentials: {
//   email: string;
//   password: string;
// }) => Promise<{ error: {} | undefined; data: {} | undefined }> = async (
//   credentials
// ) => {};

// export { signIn };
