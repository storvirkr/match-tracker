import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Match } from "../../types/types";
import Image from "next/image";
import avatar from "../../public/avatar.png";
import avatarGlob from "../../public/avatar_global.png";

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const statusColor = {
    Scheduled: "bg-[#EB6402]",
    Ongoing: "bg-[#43AD28]",
    Finished: "bg-[#EB0237]",
  }[match.status];

  const toggleExpand = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`mb-3 w-480 bg-[#0F1318] text-white transition-all duration-300 flex justify-between ${isOpen ? "h-[255px] grid grid-cols-3 grid-rows-2" : "h-22"
        }`}
    >
      <div className="flex justify-start items-center">
        <Image src={avatar} alt="avatar" width={48} height={48} />
        {match.awayTeam.name}{" "}
      </div>
      <div
        className={`pt-2 ${isOpen ? "place-content-center place-items-center" : "items-center"
          }`}
      >
        <p className="text-xl text-center">
          {match.awayScore}:{match.homeScore}
        </p>
        <button className={`rounded-xs w-23 h-7 text-xs ${statusColor}`}>
          {match.status}
        </button>
      </div>
      <div className="flex justify-end items-center">
        {match.homeTeam.name}
        <Image src={avatar} alt="avatar" width={48} height={48} />
        <button className="hover:cursor-pointer" onClick={toggleExpand}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isOpen && (
        <div className="pl-8 w-480 flex flex-row h-34">
          <div className="grid grid-cols-3 w-219 mr-3">
            {/* away team */}
            {match.awayTeam.players.map((player, index) => (
              <div
                key={index}
                className="m-2 w-71 h-13 bg-[#141A21] flex justify-between rounded-md items-center"
              >
                <div className="flex items-center">
                  <Image width={36} height={36} src={avatarGlob} alt="player" />
                  <p>{player.username}</p>
                </div>
                <p>Убийств: {player.kills}</p>
              </div>
            ))}
            <div className="w-219 h-13 bg-[#141A21] rounded-md flex justify-between items-center">
              <p>Points: {match.awayTeam.points}</p>
              <p>Place: {match.awayTeam.place}</p>
              <p>Total Kills: {match.awayTeam.total_kills}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 w-219 ml-3">
            {/* home team  */}
            {match.homeTeam.players.map((player, index) => (
              <div
                key={index}
                className="m-2 w-71 h-13 bg-[#141A21] flex justify-between rounded-md items-center"
              >
                <div className="flex items-center">
                  <Image width={36} height={36} src={avatarGlob} alt="player" />
                  <p>{player.username}</p>
                </div>
                <p>Убийств: {player.kills}</p>
              </div>
            ))}
            <div className="w-219 h-13 bg-[#141A21] flex justify-between items-center">
              <p>Points: {match.awayTeam.points}</p>
              <p>Place: {match.awayTeam.place}</p>
              <p>Total Kills: {match.awayTeam.total_kills}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
