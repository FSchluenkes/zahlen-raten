import axios from "axios";
import { API_URL } from "./auth";

interface GameResponse {
  game_id?: string;
  message?: string;
  error?: string;
}

interface GuessResponse {
  message: string;
  guess: number;
  result: "too high" | "too low" | "correct";
  attempts: number;
  error?: string;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string | null;
  attempts: number;
  created_at: string;
}

export const startGame = async (token?: string): Promise<GameResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get<GameResponse>(`${API_URL}/start`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as GameResponse;
    }
    throw error;
  }
};

export const makeGuess = async (
  gameId: string,
  number: number
): Promise<GuessResponse> => {
  try {
    const response = await axios.post<GuessResponse>(`${API_URL}/guess`, {
      game_id: gameId,
      number: number,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as GuessResponse;
    }
    throw error;
  }
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const response = await axios.post<LeaderboardEntry[]>(
      `${API_URL}/leaderboard`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Ein Problem ist aufgetreten!"
      );
    }
    throw error;
  }
};
