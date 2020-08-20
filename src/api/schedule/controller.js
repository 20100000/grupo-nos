import hgBrasil from "./tool/hgBrazilWeather";

const createJsonFones = (array) =>{
    let fone = [];
    array.forEach((item,idx) => {
        let objItem = {id: item.fone_id, number: item.number};
        fone.push(objItem);
    });
    return fone;
}
const _allSchedule = async (req, res, next, model) => {
    try {
        let dataRes = [];
        const data = await model.mGetSchedules();
        let id = 0;
        data.forEach((item,idx) => {
            if(id != item.id){
                const obj = { name:item.name, email: item.email, fones: [{id: data[idx].fone_id, number: data[idx].number }]}
                dataRes.push(obj);
            }else{
                dataRes[idx-1].fones.push( {id: data[idx].fone_id, number: data[idx].number })
            }
            id = item.id;
        });

        return res.send(JSON.stringify({success: true, data: dataRes}));
    } catch (e) {
        res.status(400);
        return res.send(JSON.stringify({success: false, error: e}));
    }
};

const _getSchedule = async (req, res, next, model, config) => {
    const id = req.params.id
    try {
        let dataRes = { name: "", email:"", fones:[] };
        const data = await model.mGetSchedule(id);
        dataRes.name = data[0].name;
        dataRes.email= data[0].email;
        dataRes.addressLine= data[0].address_line;
        dataRes.addressNumber= data[0].address_number;
        dataRes.neighborhood= data[0].neighborhood;
        dataRes.city= data[0].city;
        dataRes.state= data[0].state;
        dataRes.code= data[0].code;
        dataRes.fones = createJsonFones(data);

        return res.send(JSON.stringify({success: true, data: dataRes}));
    } catch (e) {
        res.status(400);
        return res.send(JSON.stringify({success: false, error: e}));
    }
};

const _saveSchedule = async (req, res, next, model) => {
    const schedule = req.body;
    try {
        if (schedule.name && schedule.city){
            const id = await model.mSaveSchedule(schedule);
            schedule.id = id;
            return res.send(JSON.stringify({success: true, data: schedule}));
        }else{
            res.status(400);
            return res.send(JSON.stringify({success: false, error: 'insira nome e cidade'}));
        }
    } catch (e) {
        res.status(400);
        return res.send(JSON.stringify({success: false, error: e}));
    }
};

const _updateSchedule = async (req, res, next, model) => {
    const id = req.params.id
    const schedule = req.body;
    try {
        if (schedule.name && schedule.city){
            const data = await model.mUpdateSchedule(schedule, id);
            return res.send(JSON.stringify({success: true, data: data}));
        }else{
            res.status(400);
            return res.send(JSON.stringify({success: false, error: 'insira nome e cidade'}));
        }
    } catch (e) {
        res.status(400);
        return res.send(JSON.stringify({success: false, error: e}));
    }
};

const _removeSchedule = async (req, res, next, model) => {
    const id = req.params.id
    try {
        const data = await model.mDeleteSchedule(id);
        return res.send(JSON.stringify({success: true, data: data}));
    } catch (e) {
        res.status(400);
        return res.send(JSON.stringify({success: false, error: e}));
    }
};

const _searchSchedule = async (req, res, next, model, hgBrasil) => {
    const item = req.body;
    // try {
        let dataRes = [];
        const data = await model.mSearchSchedules(item);
        let id = 0;
        let cont = 0;
        for (const item of data) {
            if(id != item.id){
                const dataTemp = await hgBrasil.getTempTip(item.city);
                let obj = { name:item.name, email: item.email, dataTemp: dataTemp,
                    addressLine: item.address_line, addressNumber: item.address_number,
                    neighborhood: item.neighborhood, city: item.city, state: item.state, code: item.code,
                    fones: [{id: data[cont].fone_id, number: data[cont].number }]};
                dataRes.push(obj);
            }else{
                dataRes[cont-1].fones.push( {id: data[cont].fone_id, number: data[cont].number })
            }
            id = item.id;
            cont++;
        };


        return res.send(JSON.stringify({success: true, data: dataRes}));
    // } catch (e) {
    //     res.status(400);
    //     return res.send(JSON.stringify({success: false, error: e}));
    // }
};

const getController = (model, hgBrasil) => ({
    scheduleAll: (req, res, next) => _allSchedule(req, res, next, model ),
    getSchedule: (req, res, next) => _getSchedule(req, res, next, model ),
    saveSchedule: (req, res, next) => _saveSchedule(req, res, next, model),
    deleteSchedule: (req, res, next) => _removeSchedule(req, res, next, model),
    updateSchedule: (req, res, next) => _updateSchedule(req, res, next, model),
    searchSchedule: (req, res, next) => _searchSchedule(req, res, next, model, hgBrasil),

});

module.exports.getController = getController;
