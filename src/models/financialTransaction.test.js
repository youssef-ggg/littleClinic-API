const makeFakeTransaction = require('../__test__/fixtures/financialTransaction');
const buildMakeFinancialTransaction = require('./financialTransaction');
const {typeEnum} = require('../utils/enums')

describe('financialTransaction model', () => {

    it('make model successfully', () => {

        const fakeFinanicalTransaction = makeFakeTransaction();
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});
        const financialTransaction = makeFinancialTransaction(fakeFinanicalTransaction);

        expect(fakeFinanicalTransaction).toMatchObject({
            id: financialTransaction.getId(),
            description: financialTransaction.getDescription(),
            date: financialTransaction.getDate(),
            amount: financialTransaction.getAmount(),
            cashFlow: financialTransaction.getCashFlow(),
            type: financialTransaction.getType(),
            referenceNum: financialTransaction.getReferenceNum(),
            createdOn: financialTransaction.getCreatedOn(),
            modifiedOn: financialTransaction.getModifiedOn(),
        });
    });

    it('must have a description', () => {
        const fakeFinanicalTransaction = makeFakeTransaction({ description: null });
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});
        // const financialTransaction = makeFinancialTransaction(fakeFinanicalTransaction);

        expect(() => makeFinancialTransaction(fakeFinanicalTransaction))
            .toThrow('Transaction must have a description');

    });

    it('must have date', () => {
        const fakeFinanicalTransaction = makeFakeTransaction({ date: null });
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});

        expect(() => makeFinancialTransaction(fakeFinanicalTransaction))
            .toThrow('Transaction must have a date');
    });

    it('must have an amount', () => {
        const fakeFinanicalTransaction = makeFakeTransaction({ amount: null });
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});

        expect(() => makeFinancialTransaction(fakeFinanicalTransaction))
            .toThrow('Transaction must have an amount');
    });

    it('must have a cash flow value', () => {
        const fakeFinanicalTransaction = makeFakeTransaction({ cashFlow: null });
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});

        expect(() => makeFinancialTransaction(fakeFinanicalTransaction))
            .toThrow('Transaction cash flow must have a value');
    });

    it('must have type', () => {
        const fakeFinanicalTransaction = makeFakeTransaction({ type: null });
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});
        expect(() => makeFinancialTransaction(fakeFinanicalTransaction))
            .toThrow('Transaction must have a type');
    });

    it(' type must be in typeEnum', () => {
        const fakeFinanicalTransaction = makeFakeTransaction({ type: 'words' });
        const makeFinancialTransaction = buildMakeFinancialTransaction({typeEnum});
        expect(() => makeFinancialTransaction(fakeFinanicalTransaction))
            .toThrow('Transaction type has invalid value');
    });

});