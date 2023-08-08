

CREATE TABLE cohorts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL
);

CREATE TABLE milestones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60),
  date DATE,
  github_pr VARCHAR(255),
  codewars_rank INTEGER,
  cohort_id INTEGER NOT NULL,
  FOREIGN KEY (cohort_id) REFERENCES Cohorts(id)
);



CREATE TABLE Trainees (
  id SERIAL PRIMARY KEY,
  github_name VARCHAR(60) NOT NULL UNIQUE,
  cohort_id INTEGER NOT NULL,
  FOREIGN KEY (cohort_id) REFERENCES Cohorts(id)
);

