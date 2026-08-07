CREATE TABLE IF NOT EXISTS vote_submissions (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rankings (
  submission_id TEXT NOT NULL,
  category TEXT NOT NULL,
  restaurant TEXT NOT NULL,
  rank INTEGER NOT NULL,
  PRIMARY KEY (submission_id, category, rank),
  FOREIGN KEY (submission_id) REFERENCES vote_submissions(id)
);

CREATE INDEX IF NOT EXISTS rankings_category_rank ON rankings (category, rank);
