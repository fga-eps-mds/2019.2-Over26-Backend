const transactionController = require('../../controllers').transaction;
const Transaction = require('../../models').Transaction;
const Account = require('../../models').Account;
const Overdraft = require('../../models').Overdraft;

describe('Transactions Controller', function () {
    describe('Transaction list', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns empty list if there is no transaction', async () => {
            let req = {};
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Transaction, 'findAll')
                .mockImplementation(() => Promise.resolve([]));

            await transactionController.list(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith([]);
        });
        it('returns 400 on error', async () => {
            let req = {};
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Transaction, 'findAll')
                .mockImplementation(() => Promise.reject('error'));

            await transactionController.list(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });

    describe('Make transaction with success', () => {

        let transaction = {
            id: 1,
            name: 'test',
            description: 'test',
            value: 10,
            accountId: 1,
            date: Math.floor(new Date().getTime() / 1000),
            createdAt: Math.floor(new Date().getTime() / 1000),
            updatedAt: Math.floor(new Date().getTime() / 1000)
        }

        beforeEach(() => {
            let account = {
                id: 1,
                agency: 123456,
                number: 123456,
                balance: 90.00,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                userId: 1,
                createTransaction: () => {
                    return Promise.resolve(transaction)
                },
                update: () => {
                    Promise.resolve({
                        id: 1,
                        agency: 123456,
                        number: 123456,
                        balance: 90.00,
                        createdAt: Math.floor(new Date().getTime() / 1000),
                        updatedAt: Math.floor(new Date().getTime() / 1000),
                        userId: 1,
                    })
                }
            };
            jest
                .spyOn(Account, 'findByPk')
                .mockImplementation(() => Promise.resolve(account));

            let overdraft = {
                id: 1,
                isActive: true,
                isBlocked: false,
                limit: 200.00,
                limitMax: 200.00,
                limitUsed: 0.00,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                userId: 1,
                update: () => {
                    Promise.resolve({
                        id: 1,
                        isActive: true,
                        isBlocked: false,
                        limit: 200.00,
                        limitMax: 200.00,
                        limitUsed: 0.00,
                        firstUseDate: null,
                        createdAt: Math.floor(new Date().getTime() / 1000),
                        updatedAt: Math.floor(new Date().getTime() / 1000),
                        userId: 1, 
                    })
                }
            };
            jest
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraft));
        });
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns Transaction object on cash in success', async () => {
            let req = { 
                body: { 
                    type: 'in',
                    description: 'test',
                    value: 10,
                    name: 'test',
                    accountId: 1, 
                } 
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            await transactionController.makeTransaction(req, res);

            expect(status).toHaveBeenCalledWith(201);
            expect(send).toHaveBeenCalledWith(transaction);
        });

        it ('returns Transaction object on cash out sucess', async () => {
            let req = { 
                body: { 
                    type: 'out',
                    description: 'test',
                    value: 10,
                    name: 'test',
                    accountId: 1, 
                } 
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            await transactionController.makeTransaction(req, res);

            expect(status).toHaveBeenCalledWith(201);
            expect(send).toHaveBeenCalledWith(transaction);
        })
    })
    describe('Make Transaction with error', () => {

        beforeEach(() => {
            let account = {
                id: 1,
                agency: 123456,
                number: 123456,
                balance: 90.00,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                userId: 1,
                createTransaction: () => {
                    return Promise.resolve(null);
                }
            };

            jest
                .spyOn(Account, 'findByPk')
                .mockImplementation(() => Promise.resolve(account));

            let overdraft = {
                id: 1,
                isActive: true,
                isBlocked: false,
                limit: 200.00,
                limitMax: 200.00,
                limitUsed: 0.00,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                userId: 1
            };
            jest
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraft));
        });
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns null when cash in with error', async () => {
            let req = { 
                body: { 
                    type: 'in',
                    description: 'test',
                    value: 10,
                    name: 'test',
                    accountId: 1, 
                } 
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            await transactionController.makeTransaction(req, res);

            expect(status).toHaveBeenCalledWith(400);
        })
    })
    describe('Transaction getByPk', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns Transaction object on success', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };
            let transaction = {
                userId: 1,
                status: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1
            };
            jest
                .spyOn(Transaction, 'findByPk')
                .mockImplementation(() => Promise.resolve(transaction));

            await transactionController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(transaction);
        });
        it('returns 404 if transaction not found', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Transaction, 'findByPk')
                .mockImplementation(() => Promise.resolve(null));

            await transactionController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: 'Transaction Not Found'
            });
        });
        it('returns 400 on error', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Transaction, 'findByPk')
                .mockImplementation(() => Promise.reject('error'));

            await transactionController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });
});
