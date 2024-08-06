const Course = require("../../models/course/course");

const searchCourses = async (req, res) => {
    try {
        // console.log(req.params);
        const response = await Course.find({
            $or: [
                { coursename: { $regex: new RegExp(req.params.key) } },
                // { courseprice: { $regex: new RegExp(Number(req.params.key)) } },
                { courseduration: { $regex: new RegExp(req.params.key) } },
                { coursedes: { $regex: new RegExp(req.params.key) } },
                // { status: { $regex: new RegExp(req.params.key) } }
            ]
        });
        res.status(200).json({ message: "data fetched successfully", data: response });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })

    }
};
module.exports = searchCourses;