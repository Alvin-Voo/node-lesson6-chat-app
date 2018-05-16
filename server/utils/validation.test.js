const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should reject non-string values', ()=>{
    let num = 12345678;

    expect(isRealString(num)).toBe(false);
  })

  it('should reject string with only spaces', ()=>{
    let str = '         ';

    expect(isRealString(str)).toBe(false);
  })

  it('should allow string with non-space characters', ()=>{
    let num = ' L O T.R ';

    expect(isRealString(num)).toBe(true);
  })

})
