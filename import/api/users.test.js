import expect from 'expect';
import { validateNewUser } from './users';
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    describe('users', function() {
    it('should allow valid email address', function(){
        const testUser = {
            emails: [
                {  
                    address: 'test@example.com' 
                }
            ]
        };
        const res = validateNewUser(testUser);
        expect(res).toBe(true);
    });

    it('should reject invalid valid email address', function(){

        const testUser = {
            emails: [
                {  
                    address: 'test' 
                }
            ]
        };

        expect(() => {
            validateNewUser(testUser);
        }).toThrow()
    });

});

}



// const square = (a) => a*a;

// describe("square", function(){
//     it("should square a number", function(){

//         const res = square(4);

//         expect(res).toBe(16);

//     });

// });

