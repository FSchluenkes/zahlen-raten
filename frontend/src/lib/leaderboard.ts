"use server";



export async function getLeaderboard() {
  // const response = await fetch(
  //   `${process.env.API_URL}/leaderboard`,
  //   {
  //     headers: {
  //       Accept: "application/vnd.github.v3+json",
  //       Authorization: `Bearer ${process.env.TOKEN}`,
  //     },
  //   }
  // );
  // const data = await response.json();
  return [];
}

export async function getMockLeaderboard() {
  // Simuliere eine Verzögerung, um eine API-Anfrage nachzuahmen
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { id: 1, name: "Max Mustermann", attempts: 5, score: 42 },
    { id: 2, name: "Anna Schmidt", attempts: 7, score: 36 },
    { id: 3, name: "Erika Musterfrau", attempts: 6, score: 39 },
    { id: 4, name: "Thomas Müller", attempts: 8, score: 33 },
    { id: 5, name: "Laura Weber", attempts: 4, score: 45 },
    { id: 6, name: "Michael Schneider", attempts: 9, score: 30 },
    { id: 7, name: "Sarah Fischer", attempts: 5, score: 41 },
    { id: 8, name: "Felix Bauer", attempts: 7, score: 35 },
    { id: 9, name: "Lisa Wagner", attempts: 6, score: 38 },
    { id: 10, name: "David Hoffmann", attempts: 8, score: 32 }
  ];
}