import { connectDB } from "../server";
import db from "../config/db";

jest.mock('../config/db', () => {
    const dbMock = {
        authenticate: jest.fn(),
        sync: jest.fn(),
    };
    return { __esModule: true, default: dbMock };
});

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Error connecting to the database'))
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error connecting to the database'),
            expect.any(Error)
        )
        expect(db.authenticate).toHaveBeenCalled();
    })

})