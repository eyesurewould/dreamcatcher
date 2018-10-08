//import the Project class
import { Project } from './project';
 
describe('Project', () => {
    it('should create an instance of Project',() => {
        expect(new Project()).toBeTruthy();
    });
})