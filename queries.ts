const getUsers = "SELECT * FROM USERS";
const getUserByID = "SELECT * FROM USERS WHERE userid = $1";
const checkAttribute = (attribute: string) => {
  const query = `SELECT u FROM USERS u WHERE u.${attribute} = $1`;
  return query;
};
const addUser =
  "INSERT INTO USERS (name, lastname, email, password, ci, house_number) VALUES($1,$2,$3,$4,$5,$6)";
const deleteUser = "DELETE FROM USERS WHERE userid = $1";
const updateUserInfo =
  "UPDATE USERS SET name=$1,lastname=$2,email=$3,ci=$4,house_number=$5 WHERE userid = $6";
const updateUserPass = "UPDATE USERS SET password = $1 WHERE userid = $2";
export {
  getUsers,
  getUserByID,
  addUser,
  checkAttribute,
  deleteUser,
  updateUserInfo,
  updateUserPass,
};
