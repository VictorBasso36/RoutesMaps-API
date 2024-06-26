import request from 'supertest';
import app from '../src/app';

describe('Delivery API', () => {
  let createdDeliveryId: number;

  // Test for creating a new Delivery
  it('should create a new delivery', (done) => {
    const newDelivery = {
      customerName: 'John Doe',
      startPoint: '123 Start St',
      endPoint: '456 End Ave'
    };

    request(app)
      .post('/api/v1/maps')
      .send(newDelivery)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.customerName).toBe(newDelivery.customerName);
        expect(response.body.startPoint).toBe(newDelivery.startPoint);
        expect(response.body.endPoint).toBe(newDelivery.endPoint);
        createdDeliveryId = response.body.id;
        done();
      })
      .catch(err => done(err));
  });

  // Test for fetching the created Delivery
  it('should fetch the created delivery', (done) => {
    request(app)
      .get(`/api/v1/maps/${createdDeliveryId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('id', createdDeliveryId);
        expect(response.body.customerName).toBe('John Doe');
        expect(response.body.startPoint).toBe('123 Start St');
        expect(response.body.endPoint).toBe('456 End Ave');
        done();
      })
      .catch(err => done(err));
  });

  // Test for deleting the created Delivery
  it('should delete the created delivery', (done) => {
    request(app)
      .delete(`/api/v1/maps/${createdDeliveryId}`)
      .set('Accept', 'application/json')
      .expect(204)
      .then(() => done())
      .catch(err => done(err));
  });
});
