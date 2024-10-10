"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { handleLogin, handleRegister } from "@/lib/client-auth";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    isLogin: boolean
  ) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await handleLogin(username, password);
      } else {
        await handleRegister(username, password);
        await handleLogin(username, password);
      }
      setIsLoading(false);
      router.push("/guesser");
    } catch (err) {
      setIsLoading(false);
      setError(
        isLogin
          ? "Falscher Benutzername oder Passwort"
          : "Registrierung fehlgeschlagen"
      );
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e, true)}
      className="space-y-4 w-full max-w-md"
    >
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Benutzername
        </label>
        <input
          type="text"
          id="username"
          aria-label="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          aria-label="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="flex flex-row-reverse justify-center gap-4">
        <Button
          type="submit"
          disabled={!username || !password || isLoading}
          aria-label="Anmelden"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Anmelden
          {isLoading && <span className="ml-2 text-white">...</span>}
        </Button>
        <Button
          type="button"
          onClick={(e) => handleSubmit(e as any, false)}
          disabled={!username || !password || isLoading}
          aria-label="Registrieren"
          className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrieren
          {isLoading && <span className="ml-2 text-white">...</span>}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
