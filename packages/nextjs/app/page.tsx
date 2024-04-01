"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { data: numberOfPlayers } = useScaffoldContractRead({
    contractName: "HuntRegistration4",
    functionName: "getNumberOfPlayers",
  });

  const { data: allPlayers } = useScaffoldContractRead({
    contractName: "HuntRegistration4",
    functionName: "getAllPlayers",
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Hooty</span>
            <span className="block text-4xl font-bold">{numberOfPlayers ? numberOfPlayers.toString() : 0}</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <img src="/catbg.png" alt="Cat" width={100} height={100} />
            <img src="/doge-removebg-preview.png" alt="Dog" width={100} height={100} />
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          {allPlayers?.map((player, index) => (
            <div key={index} className="flex bg-base-100 p-1 rounded-lg my-4 items-center justify-center">
              <div className="flex p-0.5 items-center space-x-2">
                <p className="font-bold">Player: {player.codename}</p>
                <p>Address: {player.addr}</p>
                <div className="w-5 h-5 flex items-center justify-center">
                  {" "}
                  {/* Container for image */}
                  {player.team === 0 ? (
                    <img src="/catbg.png" alt="Cat" className="object-cover w-full h-full" />
                  ) : (
                    <img src="/doge-removebg-preview.png" alt="Dog" className="object-cover w-full h-full" />
                  )}
                </div>
              </div>
            </div>
          ))}

          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
