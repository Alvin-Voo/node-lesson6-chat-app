const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{

  let users;

  beforeEach(()=>{
    users = new Users();
    users.users =  [
      {
        id: '1',
        name: 'alvin',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'kevin',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'akachi',
        room: 'Node Course'
      }
    ]
  });

  it('should add new user', ()=>{
    let users = new Users();
    let user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office'
    };
    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
    expect(resUser).toEqual(user);

  });

  it('should remove a user', () =>{
    let userRemoved = users.removeUser('1');

    expect(userRemoved).toEqual(
          {
            id: '1',
            name: 'alvin',
            room: 'Node Course'
          }
        );
    expect(users.users).toHaveLength(2);
  })

  it('should not remove a user', () =>{
    let userRemoved = users.removeUser('123');

    expect(userRemoved).toBeFalsy();
    expect(users.users).toHaveLength(3);
  })

  it('should get the user', () =>{
    let user = users.getUser('1');

    expect(user.id).toBe('1');
    expect(user).toEqual(users.users[0]);
  })

  it('should not get the user', () =>{
    let user = users.getUser('123');

    expect(user).toBeFalsy();
  })

  it('should return names for node course', ()=>{
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['alvin','akachi']);
  });

  it('should return names for react course', ()=>{
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['kevin']);
  });



})
