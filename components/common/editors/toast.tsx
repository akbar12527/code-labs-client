import { ToastPromiseParams, toast } from "react-toastify";
import Image from "next/image";
const toastPromise = async (promise: Promise<any>) =>
  await toast.promise(
    promise,
    {
      pending: {
        render() {
          return (
            <div className="flex  flex-row  justify-around items-center">
              <h1>Your Code is Being Compiled</h1>
              <Image
                src={`/animated-icons/rocket.gif`}
                alt=""
                width={60}
                height={60}
              />
            </div>
          );
        },
        icon: "",
      },
      success: {
        render({ data }) {
          return (
            <div className="flex  flex-row  justify-around items-center">
              <h1>Yours Code Works!</h1>
              <Image
                src={`/animated-icons/meteor-rain.gif`}
                alt=""
                width={60}
                height={60}
              />
            </div>
          );
        },
        icon: "",
      },
      error: {
        render() {
          return (
            <div className="flex  flex-row  justify-around items-center">
              <h1>Bugs are part of us!</h1>
              <Image
                src={`/animated-icons/floody-house.gif`}
                alt=""
                width={60}
                height={60}
              />
            </div>
          );
        },
        icon: "",
      },
    },
    { position: toast.POSITION.BOTTOM_LEFT }
  );
export { toastPromise };
