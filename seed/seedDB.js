const mongoose = require("mongoose");
const User = require("../models/User");
const Skill = require("../models/Skill");
const Task = require("../models/Task");
const faker = require("faker");
const env = require("../config/config");
const { random } = require("faker");

mongoose
    .connect(env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Connection to db established"))
    .catch((err) => console.log("[ERROR] DB connection failed", err));

(async function () {
    let skillsDB = [
        "Petsitting",
        "Bricolage",
        "Painting",
        "Photography",
        "Massage",
        "Hair Styling",
        "Video",
        "Brewing",
        "Jewellery",
        "Cooking",
        "Coding",
        "Languages",
        "Local Guide",
    ];

    //DELETE OLD USERS
    try {
        await User.deleteMany({});
        console.log("Old users deleted");
    } catch (error) {
        console.log(error);
    }

    // CREATE 10 FAKE USERS

    const userPromises = Array(10)
        .fill(null)
        .map(() => {
            const userData = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                userName: faker.internet.userName(),
                email: faker.internet.email(),
                birthday: faker.date.past(),
                password: "01234Ab1#",
                skills: random.arrayElement(skillsDB),
                bio: "",
            };

            const user = new User(userData);
            return user.save();
        });

    let usersSeeded;

    try {
        usersSeeded = await Promise.all(userPromises);
        console.log("We stored 10 users in the DB");
    } catch (error) {
        console.log(error);
    }

    const userIds = usersSeeded.map((user) => user._id);

    //DELETE OLD SKILLS
    try {
        await Skill.deleteMany({});
        console.log("Old skills deleted");
    } catch (error) {
        console.log(error);
    }

    const skillPromises = Array(10)
        .fill(null)
        .map(() => {
            const skillData = {
                name: faker.random.arrayElement(skillsDB),
                creator: faker.random.arrayElement(userIds),
            };

            const skill = new Skill(skillData);
            return skill.save();
        });

    let skillSeeded;

    try {
        skillSeeded = await Promise.all(skillPromises);
        console.log("We stored 10 skills in the DB");
    } catch (error) {
        console.log(error);
    }

    const skillIds = skillSeeded.map((skill) => skill._id);

    //DELETE OLD TASKS
    try {
        await Task.deleteMany({});
        console.log("Old tasks deleted");
    } catch (error) {
        console.log(error);
    }

    const possibleStatus = ["pending", "rejected", "finished", "confirmed"];

    const taskPromises = Array(10)
        .fill(null)
        .map(() => {
            const taskData = {
                skill: faker.random.arrayElement(skillIds),
                boons: faker.commerce.price(),
                message: faker.lorem.paragraph(),
                status: faker.random.arrayElement(possibleStatus),
                date: faker.date.future(),
                boonee: faker.random.arrayElement(userIds),
                booner: faker.random.arrayElement(userIds),
                rating: Math.floor(Math.random() * (5 - 1 + 1) + 1),
            };

            const task = new Task(taskData);
            return task.save();
        });

    let tasksSeeded;

    try {
        tasksSeeded = await Promise.all(taskPromises);
        console.log("We stored 10 tasks in the DB");
    } catch (error) {
        console.log(error);
    }

    mongoose.connection.close();
})();
