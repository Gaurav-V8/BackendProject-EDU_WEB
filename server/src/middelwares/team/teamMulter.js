


const multer = require('multer');

const teamstorage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'src/uploads');
    },
    filename:(req,file,cb)=>{
        const teamnameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + teamnameArr[teamnameArr.length-1]);
    }
});

const teamMulter = multer({storage:teamstorage}).single('thumbnail');

module.exports = teamMulter;