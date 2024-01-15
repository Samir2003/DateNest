const request = require('supertest');
const app = require('../src/server.js');

describe('POST /:id/date', () => {
  it('should add a date for a user', async () => {
    const res = await request(app)
      .post('/123/date')
      .send({
        date: '2022-03-01'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('date');
  });
});

describe('DELETE /:id/date', () => {
  it('should delete a date for a user', async () => {
    const res = await request(app)
      .delete('/123/date')
      .send({
        _id: 'abc123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });
});

describe('PATCH /date/update', () => {
  it('should update a date for a user', async () => {
    const res = await request(app)
      .patch('/date/update')
      .send({
        _id: 'abc123',
        updates: [{date: '2022-03-02'}]
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('date');
  });
});