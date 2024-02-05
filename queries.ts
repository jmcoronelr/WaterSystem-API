const getUsers = "SELECT * FROM users";
const getUserByID = "SELECT * FROM users WHERE userid = $1";
const checkAttribute = (attribute: string) => {
  const query = `SELECT u FROM users u WHERE u.${attribute} = $1`;
  return query;
};
const addUser =
  "INSERT INTO users (name, lastname, email, password, ci, house_number) VALUES($1,$2,$3,$4,$5,$6)";
const deleteUser = "DELETE FROM users WHERE userid = $1";
const updateUserInfo =
  "UPDATE users SET name=$1,lastname=$2,email=$3,ci=$4,house_number=$5 WHERE userid = $6";
const updateUserPass = "UPDATE users SET password = $1 WHERE userid = $2";
const getBills =
  "SELECT  b.* FROM users u JOIN bills b ON u.userid = b.userid WHERE u.userid = $1";
const getBillById = "SELECT * FROM bills WHERE billid =$1 AND userid = $2";
const createBill =
  "INSERT INTO bills (userid, date, status, amount) VALUES ($1,$2,$3,$4)";
const deleteBill = "DELETE FROM bills WHERE userid = $1 AND billid = $2";
const updateBill =
  "UPDATE bills SET date = $3, status = $4, amount = $5  WHERE userid = $1 AND billid = $2";
const getAssists = "SELECT * FROM assists WHERE assists.userid = $1";
const getAssistById =
  "SELECT * FROM assists WHERE  assistid = $1 AND userid = $2";
const createAssist =
  "INSERT INTO assists (userid, fecha, tipo_asistencia) VALUES ($1,$2,$3)";
const deleteAssist = "DELETE FROM assists WHERE userid = $1 AND assistid = $2";
const updateAssist =
  "UPDATE assists SET fecha = $3, tipo_asistencia = $4 WHERE userid = $1 AND assistid = $2";
export {
  getUsers,
  getUserByID,
  addUser,
  checkAttribute,
  deleteUser,
  updateUserInfo,
  updateUserPass,
  getBills,
  getBillById,
  createBill,
  deleteBill,
  updateBill,
  getAssists,
  getAssistById,
  createAssist,
  deleteAssist,
  updateAssist,
};
