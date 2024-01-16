const {calculateTip} = require('../src/math.js')
global.TextEncoder = require('text-encoding').TextEncoder;
const mongoose = require('mongoose');
test('Should calculate with total tip',()=>{
    const total = calculateTip(10, .3)

    if(total !== 13){
        throw new Error('Total tip should be 13', total)
    } 
})
