import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Editor } from "./editor";
import { compile } from "./helper/compile";
import { getJob } from "./helper/get-job";
import { toast } from "react-toastify";
import { toastPromise } from "./toast";

const CodeBlock: FC<{
  config: { mode: string; theme: string; language: string };
}> = ({ config }) => {
  // component level state management.
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  // const [jobId, setJobId] = useState("");
  const [invoked, setInvoked] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  // useEffect(() => {
  //   if (jobId.length > 0) {
  //     listenJobCompile();
  //     setInvoked(true);
  //   } else {
  //     if (invoked) {
  //       toast(
  //         <div className="flex h-full flex-row justify-between items-center">
  //           <Image
  //             src={`/animated-icons/coffee-cup.gif`}
  //             alt=""
  //             width={60}
  //             height={60}
  //             layout="intrinsic"
  //           />
  //           <h1 className="ml-4">Something is not right, try refreshing!</h1>
  //         </div>,
  //         {
  //           position: toast.POSITION.BOTTOM_LEFT,
  //         }
  //       );
  //     }
  //   }
  // }, [jobId]);

  // listening for compiled job when jobId is received
  const listenJobCompile = async (jobId: string) => {
    let error, data;
    // if jobId is not set to fetch job data for.
    if (jobId.length) {
      const { error: jobError, data: jobData } = await getJob({
        jobId,
      });
      if (jobError) {
        error = jobError;
        setResponse(("ERROR " + jobError) as string);
      } else {
        const outputMessage = ("OUTPUT: " + jobData?.output) as string;
        data = outputMessage;
        setResponse(outputMessage);
      }
      setIsResponseLoading(false);
    }
    return { error, data };
  };

  // send request for compiling code.
  const runHandler = async () => {
    // loading interaction for output.
    setIsResponseLoading(true);
    // if code editor is empty then throw err.
    if (code.length <= 0) {
      return toast.error("Bro Write Code first!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    // set invoked to false for letting listenJobCompile useEffect to run.
    setInvoked(false);
    const request = new Promise(async (resolve, reject) => {
      // compile request
      const { error, data } = await compile({
        language: config.language,
        code,
      });
      if (error) {
        setResponse(("ERROR " + error) as string);

        return reject("");
      } else {
        const { error: jobError, data: jobData } = await listenJobCompile(
          data?.jobId as string
        );
        if (jobError) {
          return reject("");
        }
        return resolve("");
      }
    });
    // toast promise helper function for abstracting out notification styles.
    await toastPromise(request);
  };


  return (
    <div className="flex flex-col  items-evenly justify-center">
      <div className="flex flex-row">
        <span className="flex flex-row content-center animate-pulse  ">
          <Image
            src={`/sidebar-images/${config.language}.svg`}
            alt={`${config.language}`}
            width={45}
            height={45}
          />
        </span>
        <Editor config={config} setCode={setCode} />
        <div
          onClick={runHandler}
          className="bg-white cursor-pointer opacity-75 hover:opacity-100 backdrop-filter backdrop-blur-lg w-45 max-h-16 ml-2 flex flex-row justify-center items-center py-2 px-2 rounded-xl"
        >
          <Image
            src={`/animated-icons/thunder.gif`}
            alt={`${config.language}`}
            width={60}
            height={60}
          />
        </div>
      </div>
      {isResponseLoading || response ? (
        <div className="flex flex-row w-full my-4 items-center">
          <div className="bg-white my-2 bg-opacity-60 backdrop-filter backdrop-blur-lg w-full flex flex-row justify-start items-center py-2 px-4 rounded-xl">
            {response}
          </div>
          {response.includes("ERROR") ? (
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 ml-2 rounded-xl p-2">
              <Image
                src={`/animated-icons/frowning.gif`}
                alt={`${config.language}`}
                width={60}
                height={60}
              />
            </span>
          ) : response.includes("OUTPUT") ? (
            <span className="bg-gradient-to-r from-summerDog-base1 to-summerDog-base2 ml-2 rounded-xl p-2">
              <Image
                src={`/animated-icons/rock.gif`}
                alt={`${config.language}`}
                width={60}
                height={60}
              />
            </span>
          ) : (
            <span className="bg-gradient-to-r from-delicate-base1 to-delicate-base2 ml-2 rounded-xl p-2">
              <Image
                src={`/animated-icons/cloud-loading.gif`}
                alt={`${config.language}`}
                width={60}
                height={60}
              />
            </span>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export { CodeBlock };
