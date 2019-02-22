import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import expect from 'expect';
import { shallow, mount} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './Signup';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient){
    describe('Signup', function(){
        console.log(process.env.NODE_ENV);
        
        it('should error message', function(){
            const error = "This is not working";
            const wrapper = shallow( <Signup createUser={()=>{}}/>) //użycie shallow zamiast mount dało dostęp do state komponentu (shallow wydaje się lepsze)
            console.log(wrapper.state('error'));
            wrapper.setState({error});

            const ptext = wrapper.find('p').text()
              
            expect(ptext).toBe(error);
        });

        it('should call createUser with the form data', function(){
            const email = "email@test.com";
            const password = "password";
            const fakeEvent = { preventDefault: () => console.log('preventDefault') };

            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy} />)
            //bez <BrowserRouter/> nie pozwoli użyć mount 

            //ustawiamy przez odwołanie sie do ref i sutawienie go dzięki HTMLinputelements
          
            wrapper.setState({ email });
            wrapper.setState({ password });
            
            wrapper.find('form').simulate('submit', fakeEvent);

            // console.log(spy.calls);

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
           
        });

        it('it should set error if wrong password', function(){
            const email = "email@test.com";
            const password = "pa";
            const fakeEvent = { preventDefault: () => console.log('preventDefault') };

            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy} />)
            //bez <BrowserRouter/> nie pozwoli użyć mount 

            //ustawiamy przez odwołanie sie do ref i sutawienie go dzięki HTMLinputelements
          
            wrapper.setState({ email });
            wrapper.setState({ password });
            
            wrapper.find('form').simulate('submit', fakeEvent);

            console.log(spy.calls);

            expect(wrapper.state('error')).toBe('Password must have at least 3 chracters');
            // expect(spy.calls[0].arguments[1].)
           
        
        });
      
        it('should set createUser with callback errors', function(){
            const password = "password";
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy} />)
            const fakeEvent = { preventDefault: () => console.log('preventDefault') };

            const reason = 'Fail reason';

            wrapper.find('form').simulate('submit', fakeEvent);
            spy.calls[0].arguments[1]({reason}) //przekazujemy pusty obiekt
   
            expect(wrapper.state('error')).toBe(reason);
   
            spy.calls[0].arguments[1]() //przekazujemy pusty obiekt
   
            // console.log("erroe", wrapper.state.error);
            expect(wrapper.state('error')).toBe('');

        });
    });
}