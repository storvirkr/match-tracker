"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchList from "./components/match-list";
import { ApiResponse, Match } from "../types/types";
import { RefreshCcw, TriangleAlert } from "lucide-react";

const Home: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMatches = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/fronttemp`
      );
      setMatches(response.data.data.matches);
    } catch (err) {
      setError("Ошибка: не удалось загрузить информацию");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleRefresh = () => {
    fetchMatches();
  };

  return (
    <div className="font-semibold bg-black w-480">
      <div className="flex justify-between py-5">
        <h1 className="tactic text-white text-3xl">Match-tracker</h1>
        <div className="flex">
          {error && (
            <p className="bg-[#0F1318] text-white text-xl flex items-center rounded-md px-3">
              <TriangleAlert className="text-[#EB0237] pr-3 w-7 h-7" />
              {error}
            </p>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-[#EB0237] ml-5 text-white w-51 h-14 hover:cursor-pointer active:bg-[#A01131] rounded-md flex justify-center items-center"
          >
            Обновить
            <RefreshCcw className={`${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
      <MatchList matches={matches} />
    </div>
  );
};

export default Home;
