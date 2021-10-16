const makeFakeBalanceTransaction = require('../__test__/fixtures/balanceTransaction')
const buildMakeBalanceTransaction = require('./balanceTransaction');

describe('balance transaction', () => {

    it('make balance transaction successfully ', () => {

        const fakeBalanceTransaction = makeFakeBalanceTransaction()
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        const newBalanceTransaction = makeBalanceTransaction(fakeBalanceTransaction)

        expect(fakeBalanceTransaction).toMatchObject({
            id: newBalanceTransaction.getId(),
            description: newBalanceTransaction.getDescription(),
            investment: newBalanceTransaction.getInvestment(),
            revenue: newBalanceTransaction.getRevenue(),
            other: newBalanceTransaction.getOther(),
            wages: newBalanceTransaction.getWages(),
            equipment: newBalanceTransaction.getEquipment(),
            marketing: newBalanceTransaction.getMarketing(),
            date: newBalanceTransaction.getDate(),
            createdOn: newBalanceTransaction.getCreatedOn(),
            modifiedOn: newBalanceTransaction.getModifiedOn(),
        })

    })
  
    it('description must closing or opening balance',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({description:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(() => makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Wrong description it must be "Opening Balance" or "Closing Balance" !')
    })

    it('Investment must be a number',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({investment:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Investment must be a number!')
    })

    it('Revenue must be a number',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({revenue:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Revenue must be a number!')
    })

    it('Other must be a number',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({other:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Other must be a number!')
    })

    it('Wages must be a number',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({wages:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Wages must be a number!')
    })

    it('Marketing must be a number',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({marketing:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Marketing must be a number!')
    })

    it('Equipment must be a number',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({equipment:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Equipment must be a number!')
    })

    it(' must have a date',()=>{
        const fakeBalanceTransaction = makeFakeBalanceTransaction({date:null})
        const makeBalanceTransaction = buildMakeBalanceTransaction()

        expect(()=>makeBalanceTransaction(fakeBalanceTransaction))
            .toThrow('Must have a date value!')
    })

})