const compile: (compileData: { language: string; code: string }) => Promise<{
  error: string | undefined;
  data:
    | {
        language: string;
        code: string;
        jobId: string;
        status: string;
      }
    | undefined;
}> = async (compileData) => {
  let error: string | undefined;
  let data:
    | {
        language: string;
        code: string;
        jobId: string;
        status: string;
      }
    | undefined;
  const { language, code } = compileData;

  //   request configuration object with body.
  const requestInitials = {
    method: "POST",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ language, code }),
  };

  //   sending request to internal api router
  const response = await fetch("/api/compile", requestInitials);

  // constructing json data from response
  const responseData: {
    language: string;
    code: string;
    jobId: string;
    status: string;
  } = await response.json();

  //   handling response
  if (response.status === 400) {
    error = "couldn't send request"; // error
  } else {
    data = responseData; // data
  }
  //   returning error & data to handle changes gracefully.
  return { error, data };
};

export { compile };

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
