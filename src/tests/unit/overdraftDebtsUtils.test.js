const overdraftDebtUtils = require('../../utils/overdraftDebtUtils');
const OverdraftDebt = require('../../models').OverdraftDebt;
const overdraftController = require('../../controllers').overdraft;
const Overdraft = require('../../models').Overdraft;
const User = require('../../models').User;
const userController = require('../../controllers').user;
const overdraftUtils = require('../../utils/overdraftUtils');
const overdraftDebtController = require('../../controllers').overdraftDebt;


describe('OverdraftDebtsUtils', function () {
    describe('OverdraftDebtUtils returnInstalmentValue', () => {

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('returns instalment value when is possible', async () => {
            let id = 1;
            let entryDate = new Date();
            entryDate.setDate(entryDate.getDate() - 27);


            jest.spyOn(OverdraftDebt, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    amount: 200,
                    entryDate: entryDate,
                    rate: 0.003182,
                })
            );

            expect(await overdraftDebtUtils.returnInstalmentValue(id)).toBe(217.91279648710335);

        });

        it('returns false when the overdraftDebt is not found', async () => {
            let id = 1;

            expect(await overdraftDebtUtils.returnInstalmentValue(2, id)).toBe(false);

        });



    });

    describe('OverdraftDebtUtils returnInstalmentValue', () => {

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('returns string of dates', async () => {
            let id = 1;
            let dueDay = 5;
            let quantityInstalment = 2;
            let currentDate = new Date;
            let dateOne = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1), dueDay, 23, 59, 59, 999);
            let dateTwo = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 2), dueDay, 23, 59, 59, 999);
            let instalmentDates = [dateOne, dateTwo];

            jest.spyOn(OverdraftDebt, 'findOne').mockImplementation(() =>
                Promise.resolve({
                })
            );

            expect(await overdraftDebtUtils.returnInstalmentDates(dueDay, quantityInstalment, id)).toStrictEqual(instalmentDates);


        });
        it('returns o for user not found', async () => {
            let id = 1;
            let dueDay = 5;
            let quantityInstalment = 2;



            expect(await overdraftDebtUtils.returnInstalmentDates(dueDay, quantityInstalment, id)).toBe(0);


        });
    });

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

            await overdraftDebtUtils.create(req, res);
        });
    });

});
