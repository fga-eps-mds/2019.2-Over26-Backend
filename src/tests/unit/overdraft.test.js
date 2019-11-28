const overdraftController = require('../../controllers').overdraft;
const Overdraft = require('../../models').Overdraft;
const User = require('../../models').User;
const userController = require('../../controllers').user;
const overdraftDebtUtils = require('../../utils/overdraftDebtUtils');
const overdraftUtils = require('../../utils/overdraftUtils');
const overdraftDebtController = require('../../controllers').overdraftDebt;

describe('Overdrafts Controller', function () {
    describe('Overdraft list', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns empty list if there is no overdraft', async () => {
            let req = {};
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Overdraft, 'findAll')
                .mockImplementation(() => Promise.resolve([]));

            await overdraftController.list(req, res);

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
                .spyOn(Overdraft, 'findAll')
                .mockImplementation(() => Promise.reject('error'));

            await overdraftController.list(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });
    describe('Overdraft create', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns user not found', async () => {
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

            await overdraftController.create(req, res);

            

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({ 'message': 'User not found' });

        });

        it('returns the Overdraft object created', async () => {
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
                    createOverdraft: data => {
                        data['id'] = 1;
                        data['updatedAt'] = Math.floor(new Date().getTime() / 1000);
                        data['createdAt'] = Math.floor(new Date().getTime() / 1000);
                        return Promise.resolve(data);
                    }
                })
            );

            await overdraftController.create(req, res);
            let overdraft = {
                userId: 1,
                isActive: false,
                isBlocked: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1
            };
            expect(status).toHaveBeenCalledWith(201);
            expect(send).toHaveBeenCalledWith(overdraft);
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

            await overdraftController.create(req, res);

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
                Promise.resolve({
                    id: 1,
                    createOverdraft: () => Promise.reject('error')
                })
            );

            await overdraftController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });
    describe('Overdraft getByPk', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns Overdraft object on success', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };
            let overdraft = {
                userId: 1,
                isBlocked: false,
                isActive: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1
            };
            jest
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.resolve(overdraft));

            await overdraftController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(overdraft);
        });
        it('returns 404 if overdraft not found', async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(() => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: 'Overdraft Not Found'
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
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.reject('eeror'));

            await overdraftController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });
    describe('Overdraft delete', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns 204 on sucess', async () => {
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

            jest.spyOn(Overdraft, 'findByPk').mockImplementation(() =>
                Promise.resolve({
                    destroy: () => Promise.resolve()
                })
            );

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(204);
            expect(send).toHaveBeenCalledWith();
        });
        it('returns 404 when overdraft not found', async () => {
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
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: 'Overdraft Not Found'
            });
        });
        it('returns 400 when error on find overdraft', async () => {
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
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.reject('error'));

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
        it('returns 400 when error on destoy overdraft', async () => {
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

            jest.spyOn(Overdraft, 'findByPk').mockImplementation(() =>
                Promise.resolve({
                    destroy: () => Promise.reject('error')
                })
            );

            await overdraftController.delete(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith('error');
        });
    });

    describe('First use date update', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it('returns first use day update on sucess', async () => {
            let req = {
                body: {
                    id: '1'
                },
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
                    createDebt: data => {
                        data['id'] = 1;
                        data['firstUseDate'] = Math.floor((new Date().getTime() / 1000) -27);
                        data['updatedAt'] = Math.floor(new Date().getTime() / 1000);
                        data['createdAt'] = Math.floor(new Date().getTime() / 1000);
                        return Promise.resolve(data);
                    }
                })
            );
            jest.spyOn(Overdraft, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 100,
                    firstUseDate: null
                })
            );
    
            expect(await overdraftDebtUtils.create(1)).toBe(null);
    
            
    
    
            () =>
                Promise.resolve({
                    userId: 1,
                    isBlocked: false,
                    isActive: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 100,
                    firstUseDate: Math.floor((new Date().getTime() / 1000) -27),
                    createdAt: Math.floor(new Date().getTime() / 1000),
                    updatedAt: Math.floor(new Date().getTime() / 1000),
                    id: 1
                });
            await overdraftController.createDebt(req, res);
    
            expect(status).toHaveBeenCalledWith(400);
            // expect(send).toHaveBeenCalledWith(User);
        });
    
        it('returns false when the overdraftDebt is not found', async () => {
            let id = 1;
    
            expect(await overdraftDebtUtils.create(id)).toBe(null);
    
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
    
            jest
                .spyOn(overdraftDebtUtils, 'create')
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
    
        it('returns error 404 when user not found', async () => {
            let req = {
                body: {
                    id: '1',
                },
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
                .mockImplementation(() => Promise.resolve(null));
    
            await overdraftController.createDebt(req, res);
    
            expect(status).toHaveBeenCalledWith(404);
    
            expect(send).toHaveBeenCalledWith({
                message: 'Overdraft Not Found'
            });
        });
        it('returns error 400 when error on find user by pk', async () => {
            let req = {
                body: {
                    cpf: '123456789',
                    name: 'Ana',
                    email: 'ana@email.com',
                    phone: '6112341234',
                    monthlyIncome: '1000'
                },
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
    
            await userController.update(req, res);
    
            expect(status).toHaveBeenCalledWith(400);
    
            expect(send).toHaveBeenCalledWith('error');
        });
        it('returns error 400 when error on update first use date', async () => {
     
    
            jest.spyOn(User, 'findByPk').mockImplementation(() =>
                Promise.resolve({
                    update: () => Promise.reject('error')
                })
            );
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
    
            jest
                .spyOn(overdraftDebtUtils, 'create')
                .mockImplementation(() => Promise.resolve(true));
    
            await overdraftController.createDebt(req, res);
    
            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({'message': 'Overdraft Not Found'});
    
    
        }); 
    
    });

    describe('Activate Credit', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        
        it('returns overdraft activated on success', async () => {
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

            let overdraft = {
                userId: 1,
                isBlocked: false,
                isActive: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1,
                update: function() {
                    this.isActive = true;
                    return Promise.resolve(this);
                }
            };

            let user = {
                id: 1,
                cpf: '999.999.999-99',
                name: 'teste',
                email: 'teste@teste.com',
                phone: '999999999',
                monthlyIncome: 900.0,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                getOverdraft: () => {
                    return Promise.resolve(overdraft);
                }
            };

            jest
                .spyOn(User, 'findByPk')
                .mockImplementation(() => Promise.resolve(user));

            await overdraftController.activateCredit(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(overdraft);
        });
        
        it('returns error when trying to find user by pk', async () => {
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
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.activateCredit(req, res);

            expect(status).toHaveBeenCalledWith(404);
        });

        it('returns error when trying to find overdraft', async () => {
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

            let user = {
                id: 1,
                cpf: '999.999.999-99',
                name: 'teste',
                email: 'teste@teste.com',
                phone: '999999999',
                monthlyIncome: 900.0,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                getOverdraft: () => {
                    return Promise.resolve(null);
                }
            };

            jest
                .spyOn(User, 'findByPk')
                .mockImplementation(() => Promise.resolve(user));

            await overdraftController.activateCredit(req, res);

            expect(status).toHaveBeenCalledWith(404);
        });
    });

    describe('Check Usability', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        
        it('returns true on checking overdraft', async () => {
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

            let overdraft = {
                userId: 1,
                isBlocked: false,
                isActive: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1,
            };

            jest
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraft));

            await overdraftController.checkUsability(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(true);
        });
        
        it('returns error when trying to find overdraft', async () => {
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
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.checkUsability(req, res);

            expect(status).toHaveBeenCalledWith(404);
        });
    });

    describe('Cancel Credit', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        
        it('returns cancel credit on success', async () => {
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

            let overdraft = {
                userId: 1,
                isBlocked: false,
                isActive: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1,
                update: function() {
                    this.isActive = false;
                    return Promise.resolve(this);
                }
            };

            jest
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.resolve(overdraft));

            await overdraftController.cancelCredit(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(overdraft);
        });
        
        it('returns error when trying to find overdraft', async () => {
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
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.cancelCredit(req, res);

            expect(status).toHaveBeenCalledWith(404);
        });

        it('returns error when trying to update overdraft', async () => {
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

            let overdraft = {};

            jest
                .spyOn(Overdraft, 'findByPk')
                .mockImplementation(() => Promise.resolve(overdraft));

            await overdraftController.cancelCredit(req, res);

            expect(status).toHaveBeenCalledWith(400);
        });
    });

    describe('Create Debt', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        
        it('returns create debt on success', async () => {
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

            let overdraft = {
                userId: 1,
                isBlocked: false,
                isActive: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1,
                update: function() {
                    this.firstUseDate = Math.floor(new Date().getTime() - (27 * 24 * 60 * 60 * 1000));
                    return Promise.resolve(this);
                }
            };

            jest
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraft));

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
                .spyOn(overdraftDebtUtils, 'create')
                .mockImplementation(() => Promise.resolve(overdraftDebt));

            await overdraftController.createDebt(req, res);

            expect(status).toHaveBeenCalledWith(201);
            expect(send).toHaveBeenCalledWith(overdraftDebt);
        });
        
        it('returns error when trying to find overdraft', async () => {
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
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.createDebt(req, res);

            expect(status).toHaveBeenCalledWith(404);
        });

        it('returns error when trying to create debt', async () => {
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

            let overdraft = {
                userId: 1,
                isBlocked: false,
                isActive: false,
                limit: 200,
                limitMax: 200,
                limitUsed: 0,
                firstUseDate: null,
                createdAt: Math.floor(new Date().getTime() / 1000),
                updatedAt: Math.floor(new Date().getTime() / 1000),
                id: 1,
                update: function() {
                    this.firstUseDate = Math.floor(new Date().getTime() - (27 * 24 * 60 * 60 * 1000));
                    return Promise.resolve(this);
                }
            };

            jest
                .spyOn(Overdraft, 'findOne')
                .mockImplementation(() => Promise.resolve(overdraft));

            jest
                .spyOn(overdraftDebtUtils, 'create')
                .mockImplementation(() => Promise.resolve(null));

            await overdraftController.createDebt(req, res);

            expect(status).toHaveBeenCalledWith(400);
        });
    });
});

