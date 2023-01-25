import app from '../src/app';
import Chicken from '../src/models/Chicken';
import request from 'supertest';

describe('Create a chicken', () => {
    beforeEach(async () => {
        await Chicken.deleteMany({});
    });

    it('should create a new chicken', async () => {
        const res = await request(app)
            .post('/chicken')
            .send({ name: 'Hen', weight: 3 });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'hen');
        expect(res.body).toHaveProperty('weight', 3);
    });

    it('should return a 400 error if required fields are missing', async () => {
        const res = await request(app)
            .post('/chicken')
            .send({ weight: 3 });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });

/*    it('should return a 500 error if there is a problem saving to the database', async () => {
        const mockFunction = jest.fn();
        Chicken.prototype.save = mockFunction.mockRejectedValueOnce(new Error('Error saving chicken'));
        const res = await request(app)
            .post('/chicken')
            .send({ name: 'Hen', weight: 3 });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('message', 'Error saving chicken');
    });*/
});