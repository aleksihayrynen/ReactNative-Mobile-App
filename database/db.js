import { openDatabase } from 'react-native-sqlite-storage';

//Name of the database
var db = openDatabase({ name: 'Workouts.db' });

//Function to initialize the database and create tables
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
    /*
      tx.executeSql('DROP TABLE IF EXISTS workouts;', []);                    //drops the database if not commented out good for 
      tx.executeSql('DROP TABLE IF EXISTS exerciseMovements;', []);           //resetting the db and testing
    */  

      // Create tables if they don't exist
      //Workouts table uses INTEGER DEFAULT 0 -- Use 0 for 'false' and 1 for 'true' previous version did not work with BOOLEAN.
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS workouts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          archived INTEGER DEFAULT 0 -- Use 0 for 'false' and 1 for 'true'   
        );`,
        []
      );
      //Same, creates the exercise table if none did exist
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS exerciseMovements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER,
          name TEXT NOT NULL,
          sets INTEGER NOT NULL,
          reps INTEGER NOT NULL,
          weight REAL NOT NULL 
        );`,
        []
      );

      resolve();
    });
  });
  return promise;
};

//Workouts section(Homepage flatlist)

// Add a new workout to the 'workouts' table
export const addWorkout = (name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO workouts (name) VALUES (?);',
        [name],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// Update a workout in the 'workouts' table
export const updateWorkout = (id, name, archived) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE workouts SET name=?, archived=? WHERE id=?;',
        [name, archived, id],
        () => {
          console.log('Workout updated successfully:', id, name, archived);
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//Deletes a workout in the 'workouts' table
export const deleteWorkout = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'delete from workouts where id=?;',
        [id],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// Fetch all workouts from the 'workouts' table
export const fetchAllWorkouts = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM workouts;',
        [],
        (_, result) => {
          let items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
          }
          resolve(items);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// Fetch a workout by its ID from the 'workouts' table
export const fetchWorkoutById = (workoutId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM workouts WHERE id = ?;',
        [workoutId],
        (_, result) => {
          if (result.rows.length > 0) {
            const workout = result.rows.item(0);
            resolve(workout);
          } else {
            reject(new Error('Workout not found'));
          }
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//End of Workout section

//Start of Exercise section

// Add a new exercise movement to the 'exerciseMovements' table
export const addExerciseMovement = (workoutId, name, sets, reps, weight) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO exerciseMovements (workout_id, name, sets, reps, weight) VALUES (?, ?, ?, ?, ?);',
        [workoutId, name, sets, reps, weight],
        (_, result) => {
          console.log('Exercise added successfully:', result);
          resolve();
        },
        (_, err) => {
          console.log('Error adding exercise:', err);
          reject(err);
        }
      );
    });
  });
  return promise;
};


// Update an exercise movement in the 'exerciseMovements' table
export const updateExerciseMovement = (id, workoutId, name, sets, reps, weight) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE exerciseMovements SET workout_id=?, name=?, sets=?, reps=?, weight=? WHERE id=?;',
        [workoutId, name, sets, reps, weight, id],
        () => {
          console.log('Exercise updated successfully:', id, workoutId, name, sets, reps, weight);
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// Delete an exercise movement from the 'exerciseMovements' table
export const deleteExerciseMovement = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'delete from exerciseMovements where id=?;',
        [id],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// Fetch all exercise movements for a workout from the 'exerciseMovements' table
//Yes stupidly long name made mistakes in the early naming proces and was too deep ;D
export const fetchExerciseMovementsForWorkout = (workoutId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM exerciseMovements WHERE workout_id = ?;',
        [workoutId],
        (_, result) => {
          let items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
          }
          resolve(items);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};




//end of Exercise section


