const BASE_URL = "https://openlibrary.org";

export async function searchBooks(query) {
  try {
    const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in searchBooks:", error);
    throw error;
  }
}

export async function getBookDetails(olid) {
  try {
    const response = await fetch(`${BASE_URL}/works/${olid}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getBookDetails:", error);
    throw error;
  }
}

export async function getRandomBooks(subject = "fiction") {
  try {
    const res = await fetch(
      `https://openlibrary.org/subjects/${subject}.json?limit=20`
    );
    if (!res.ok) throw new Error("Failed to fetch random books");
    return await res.json();
  } catch (error) {
    console.error("Error in getRandomBooks:", error);
    throw error;
  }
}
