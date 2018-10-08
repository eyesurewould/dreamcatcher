//import the Client class
import { Client } from './client';
 
describe('Client', () => {
    it('should create an instance of Client',() => {
        expect(new Client()).toBeTruthy();
    });
})