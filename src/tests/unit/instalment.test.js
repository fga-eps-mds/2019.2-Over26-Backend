const Instalment = require("../../models").Instalment;
const instalmentController = require("../../controllers").instalment;


describe("Instalment Controller", function () {

    describe("Instalment listByDebt", () => {

        it("returns 'not found' message", async () => {
            let req = {
                params: {
                    overdraftDebtId: 1
                }
            };

            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));

            const res = {
                status
            };

            jest
                .spyOn(Instalment, "findAll")
                .mockImplementation(() => Promise.resolve(
                    []
                ));

            await instalmentController.listByDebt(req, res)

            expect(status).toHaveBeenCalledWith(404);
            expect(send).toHaveBeenCalledWith({ "message": "instalments not found" });


        })
        it("returns instalment array", async () => {
            let req = {
                params: {
                    overdraftDebtId: 1
                }
            };

            let send = jest.fn(data => ({ data }));
            let status = jest.fn(code => ({ send }));

            const res = {
                status
            };
            let date = new Date();

            let instalment = {
                isPaid: false,
                value: 100,
                dueDate: date,


            };

            jest
                .spyOn(Instalment, "findAll")
                .mockImplementation(() => Promise.resolve(
                    [instalment]
                ));

            await instalmentController.listByDebt(req, res)

            expect(status).toHaveBeenCalledWith(200);
            expect(send).toHaveBeenCalledWith([instalment]);


        })

    })


})
