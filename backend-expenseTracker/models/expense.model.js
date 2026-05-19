const mongoose = require('mongoose')


const expenseSchema = mongoose.Schema({
            // title, amount, category,     date, and most importantly userId 
            title: {type:String, lowercase:true, required: true},
            amount:{type:Number, required: true},
            category:{type:String, required: true,
                enum:["entertainment","food", "grocery", "Electricity bill", "outing", "shopping","study","others"]
            },
            date: { type: Date, default: Date.now },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
})


const expenseModel = mongoose.model('expense', expenseSchema)


module.exports = expenseModel;