let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=>{
    let from = 'baymax';
    let text = 'hello, i am baymax';

    let ret = generateMessage(from,text);

    // expect(ret.from).toBe(from);
    // expect(ret.text).toBe(text);
    expect(ret).toMatchObject({from, text});
    expect(typeof ret.createdAt).toBe('number');
  })
})

describe('generateLocationMessage',()=>{
  it('should generate correct location object', ()=>{
    let from = 'Admin';
    let lat = 10;
    let long = 20;
    const url = "https://www.google.com/maps?q="+lat+","+long;

    let ret = generateLocationMessage(from,lat,long);

    expect(ret).toMatchObject({from,url});
    expect(typeof ret.createdAt).toBe('number');
  })
})
