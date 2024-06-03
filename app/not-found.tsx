import Link from "next/link";
import TheButton from "@/components/ui/TheButton";

const NotFound = () => {
  const linkStyles =
    "text-grays-1000 underline underline-offset-4 decoration-1 hover:decoration-2";

  return (
    <div className="flex justify-center align-middle flex-col h-svh bg-beiges-600">
      <h1 className="text-grays-400 text-[12.5rem] leading-[80px] text-center font-caveat mb-11">404</h1> <br />
      <h2 className="text-grays-1000 font-medium text-5xl text-center w-[60%] mx-auto">
        The page you were looking for does not exist.
      </h2>
      <div className="flex justify-center gap-1 my-12">
        <span>Most popular pages: </span>
        <Link className={linkStyles} href="/">
          Properties{" "}
        </Link>
        <Link className={linkStyles} href="/land">
          Land{" "}
        </Link>
        <Link className={linkStyles} href="/accomodation">
          Accomodation
        </Link>
      </div>
      <Link href="/">
        <TheButton className="w-fit mx-auto mt-5">Back to Home</TheButton>
      </Link>
    </div>
  );
};

export default NotFound;
