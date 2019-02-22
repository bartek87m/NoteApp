import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import expect from 'expect';
import { shallow, mount} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient){
    describe('Login', function(){
        console.log(process.env.NODE_ENV);
        
        it('should error message', function(){
            const error = "This is not working";
            const wrapper = shallow( <Login loginWithPassword={()=>{}}/>) //użycie shallow zamiast mount dało dostęp do state komponentu (shallow wydaje się lepsze)
            console.log(wrapper.state('error'));
            wrapper.setState({error});

            const ptext = wrapper.find('p').text()
              
            expect(ptext).toBe(error);
        });

        it('should call loginWithPassword with the form data', function(){
            const email = "email@test.com";
            const password = "password";
            const fakeEvent = { preventDefault: () => console.log('preventDefault') };

            const spy = expect.createSpy();
            const wrapper = shallow(<Login loginWithPassword={spy} />)
            //bez <BrowserRouter/> nie pozwoli użyć mount 

            //ustawiamy przez odwołanie sie do ref i sutawienie go dzięki HTMLinputelements
          
            wrapper.setState({ email });
            wrapper.setState({ password });
            
            wrapper.find('form').simulate('submit', fakeEvent);

            // console.log(spy.calls);

            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password)
        
        });

        it('should set loginWithPassword with callback errors', function(){
            const spy = expect.createSpy();
            const wrapper = shallow(<Login loginWithPassword={spy} />)
            const fakeEvent = { preventDefault: () => console.log('preventDefault') };


            wrapper.find('form').simulate('submit', fakeEvent);
            spy.calls[0].arguments[2]({}) //przekazujemy pusty obiekt
            console.log(spy.calls);
            console.log(wrapper.state())
            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });
    });
}