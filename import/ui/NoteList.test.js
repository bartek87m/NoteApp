import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NoteList } from './NoteList';
import { NoteListEmptyItem } from './NoteListEmptyItem'

Enzyme.configure({ adapter: new Adapter() });

import { notes } from '../../import/fixtures/fixtures'


if(Meteor.isClient){
    describe("NoteList", function(){
        it('should render NoteListItem for each note', function(){
            const wrapper = mount(<NoteList notes={notes}/>)

            const data = wrapper.find('NoteListItem').length;
            console.log("length: ", typeof(data));

            expect(data).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);

        });

        it('should render NoteListItem if zero notes', function(){
            const wrapper = mount(<NoteList notes={[]}/>)
            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);

        });
    });
}