
const express=require('express')
const router=express.Router()
const person = require('./../models/person')




router.post('/', async (req, res) => {
  try {
      const data = req.body;
      const newPerson = new person(data);
      const response = await newPerson.save();
      console.log('Response Data Saved');
      res.status(200).json(response);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
      const data = await person.find();
      console.log('Data Fetched');
      res.status(200).json(data);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






router.get('/:work', async (req, res) => {
  const work = req.params.work;
  try {
      if (work === 'chef' || work === 'manager' || work === 'waiter') {
          const response = await person.find({ work: work });
          console.log('Response fetched');
          res.status(200).json(response);
      } else {
          res.status(404).json({ error: 'Invalid Work-Type' });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id',async(req,res)=>{

  try{
    const personId=req.params.id;
    const updatedPersonData=req.body;

    const response=await person.findByIdAndUpdate(personId,updatedPersonData,{
      new:true,
      runValidators:true
    });

if(!response){
  return res.status(404).json({error: 'Person not found'});
}

console.log('Data Updated');
res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Serve Error'});
  }
  });



  router.delete('/:id', async(req,res)=>{

  try{
    const personId=req.params.id;
    const response=await person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error:'Person Not Found'});
    }
console.log('Data Deleted');

res.status(200).json({message:'Person Delete Successfully'});
}
catch(err){
  console.log(err);
  res.status(500).json({error:'Internal Server Error'});


}


  });

module.exports=router;