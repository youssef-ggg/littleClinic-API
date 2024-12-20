module.exports = function buildMakeBalanceTransaction() {

    return function makeBalanceTransaction({
        id,
        description,
        date,
        //change to something better
        investment = 0,
        revenue = 0,
        otherRevenue = 0,
        wages = 0,
        equipment = 0,
        otherExpenses = 0,
        //-----------------------
        createdOn = Date.now(),
        modifiedOn = Date.now()
    } = {}) {

        if (description != 'Opening Balance' && description != 'Closing Balance') {
            throw new Error('Wrong description it must be "Opening Balance" or "Closing Balance" !')
        }
        if (typeof (investment) != 'number') {
            throw new Error('Investment must be a number!')
        }
        if (typeof (revenue) != 'number') {
            throw new Error('Revenue must be a number!')
        }
        if (typeof (otherRevenue) != 'number') {
            throw new Error('Other must be a number!')
        }
        if (typeof (wages) != 'number') {
            throw new Error('Wages must be a number!')
        }
        if (typeof (equipment) != 'number') {
            throw new Error('Equipment must be a number!')
        }
        if (typeof (otherExpenses) != 'number') {
            throw new Error('Marketing must be a number!')
        }
        if (!date) {
            throw new Error('Must have a date value!')
        }

        return Object.freeze({
            getId: () => id,
            getDescription: () => description,
            getDate: () => date,
            getInvestment: () => investment,
            getRevenue: () => revenue,
            getOtherRevenue: () => otherRevenue,
            getWages: () => wages,
            getOtherExpenses: () => otherExpenses,
            getEquipment: () => equipment,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn
        })
    }
}