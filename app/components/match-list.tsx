import React from "react";
import MatchCard from "./match-card";
import { Match } from "../../types/types";

interface MatchListProps {
  matches: Match[];
}

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <div className="rounded-md">
      {matches.map((match) => (
        <MatchCard key={match.time} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
