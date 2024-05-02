PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS Category (
id TEXT PRIMARY KEY,
name TEXT,
color TEXT,
user TEXT
);
INSERT INTO Category VALUES('1','School','F99F53','Emily');
INSERT INTO Category VALUES('2','Work','C0BA6E','Emily');
INSERT INTO Category VALUES('3','Social','FDD9D5','Emily');
INSERT INTO Category VALUES('4','Spiritual','3B695F','Emily');
INSERT INTO Category VALUES('5','Physical','00495F','Emily');
CREATE TABLE IF NOT EXISTS Event (
id TEXT NOT NULL PRIMARY KEY,
categoryId TEXT,
isBackup INTEGER,
FOREIGN KEY(categoryId) REFERENCES Category(id)
);
CREATE TABLE IF NOT EXISTS GoalComplete (
goalId TEXT NOT NULL,
date TEXT NOT NULL,
completed INTEGER,
PRIMARY KEY(goalId, date),
FOREIGN KEY(goalId) REFERENCES Goal(id)
);
INSERT INTO GoalComplete VALUES('ec1e54ba-4621-48de-a260-9efb30935649','Thu Apr 18 2024',2);
INSERT INTO GoalComplete VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','Fri Apr 19 2024',10);
INSERT INTO GoalComplete VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','Mon Apr 22 2024',0);
INSERT INTO GoalComplete VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','Mon Apr 22 2024',1);
INSERT INTO GoalComplete VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','Tue Apr 23 2024',1);
INSERT INTO GoalComplete VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','Wed Apr 24 2024',15);
INSERT INTO GoalComplete VALUES('ec1e54ba-4621-48de-a260-9efb30935649','Wed Apr 24 2024',2);
INSERT INTO GoalComplete VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','Wed Apr 24 2024',1);
INSERT INTO GoalComplete VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','Wed Apr 24 2024',2);
INSERT INTO GoalComplete VALUES('3752459d-4a8b-47a0-a4ea-5d9dd85094f0','Wed Apr 24 2024',0);
INSERT INTO GoalComplete VALUES('ec1e54ba-4621-48de-a260-9efb30935649','Thu Apr 25 2024',1);
INSERT INTO GoalComplete VALUES('3752459d-4a8b-47a0-a4ea-5d9dd85094f0','Sun Apr 21 2024',3);
INSERT INTO GoalComplete VALUES('3752459d-4a8b-47a0-a4ea-5d9dd85094f0','Thu Apr 18 2024',3);
INSERT INTO GoalComplete VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','Thu Apr 25 2024',1);
INSERT INTO GoalComplete VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','Fri Apr 26 2024',1);
CREATE TABLE IF NOT EXISTS EventTask (
eventId TEXT NOT NULL,
taskId TEXT NOT NULL,
PRIMARY KEY(eventId, taskId),
FOREIGN KEY(eventId) REFERENCES Event(id),
FOREIGN KEY(taskId) REFERENCES Task(id)
);
CREATE TABLE IF NOT EXISTS GoalTask (
goalId TEXT NOT NULL,
taskId TEXT NOT NULL,
PRIMARY KEY(goalId, taskId),
FOREIGN KEY(goalId) REFERENCES Goal(id),
FOREIGN KEY(taskId) REFERENCES Task(id)
);
INSERT INTO GoalTask VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','A');
INSERT INTO GoalTask VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','B');
INSERT INTO GoalTask VALUES('3752459d-4a8b-47a0-a4ea-5d9dd85094f0','A');
INSERT INTO GoalTask VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','B');
INSERT INTO GoalTask VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','51fb7119-a883-44ac-9c0f-e90c472da21a');
INSERT INTO GoalTask VALUES('3752459d-4a8b-47a0-a4ea-5d9dd85094f0','51fb7119-a883-44ac-9c0f-e90c472da21a');
INSERT INTO GoalTask VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','51fb7119-a883-44ac-9c0f-e90c472da21a');
INSERT INTO GoalTask VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','51fb7119-a883-44ac-9c0f-e90c472da21a');
INSERT INTO GoalTask VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','e9dc5aa6-6fca-4370-9112-591f00f9077b');
INSERT INTO GoalTask VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','49780d2a-b317-4b9c-99e4-7f757177b72f');
INSERT INTO GoalTask VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','2144f82e-5fbf-4056-9507-b1fc2a58bbe5');
INSERT INTO GoalTask VALUES('ec1e54ba-4621-48de-a260-9efb30935649','96f05da3-3f02-4a95-a568-8332aff0b9ee');
INSERT INTO GoalTask VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','db59c943-8a79-4b8d-88f1-b6ea662251ac');
INSERT INTO GoalTask VALUES('ec1e54ba-4621-48de-a260-9efb30935649','db970105-d1b2-4a4c-af34-a5538a026057');
INSERT INTO GoalTask VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','9e65cee2-c6d7-4d5c-bda4-2a2d73b71ae8');
CREATE TABLE IF NOT EXISTS EventGoal (
eventId TEXT NOT NULL,
goalId TEXT NOT NULL,
PRIMARY KEY(eventId, goalId),
FOREIGN KEY(eventId) REFERENCES Event(id),
FOREIGN KEY(goalId) REFERENCES Goal(id)
);
CREATE TABLE IF NOT EXISTS User (
username TEXT PRIMARY KEY,
password TEXT NOT NULL,
token TEXT NOT NULL
);
INSERT INTO User VALUES('Emily','Test','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
CREATE TABLE IF NOT EXISTS Goal (
id TEXT NOT NULL PRIMARY KEY,
title TEXT,
description TEXT,
frequency TEXT,
quantity INTEGER,
category TEXT,
user TEXT NOT NULL
);
INSERT INTO Goal VALUES('ec1e54ba-4621-48de-a260-9efb30935649','Walk the dog twice a day','','daily',2,'Physical','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Goal VALUES('3752459d-4a8b-47a0-a4ea-5d9dd85094f0','Go to the gym!','Plan my workouts beforehand','weekly',3,'Physical','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Goal VALUES('32ecea2f-0f1f-4887-b02c-c1dc34d3d4fe','Read for 30 minutes a day','10 minutes fiction, 10 minutes nonfiction','daily',30,'Intellectual','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Goal VALUES('34a58bd4-c38e-4c06-80ef-170f1c06a671','Finish homework before Netflix','','daily',1,'School','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Goal VALUES('a8274dae-c924-4306-b4e6-3ca8d84e3436','Test goal','Hello world','daily',2,'Test','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
CREATE TABLE IF NOT EXISTS Task (
id TEXT PRIMARY KEY,
title TEXT,
date INTEGER,
description TEXT,
completed INTEGER,
category TEXT,
user TEXT NOT NULL
);
INSERT INTO Task VALUES('A','Module 11 Homework','Fri Apr 19 2024','Details on Canvas',1,'School','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('B','Module 12 Homework','Sat Apr 20 2024','Details on Canvas',1,'School','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('C','Finish reports for Q4','Mon Apr 22 2024','Reply to Jenna once finished',1,'Work','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('49780d2a-b317-4b9c-99e4-7f757177b72f','Grocery shopping','Sat Apr 20 2024',replace('Walmart, Trader Joe''s, Costco\nDon''t forget green beans!','\n',char(10)),1,'Miscellaneous','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('e9dc5aa6-6fca-4370-9112-591f00f9077b','Read Biology textbook','Tue Apr 23 2024','',0,'School','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('51fb7119-a883-44ac-9c0f-e90c472da21a','Test task','Fri Apr 12 2024','Hello world',1,'Test','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('D','Test 1','Tue Apr 23 2024','',1,'Test','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('2144f82e-5fbf-4056-9507-b1fc2a58bbe5','Completed task','Fri Apr 26 2024','',1,'None','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('96f05da3-3f02-4a95-a568-8332aff0b9ee','Return library books','Sat Apr 27 2024','',0,'Miscellaneous','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('48762c6a-3171-44a4-9d29-61023149209c','Trader Joe''s run','Fri Apr 26 2024','',0,'None','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('db59c943-8a79-4b8d-88f1-b6ea662251ac','Weed the garden','Sat Apr 27 2024','',0,'Housekeeping','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('9e65cee2-c6d7-4d5c-bda4-2a2d73b71ae8','Practice flute','Tue Apr 30 2024','',0,'Intellectual','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');
INSERT INTO Task VALUES('db970105-d1b2-4a4c-af34-a5538a026057','Dog park','Mon Apr 29 2024','Meet up with Lexi?',0,'Physical','132ac6f71a6a2971034e4e520fc0de96ada4c6977117d6055f');

COMMIT;
