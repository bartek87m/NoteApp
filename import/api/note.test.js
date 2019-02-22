import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import{ Notes } from './notes';

if(Meteor.isServer){
    describe('notes', function() {

        const noteOne = {
            _id: "testNoteId1",
            title: 'My Title',
            body: 'My body for note',
            updateAAt: 0,
            userId: 'testUserId'
        }

        const noteTwo = {
            _id: "testNoteId2",
            title: 'Tgings to buy',
            body: 'Couch',
            updateAAt: 0,
            userId: 'testUserId2'
        }

        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        it('should insert new note', function() {
            const userId = 'testId';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId}) //daje dostęp do metod serwera. dzięki apply możemy uruchomić metodę z naszym własnym contextem
           
            expect( Notes.findOne({_id, userId})).toBeTruthy();
        });

        it('should not insert note if not authoricated', function(){
            expect(() => {
                const _id = Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });
        
        it('should remove note', function(){
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);    
            expect(Notes.findOne({_id: noteOne._id })).toNotExist();
        });

        it('should not remove note if unauthentificated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);    
            }).toThrow();
        });

        it('should not remove note if invalid _id', function(){
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId  }, []);     
            }).toThrow();
        });

        it('shoult update note', function(){
            const title = "this is updated title"

            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId,               
            },[
                noteOne._id,
                { title }
            ]);

            const note = Notes.findOne(noteOne._id);

            expect(note.updateAt).toBeGreaterThan(0);
            expect(note).toInclude({
                title,
                body: noteOne.body
            })
        });

        it('should throw error if extra updates', function(){
            const title = "this is updated title"
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId,               
                },[
                    noteOne._id,
                    { title, name:"ad"},
                
                ]);
            }).toThrow();
        });

        it('should not update note if user was not creator', function(){
            const title = "this is updated title"

            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testId',               
            },[
                noteOne._id,
                { title }
            ]);

            const note = Notes.findOne(noteOne._id);

            expect(note).toInclude(noteOne);
        });

        it('should not remove note if unauthentificated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);    
            }).toThrow();
        });

        it('should not remove note if invalid _id', function(){
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId  }, []);     
            }).toThrow();
        });

        it('should return a users notes', function(){
            const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should not return a users notes when user is none', function(){
            const res = Meteor.server.publish_handlers.notes.apply({userId: 'userId3'});
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });


    });
}