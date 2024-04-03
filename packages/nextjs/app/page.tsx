"use client";

// TODO:
// players to get address and team name
// getPlayerScores returns list of playeScores with the same order as 'players' struct
// getPlayersLevels returns list of levels(0 to 4) with same order with 'players' struct
import Link from "next/link";
import NFTImageViewer from "./NFTImageViewer";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { data: numberOfPlayers } = useScaffoldContractRead({
    contractName: "HuntRegisterNFT",
    functionName: "getNumberOfPlayers",
  });

  const { data: allPlayers } = useScaffoldContractRead({
    contractName: "HuntRegisterNFT",
    functionName: "getAllPlayers",
  });

  // const { data: playerInfo } = useScaffoldContractRead({
  //   contractName: "HuntRegisterNFT",
  //   functionName: "getPlayerInfo",
  //   args: [connectedAddress],
  // });

  const { data: tokenURI } = useScaffoldContractRead({
    contractName: "HuntRegisterNFT",
    functionName: "tokenURIByPlayer",
    args: [connectedAddress],
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "HuntRegisterNFT",
    functionName: "updatePlayerLevel",
    args: [connectedAddress],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  interface PlayerType {
    codename: string;
    addr: string;
    team: number;
    score: number;
    level: number;
  }

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

          <>
            <p className="text-center text-lg">
              <li>1. Register to HuntRegisterNFT → Get your first NFT</li>
              <li>2. Refresh current your score and level when you clear each quiz.</li>
            </p>
          </>
          <h2 className="text-center">
            <button className="btn btn-primary" onClick={() => writeAsync()}>
              Refresh Score
            </button>
          </h2>

          <NFTImageViewer metadataUrl={tokenURI ?? ""} />

          {allPlayers?.map((player: PlayerType, index: number) => (
            <div key={index} className="bg-base-100 p-4 rounded-lg my-4">
              <p className="font-bold">Player: {player.codename}</p>
              <p>Address: {player.addr}</p>
              <p>Team: {player.team === 0 ? "Cat" : "Dog"}</p>
              <p>Score: {player.score.toString()}</p>
              <p>Level: {player.level.toString()}</p>
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
