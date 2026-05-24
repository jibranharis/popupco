// DB Stub – SQLite is disabled for the static sharing concept.
// This prevents better-sqlite3 from being imported and failing on Vercel.

export function getDb() {
  return {
    prepare: () => ({
      all: () => [],
      get: () => ({ count: 0 }),
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
    }),
    exec: () => {},
    pragma: () => {},
  };
}

export default getDb;
