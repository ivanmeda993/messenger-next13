import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();
  return (
    <div className="grid justify-center ">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          src="/logo.png"
          alt="Google"
          width={400}
          height={400}
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
