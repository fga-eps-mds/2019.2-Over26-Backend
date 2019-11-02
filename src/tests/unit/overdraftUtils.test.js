const overdraftUtils = require('../../utils/overdraftUtils');
const Overdraft = require('../../models').Overdraft;


describe('OverdraftUtils', function () {

    describe('OverdraftUtils usabilityCheck', () => {

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('returns true for firstUseDate==null', async () => {
            let id = 1;

            jest.spyOn(Overdraft, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 0,
                    firstUseDate: null,
                })
            );
            await overdraftUtils.usabilityCheck(id);

            expect(await overdraftUtils.usabilityCheck(id)).toBe(true);

        });

        it('returns true for firstUseDate!=null and less than 26 days have passed', async () => {
            let id = 1;

            jest.spyOn(Overdraft, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: new Date(),
                })
            );
            await overdraftUtils.usabilityCheck(id);

            expect(await overdraftUtils.usabilityCheck(id)).toBe(true);

        });

        it('returns false for firstUseDate!=null and more than 26 days have passed', async () => {
            let id = 1;
            let date = new Date;
            date.setDate(date.getDate()-26.1);

            jest.spyOn(Overdraft, 'findOne').mockImplementation(() =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: date,
                })
            );
            
            

            await overdraftUtils.usabilityCheck(id);

            expect(await overdraftUtils.usabilityCheck(id)).toBe(false);

        });
        it('returns true for overdraft not found', async () => {
            let id = 1;
            let date = new Date;
            date.setDate(date.getDate()-26.3);

            /* jest.spyOn(Overdraft, "findOne").mockImplementation(query =>
                Promise.resolve({
                    status: true,
                    limit: 200,
                    limitMax: 200,
                    limitUsed: 10,
                    firstUseDate: date,
                })
            );*/
            
            

            await overdraftUtils.usabilityCheck(id);

            expect(await overdraftUtils.usabilityCheck(id)).toBe(true);

        });
    });
});
