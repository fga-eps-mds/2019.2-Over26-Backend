const overdraftDebtUtils = require("../../utils/overdraftDebtUtils");
const OverdraftDebt = require("../../models").OverdraftDebt;


describe("OverdraftDebtsUtils", function () {
    describe("OverdraftDebtUtils returnInstalmentValue", () => {

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it("returns instalment value when is possible", async () => {
            let id = 1;
            let entryDate = new Date();
            entryDate.setDate(entryDate.getDate() - 27);


            jest.spyOn(OverdraftDebt, "findOne").mockImplementation(query =>
                Promise.resolve({
                    amount: 200,
                    entryDate: entryDate,
                    rate: 0.003182,
                })
            )

            expect(await overdraftDebtUtils.returnInstalmentValue(2, id)).toBe(108.95639824355167)

        })

        it("returns false when the overdraftDebt is not found", async () => {
            let id = 1;

            expect(await overdraftDebtUtils.returnInstalmentValue(2, id)).toBe(false)

        })



    })

    describe("OverdraftDebtUtils returnInstalmentValue", () => {

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it("returns string of dates", async () => {
            let id = 1;
            let dueDay = 5;
            let quantityInstalment = 2;
            let currentDate = new Date;
            let dateOne = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1), dueDay, 23, 59, 59, 999)
            let dateTwo = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 2), dueDay, 23, 59, 59, 999)
            let instalmentDates = [dateOne, dateTwo];

            jest.spyOn(OverdraftDebt, "findOne").mockImplementation(query =>
                Promise.resolve({
                })
            )

            expect(await overdraftDebtUtils.returnInstalmentDates(dueDay, quantityInstalment, id)).toStrictEqual(instalmentDates)


        })
        it("returns o for user not found", async () => {
            let id = 1;
            let dueDay = 5;
            let quantityInstalment = 2;



            expect(await overdraftDebtUtils.returnInstalmentDates(dueDay, quantityInstalment, id)).toBe(0);


        })
    })

})
