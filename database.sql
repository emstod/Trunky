CREATE TABLE Event (
  id TEXT NOT NULL PRIMARY KEY,
  categoryId TEXT,
  isBackup INTEGER,
  FOREIGN KEY(categoryId) REFERENCES Category(id)
);

CREATE TABLE Goal (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT,
  description TEXT,
  frequency TEXT,
  quantity INTEGER,
  category TEXT
);

INSERT INTO Goal VALUES('1','Get A''s this semester','Get my GPA up to 3.85!','once',1,'School');
INSERT INTO Goal VALUES('2','Finish homework before Netflix',NULL,'daily',1,'School');
INSERT INTO Goal VALUES('3','Take a walk twice a day','At least a quarter of a mile!','daily',2,'Work');

CREATE TABLE GoalComplete (
  goalId TEXT NOT NULL,
  date TEXT NOT NULL,
  completed INTEGER,
  PRIMARY KEY(goalId, date),
  FOREIGN KEY(goalId) REFERENCES Goal(id)
);

CREATE TABLE EventTask (
  eventId TEXT NOT NULL,
  taskId TEXT NOT NULL,
  PRIMARY KEY(eventId, taskId),
  FOREIGN KEY(eventId) REFERENCES Event(id),
  FOREIGN KEY(taskId) REFERENCES Task(id)
);

CREATE TABLE GoalTask (
  goalId TEXT NOT NULL,
  taskId TEXT NOT NULL,
  PRIMARY KEY(goalId, taskId),
  FOREIGN KEY(goalId) REFERENCES Goal(id),
  FOREIGN KEY(taskId) REFERENCES Task(id)
);

CREATE TABLE EventGoal (
  eventId TEXT NOT NULL,
  goalId TEXT NOT NULL,
  PRIMARY KEY(eventId, goalId),
  FOREIGN KEY(eventId) REFERENCES Event(id),
  FOREIGN KEY(goalId) REFERENCES Goal(id)
);