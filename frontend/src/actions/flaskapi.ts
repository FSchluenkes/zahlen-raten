"use server";

const FlaskAPI_URL = "http://localhost:5000";

export async function rateZahl(zahl: string) {
  try {
    const response = await fetch(`${FlaskAPI_URL}/raten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zahl }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
