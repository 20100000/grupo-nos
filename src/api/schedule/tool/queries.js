const QSelectAllSchedules = `SELECT s.id, s.name, s.email, f.number, f.id AS fone_id FROM schedule AS s 
                                LEFT JOIN fones as f ON s.id = f.schedule_id
                                WHERE s.active = 1`;
const QSeletcSchedule = `SELECT s.id, s.name, s.email, a.address_line, a.address_number, a.neighborhood, a.city,a.state, a.code, f.id AS fone_id, f.number 
                            FROM schedule AS s
                            INNER JOIN address AS a ON a.id = s.address_id
                            LEFT JOIN fones AS f ON f.schedule_id = s.id
                        WHERE s.active = 1 AND s.id=?`;
const QSelectFindSchedules = `SELECT s.id, s.name, s.email, a.address_line, a.address_number, a.neighborhood, a.city,a.state, a.code, f.id AS fone_id, f.number 
                            FROM schedule AS s
                            INNER JOIN address AS a ON a.id = s.address_id
                            LEFT JOIN fones AS f ON f.schedule_id = s.id
                        WHERE s.active = 1 AND ( s.email = ? OR s.name LIKE ? OR f.number = ? OR a.city = ? OR a.address_line=?)`;

const QSaveSchedule = `INSERT INTO schedule (name, email, address_id, active) VALUES (?,?,?,1)`;
const QSaveAddress = `INSERT INTO address (address_line, address_number, neighborhood, city, state,code ) VALUES (?,?,?,?,?,?)`;
const QSaveFone =`INSERT INTO fones ( number, schedule_id) VALUES (?,?)`;

const QUpdateSchedule = `UPDATE schedule AS s INNER JOIN address AS a ON a.id = s.address_id
                            SET s.name = ?, s.email = ?,
                                a.address_line =? , a.address_number=?, a.neighborhood=?, a.city=?, a.state=?, a.code=?
                        WHERE s.id= ?`;
const QUpdateFone =`UPDATE fones SET number = ? WHERE id = ?`

const QDeleteSchedule = `UPDATE schedule SET active = 0 WHERE id = ?`;
module.exports.QSelectAllSchedules = QSelectAllSchedules;
module.exports.QSeletcSchedule = QSeletcSchedule;
module.exports.QSaveSchedule = QSaveSchedule;
module.exports.QSaveAddress = QSaveAddress;
module.exports.QSaveFone = QSaveFone;
module.exports.QUpdateSchedule = QUpdateSchedule;
module.exports.QDeleteSchedule = QDeleteSchedule;
module.exports.QUpdateFone = QUpdateFone;
module.exports.QSelectFindSchedules = QSelectFindSchedules;

