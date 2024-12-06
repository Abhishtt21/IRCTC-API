const {zod} = require('zod');

const userSchema = zod.object({
    username: zod.string().min(5).max(20),
    email: zod.string().email(),
    password: zod.string().min(8).max(100),
    role: zod.enum(['admin','user'])
})

const trainSchema = zod.object({
    train_name: zod.string().min(5).max(20),
    source: zod.string().min(5).max(20),
    destination: zod.string().min(5).max(20),
    totalSeats: zod.number().int(),
    availableSeats: zod.number().int()
})

module.exports = {userSchema, trainSchema};