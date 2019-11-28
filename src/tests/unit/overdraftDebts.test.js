const overdraftDebtController = require('../../controllers').overdraftDebt;
const overdraftUtils = require('../../utils/overdraftUtils');
const OverdraftDebtUtils = require('../../utils/overdraftDebtUtils');
const OverdraftDebt = require('../../models').OverdraftDebt;
const Overdraft = require('../../models').Overdraft;
const User = require('../../models').User;
const Instalment = require('../../models').Instalment;
const InstalmentUtils = require('../../utils/instalmentUtils');



describe('OverdraftDebts Controller', function () {
    describe('OverdraftDebt create', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns the OverdraftDebt object created', async () => {
            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest.spyOn(User, 'findByPk').mockImplementation(() =>
                Promise.resolve({
                    id: 1,
                    createOverdraftDebt: () => {
                        let entry = new Date();
                        return Promise.resolve({
                            userId: 1,
                            entryDate: Math.floor(entry.setDate(entry.getDate() + 26) / 1000),
                            amount: 10,
                            rate: 0.15,
                            isDivided: false
                        });
                    }
                })
            );
            jest.spyOn(Overdraft, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    id: 1,
                    isActive: true,
                    isBlocked: false,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: new Date(),
                    update: () => {
                        return Promise.resolve({

                        });
                    }

                })
            );
            jest
                .spyOn(overdraftUtils, 'usabilityCheck')
                .mockImplementation(() => Promise.resolve(false));

            await overdraftDebtController.create(req, res);
            let entry = new Date();
            let overdraft = {
                userId: 1,
                entryDate: Math.floor(entry.setDate(entry.getDate() + 26) / 1000),
                amount: 10,
                rate: 0.15,
                isDivided: false,
            };
            expect(send).toHaveBeenCalledWith(overdraft);
            expect(status).toHaveBeenCalledWith(201);
        });
        it('Returns overdraft still haven\'t reached it\'s deadline or wasn\'t used', async () => {

            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest.spyOn(User, 'findByPk').mockImplementation(() =>
                Promise.resolve({
                    id: 1,
                    createOverdraftDebt: () => {
                        let entry = new Date();
                        return Promise.resolve({
                            userId: 1,
                            entryDate: Math.floor(entry.setDate(entry.getDate()) / 1000),
                            amount: 10,
                            rate: 0.15,
                            isDivided: false
                        });
                    }
                })
            );
            jest.spyOn(Overdraft, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: new Date()
                })
            );
            jest
                .spyOn(overdraftUtils, 'usabilityCheck')
                .mockImplementation(() => Promise.resolve(true));

            await overdraftDebtController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith({ 'message': 'overdraft still haven\'t reached it\'s deadline or wasn\'t used' });


        });
        it('returns 400 on fails on find user', async () => {
            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(User, 'findByPk')
                .mockImplementation(() => Promise.reject('error'));

            await overdraftDebtController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
        it('returns 400 on fails on create overdraft', async () => {
            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest.spyOn(User, 'findByPk').mockImplementation(() =>
                Promise.reject('error')
            );

            await overdraftDebtController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });
    describe('OverdraftDebt getByPk', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns OverdraftDebt object on success', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };
            let overdraftDebt = {
                userId: 1,
                entryDate: Math.floor(new Date().getTime() / 1000),
                amount: 0,
                rate: 0.1,
                isDivided: false,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1
            };
            jest
                .spyOn(overdraftDebtController, 'getByPk')
                .mockImplementation(() => Promise.resolve(overdraftDebt));

            await overdraftDebtController.getByPk(req, res);

        });
        it('returns 404 if overdraft not found', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(OverdraftDebt, 'findByPk')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftDebtController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: 'OverdraftDebt Not Found'
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
                .spyOn(OverdraftDebt, 'findByPk')
                .mockImplementation(() => Promise.reject('eeror'));

            await overdraftDebtController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({'message': 'OverdraftDebt Not Found'});
        });
    });

    describe('overdraftDebt debtsList', () => {

        it('returns \'not found\' message', async () => {
            let req = {
                params: {
                    userId: 1
                }
            };

            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));

            const res = {
                status
            };

            jest
                .spyOn(OverdraftDebt, 'findAll')
                .mockImplementation(() => Promise.resolve(
                    []
                ));

            await overdraftDebtController.debtsList(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({ 'message': 'Debts not found' });


        });
        it('returns debt array', async () => {
            let req = {
                params: {
                    userId: 1
                }
            };

            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));

            const res = {
                status
            };
            let date = new Date();

            let overdraftDebt = {
                entryDate: date,
                amount: 100,
                rate: 5,
                isDivided: true,
                dueDay: 5,
                quantityInstalment: 10,

            };

            jest
                .spyOn(OverdraftDebt, 'findAll')
                .mockImplementation(() => Promise.resolve(
                    [overdraftDebt]
                ));

            await overdraftDebtController.debtsList(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith([overdraftDebt]);


        });

    });

    describe('OverdraftDebt checkAmount', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns OverdraftDebt not found', async () => {

            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));

            let req = {
                params: {
                    userId: 1
                }
            };
            const res = {
                status
            };
            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(
                ));
            await overdraftDebtController.checkAmount(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: 'OverdraftDebt Not Found'
            });
        });
        it('returns totalAmount for non divided overdraftDebt', async () => {
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));

            let req = {
                params: {
                    userId: 1
                }
            };
            const res = {
                status
            };
            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(
                    {
                        id: 1,
                        isDivided: false,
                        userId: 1,
                    }
                ));
            jest
                .spyOn(OverdraftDebtUtils, 'returnInstalmentValue')
                .mockImplementation(() => Promise.resolve(
                    100
                ));



            await overdraftDebtController.checkAmount(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith({
                'totalAmount': 100
            });

        });
        it('returns totalAmount for non divided overdraftDebt', async () => {
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));

            let req = {
                params: {
                    userId: 1
                }
            };
            const res = {
                status
            };
            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(
                    {
                        id: 1,
                        isDivided: true,
                        userId: 1,
                        quantityInstalment:2
                    }
                ));

            jest
                .spyOn(Instalment, 'findOne')
                .mockImplementation(() => Promise.resolve(
                    {
                        value:50
                    }
                ));

            await overdraftDebtController.checkAmount(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith({
                'totalAmount': 100
            });

        });
    });

    describe('overdraftDebt getInstalmentsOptions', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('returns instalments options on success', async () => {
            let req = {
                params: {
                    id: 1
                },
                body: {
                    quantityInstalment: 2,
                    day: 5
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            let overdraftDebt = {
                entryDate: new Date(),
                amount: 100,
                rate: 5,
                isDivided: false,
                dueDay: null,
                quantityInstalment: null,
            };

            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraftDebt));

            const result = {
                valueOfIndividualInstalment: 100.0,
                dateOptionsForInstalments: []
            };

            jest
                .spyOn(OverdraftDebtUtils, 'returnInstalmentValue')
                .mockImplementation(() => Promise.resolve(result.valueOfIndividualInstalment));

            jest
                .spyOn(OverdraftDebtUtils, 'returnInstalmentDates')
                .mockImplementation(() => Promise.resolve(result.dateOptionsForInstalments));

            await overdraftDebtController.getInstalmentsOptions(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(result);

        });

        it('returns error when trying to find overdraft debt', async () => {
            let req = {
                params: {
                    id: 1
                },
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftDebtController.getInstalmentsOptions(req, res);

            expect(status).toHaveBeenCalledWith(404);

        });
    });

    describe('overdraftDebt createInstalments', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('returns create instalments on success', async () => {
            let req = {
                params: {
                    id: 1
                },
                body: {
                    quantityInstalment: 1,
                    day: 5
                }
            };
            let date = new Date()
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            let overdraftDebt = {
                id: 1,
                entryDate: date,
                amount: 100,
                rate: 5,
                isDivided: false,
                dueDay: null,
                quantityInstalment: null,
                update: function() {
                    return Promise.resolve(this);
                }
            };

            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraftDebt));

            const result = {
                valueOfIndividualInstalment: 100.0,
                dateOptionsForInstalments: [date]
            };

            jest
                .spyOn(OverdraftDebtUtils, 'returnInstalmentValue')
                .mockImplementation(() => Promise.resolve(result.valueOfIndividualInstalment));

            jest
                .spyOn(OverdraftDebtUtils, 'returnInstalmentDates')
                .mockImplementation(() => Promise.resolve(result.dateOptionsForInstalments));

            let instalment = {
                isPaid: false,
                value: 100.0,
                dueDate: date
            };

            jest
                .spyOn(InstalmentUtils, 'creatInstalment')
                .mockImplementation(() => Promise.resolve(instalment));

            let overdraft = {
                update: function() {
                    return Promise.resolve(this);
                }
            };

            jest
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraft));

            await overdraftDebtController.createInstalments(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith([instalment]);

        });

        it('returns error when trying to find overdraft debt', async () => {
            let req = {
                params: {
                    id: 1
                },
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(OverdraftDebt, 'findOne')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftDebtController.createInstalments(req, res);

            expect(status).toHaveBeenCalledWith(404);

        });
    });
});