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
})
