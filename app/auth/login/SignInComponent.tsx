"use client";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Image from "next/image";

interface IProps {
  // providers: Record<
  //   LiteralUnion<BuiltInProviderType, string>,
  //   ClientSafeProvider
  // > | null;
  providers: Awaited<ReturnType<typeof getProviders>>;
}
function SignInComponent({ providers }: IProps) {
  return (
    <div className="flex justify-center ">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className="flex items-center space-x-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-black px-4 py-2 rounded-md"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
            <Image
              className="rounded-full mx-2 object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              width={20}
              height={20}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;
