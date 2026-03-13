import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe('GET /api', () => {
    it('should return a JSON response with a message', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toBe("Desde API");

        expect(response.status).not.toBe(404);
        expect(response.body.message).not.toBe("desde api");

    });
})

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