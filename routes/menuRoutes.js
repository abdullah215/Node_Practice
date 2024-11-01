
const express=require('express')
const router=express.Router()
const menuItem = require('./../models/menu')



router.post('/', async (req, res) => {
  try {
      const menuData = req.body;
      const newMenuData = new menuItem(menuData);
      const response1 = await newMenuData.save();
      console.log('Data Saved');
      res.status(200).json(response1);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all menu items
router.get('/', async (req, res) => {
  try {
      const menuData = await menuItem.find();
      console.log('Data Fetched');
      res.status(200).json(menuData);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:taste', async(req,res)=>{

const taste=req.params.taste;

try{

if(taste=='sweet'||taste=='sour'||taste=='spicy'){
  const response= await menuItem.find({taste:taste});
  console.log('Response Fetched');
  res.status(200).json(response);
}
  else{
    res.status(404).json({ error: 'Invalid Taste-Type' });
  }

} catch (err) {
  console.log(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

router.put('/:id',async(req,res)=>{

try{
  const menuId=req.params.id;
  const UpdatedMenuData=req.body

  const response= await menuItem.findByIdAndUpdate(menuId,UpdatedMenuData,{
    new:true,
    runValidators:true
  });


if(!response){
  return res.status(404).json({error:'Data Not Found'});
}
console.log('Data Updated');

res.status(200).json(response);
}
catch(err){
  console.log(err);
  res.send(500).json({error:'Internal Server Error'});
}

});



router.delete('/:id',async(req,res)=>{

try{
const menuId=req.params.id;
const response=await menuItem.findByIdAndDelete(menuId);

if(!response){
  return res.status(404).json({error:'Data Not Found'})
}
console.log('Data Deleted');

res.status(200).json({message:'Menu Deleted Successfully'});

}
catch(err){

  console.log(err)
  res.status(500).json({error:'Internal Server Error'})
}


})







module.exports=router;