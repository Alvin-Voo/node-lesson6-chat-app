//this can be treat as emulation for db model

class Users {
  constructor(){
    this.users = [];
  }

  addUser (id, name, room){
    let user = {id, name, room}
    this.users.push(user);
    return user;
  }

  removeUser(id){
    let ind_userTobeDel = this.users.findIndex((user)=>user.id===id);

    if (ind_userTobeDel == -1) return null;

    return this.users.splice(ind_userTobeDel,1)[0];
  }

  getUser(id){

    return this.users.filter((user) => user.id === id)[0];

  }

  getUserList(room){
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }

}

module.exports = {Users};
