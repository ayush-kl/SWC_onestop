const router = require('express').Router();
let formData = require('../backend/exitmodel');

router.route('/').get((req, res) => {
  formData.find()
    .then(formDatas => res.json(formDatas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/change').patch((req,res) => {
  const {Status} = req.body;
  if(Status == true){
    const {outlook} = req.body;
    const query = { outlook: outlook };
    formData.findOne(query)

    .then(foundFormData => {
        if (foundFormData) {
            foundFormData.updateOne({Status:false})
            
            res.json(foundFormData);
        } else {
            
            res.status(404).json({ message: 'Document not found' });
        }
    })
    .catch(err => {
        
        console.error('Error while finding document:', err);
        res.status(500).json({ message: 'Internal server error' });
    });
} else {
res.status(400).json({ message: 'Status is not true or outlook is missing' });
}
  
})
router.route('/add').post((req, res) => {
    const {name,rollNumber,department,hostel,roomNumber,Course,outgoingLocation,phoneNumber,outlook,Status} =req.body

  
  const date = Date.parse(req.body.date);

  const newFormData = new formData({
    outlook,
    name,
    phoneNumber,
    outgoingLocation,
    date,
    rollNumber,
    roomNumber,
    hostel,
    department,
    Course,
    Status
   
  });

  newFormData.save()
  .then(()=> Status = true )
  .then(() => res.json('Success!') )
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
