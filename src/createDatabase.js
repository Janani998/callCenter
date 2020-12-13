const { employeesModel } = require('./connector')
const { data } = require('./data')

const refreshAll = async () => {
    await employeesModel.deleteMany({})
    
    await employeesModel.insertMany(data)
}
refreshAll()