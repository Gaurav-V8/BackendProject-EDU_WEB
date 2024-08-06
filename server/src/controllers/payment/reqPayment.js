
const reqPayment = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: 'done' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });

    }
};

module.exports = reqPayment;