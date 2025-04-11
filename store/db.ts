import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('weatherHistory.db');

export async function init() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS search_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `);
}

export async function addCityToHistory(city: string) {
  const now = new Date().toISOString();

  await db.runAsync('DELETE FROM search_history WHERE LOWER(city) = ?;', [city.toLowerCase()]);

  await db.runAsync(
    'INSERT INTO search_history (city, date) VALUES (?, ?);',
    [city, now]
  );
}

export async function deleteOldCities() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  await db.runAsync(
    'DELETE FROM search_history WHERE date < ?;',
    [oneWeekAgo]
  );
}

export async function getHistory(): Promise<{ id: number; city: string; date: string }[]> {
  return await db.getAllAsync('SELECT * FROM search_history ORDER BY date DESC');
}

export async function deleteCityById(id: number) {
  await db.runAsync('DELETE FROM search_history WHERE id = ?;', [id]);
}

export async function deleteCityByName(city: string) {
  await db.runAsync('DELETE FROM search_history WHERE city = ?;', [city]);
}
