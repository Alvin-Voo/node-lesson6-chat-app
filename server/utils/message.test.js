let expect = require('expect');
let {generateMessage} = require('./message')

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
