const overdraftDebtController = require("../../controllers").overdraftDebt;
const overdraftUtils = require("../../utils/overdraftUtils");
const OverdraftDebt = require("../../models").OverdraftDebt;
const Overdraft = require("../../models").Overdraft;
const User = require("../../models").User;

describe("OverdraftDebts Controller", function () {
    describe("OverdraftDebt create", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns the OverdraftDebt object created", async () => {
            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest.spyOn(User, "findByPk").mockImplementation(id =>
                Promise.resolve({
                    id: 1,
                    createOverdraftDebt: data => {
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
            jest.spyOn(Overdraft, "findOne").mockImplementation(query =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: new Date()
                })
            );
            jest
                .spyOn(overdraftUtils, "usabilityCheck")
                .mockImplementation(id => Promise.resolve(false));

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
        it("returns 400 on fails on find user", async () => {
            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(User, "findByPk")
                .mockImplementation(id => Promise.reject("error"));

            await overdraftDebtController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith("error");
        });
        it("returns 400 on fails on create overdraft", async () => {
            let req = {
                params: {
                    id: 1
                }
            };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest.spyOn(User, "findByPk").mockImplementation(id =>
                Promise.reject("error")
            );

            await overdraftDebtController.create(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith("error");
        });
    });
    describe("OverdraftDebt getByPk", () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });
        it("returns OverdraftDebt object on success", async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
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
                .spyOn(OverdraftDebt, "findByPk")
                .mockImplementation(() => Promise.resolve(overdraftDebt));

            await overdraftDebtController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith(overdraftDebt);
        });
        it("returns 404 if overdraft not found", async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(OverdraftDebt, "findByPk")
                .mockImplementation(() => Promise.resolve(null));

            await overdraftDebtController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({
                message: "OverdraftDebt Not Found"
            });
        });
        it("returns 400 on error", async () => {
            let req = { params: { id: 1 } };
            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));
            const res = {
                status
            };

            jest
                .spyOn(OverdraftDebt, "findByPk")
                .mockImplementation(() => Promise.reject("eeror"));

            await overdraftDebtController.getByPk(req, res);

            expect(status).toHaveBeenCalledWith(400);
            expect(send).toHaveBeenCalledWith("error");
        });
    });
});