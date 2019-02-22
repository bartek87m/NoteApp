import React from 'react';
import expect from 'expect';
import { shallow, mount} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NoteListItem } from './NoteListItem';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { notes } from '../../import/fixtures/fixtures';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient){
    describe('NoteListItem', function(){

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            }
        });
        
        it('should render title and timestam', function(){
            
            console.log('moment',moment.valueOf());
            const wrapper = shallow(<NoteListItem note={notes[0]} Session={Session}/>)
        
            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect(wrapper.find('p').text()).toBe('2/21/19');
        })

        it('shoutl return untitled note', function(){
            const title = 'untitled note';
            const wrapper = shallow(<NoteListItem note={notes[1]} Session={Session}/>)
        
            expect(wrapper.find('h5').text()).toBe(title);
            
        });

        it('should call set on click', function(){
            const wrapper = shallow(<NoteListItem note={notes[1]} Session={Session}/>)

            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[1]._id);
        })
    });
};