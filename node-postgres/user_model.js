const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'retention_users',
  password: 'Idawalter@10',
  port: 5432,
});

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const selectUsers = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, password } = body
    pool.query(
      "SELECT email,password FROM users where email = $1 and password = $2",
      [email, password],
      (err, result) => {
        if(err){
        //  res.send({err: err});
        reject(error);
        }
        if (result.rows){
          resolve(result.rows);
          // res.send(result.fields[0])
        } else{
          resolve("User not found");
        }
  
      }
    );
  }) 
}

module.exports = {
    getUsers,
    selectUsers
  }