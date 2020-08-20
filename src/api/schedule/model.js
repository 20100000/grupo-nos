import database from "../../../config/database";
import queries from "./tool/queries";

const _getSchedules = async () => {
    let conn = null;
    try{
        conn = await database.getConnection(true);
        const data = await database.execute(conn, queries.QSelectAllSchedules);
        return  data;

    }catch (e) {
        //todo
    }finally {
        database.closeConn(conn);

    }
}

const _getSchedule = async (id) => {
    let conn = null;
    try{
        conn = await database.getConnection(true);
        return await database.execute(conn, queries.QSeletcSchedule,[id]);

    }catch (e) {
        //todo
    }finally {
        database.closeConn(conn);

    }
}

const _saveSchedule = async (schedule) => {
    let conn = null;
    try{
        conn = await database.getConnection(true);
        const resAddress = await database.execute(conn, queries.QSaveAddress,[schedule.addressLine,
            schedule.addressNumber,schedule.neighborhood,schedule.city,schedule.state,schedule.code]);
        const resSchedule = await database.execute(conn, queries.QSaveSchedule,[schedule.name, schedule.email,
            resAddress.insertId]);
        schedule.fones.map( async (item,idx) =>{
            await database.execute(conn, queries.QSaveFone,[item.number, resSchedule.insertId]);
        });
        return resSchedule.insertId;
    }catch (e) {
        //todo
    }finally {
        database.closeConn(conn);

    }
}

const _updateSchedule = async (schedule, id) => {
    let conn = null;
    try{
        conn = await database.getConnection(true);

        const upSchedule =  await database.execute(conn, queries.QUpdateSchedule,[schedule.name,schedule.email,
            schedule.addressLine,schedule.addressNumber,schedule.neighborhood,schedule.city,schedule.state,schedule.code, id]);
        schedule.fones.map( async (item,idx) =>{
            await database.execute(conn, queries.QUpdateFone,[item.number, item.id]);
        });
        return upSchedule;
    }catch (e) {
        //todo
    }finally {
        database.closeConn(conn);

    }
}

const _deleteSchedule = async (id) => {
    let conn = null;
    try{
        conn = await database.getConnection(true);
        return await database.execute(conn, queries.QDeleteSchedule,[id]);

    }catch (e) {
        //todo
    }finally {
        database.closeConn(conn);

    }
}

const _searchSchedule = async (item) => {
    let conn = null;
    try{
        conn = await database.getConnection(true);
        const data = await database.execute(conn, queries.QSelectFindSchedules,[item.find,'%'+item.find+'%',item.find,item.find,item.find,item.find]);
        return  data;

    }catch (e) {
        //todo
    }finally {
        database.closeConn(conn);

    }
}

module.exports.mGetSchedules = _getSchedules;
module.exports.mGetSchedule = _getSchedule;
module.exports.mSaveSchedule = _saveSchedule;
module.exports.mUpdateSchedule = _updateSchedule;
module.exports.mDeleteSchedule = _deleteSchedule;
module.exports.mSearchSchedules = _searchSchedule;
