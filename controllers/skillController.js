const Skill = require("../models/Skill");
const User = require("../models/User");

//GET THE LGGED IN USER'S SKILLS
exports.getUserSkills = async (req, res, next) => {
    const userId = req.user._id; // read user ID from authenticated user
    const userTodos = await Skill.find({ userId });
    res.json(userTodos);
};

// GET ALL THE USERS WITH A CERTAIN SKILL
exports.getUsersBySkill = async (req, res, next) => {
    try {
        const { skillId } = req.params;
        console.log("helo me find params", req.params);
        const users = await User.find({
            skills: { $elemMatch: { skillID: skillId } },
        }).populate("skills.skillID");
        res.json(users);
    } catch (err) {
        next(err);
    }
};

//   GET ALL SKILLS
exports.getSkills = async (req, res, next) => {
    let skillsAll = await Skill.find();
    console.log(skillsAll);
    res.json(skillsAll);
};

// GET A SINGLE SKILL
exports.getSkill = async (req, res, next) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findById(id);
        res.json(skill);
    } catch (err) {
        next(err);
    }
};

// EDIT SKILL
exports.editSkill = async (req, res, next) => {
    const { id } = req.params;

    try {
        let skillUpdated = await Skill.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(skillUpdated);
    } catch (err) {
        next(err);
    }
};

//   ADD SKILL
exports.addSkill = async (req, res, next) => {
    const { name, creator } = req.body;

    try {
        const skillNew = await Skill.create({
            name,
            creator,
        });
        res.json(skillNew);
    } catch (err) {
        next(err); // forward error to central error handler
    }
};

// DELETE SKILL
exports.deleteSkill = async (req, res, next) => {
    const { id } = req.params;

    try {
        let skillDeleted = await Skill.findByIdAndDelete(id);
        res.json(skillDeleted);
    } catch (err) {
        next(err);
    }
};

// DELETE MULTIPLE SKILLS
exports.deleteMultipleSkills = async (req, res, next) => {
    const ids = req.body.skill;

    try {
        let deletedSkills = await Skill.deleteMany({ _id: { $in: ids } });
        res.json(deletedTodos);
    } catch (err) {
        next(err);
    }
};

// UPDATE MULTIPLE SKILLS
exports.updateMultipleSkills = async (req, res, next) => {
    const ids = req.body.skill;
    try {
        let promises = [];
        // We first find the skills we want to update
        let skills = await Skill.find({ _id: { $in: ids } });
        // If the id is also in the todos that need to be updated we find it and toggle it's status
        skills.forEach(async (skill) => {
            let promise = Skill.findByIdAndUpdate(skill._id, { new: true });
            // We pass all promises here so we can resolve them all together
            promises.push(promise);
        });

        const updatedSkills = await Promise.all(promises);
        res.json(updatedSkills);
    } catch (err) {
        next(err);
    }
};
