const express = require('express');
const prdctModel = require('../model/model')
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, World!'); // Respond with a simple message
});

module.exports = router;

router.post('/add-expense', async (req,res,next)=>{

   console.log(req.body.amount);
   console.log(req.body.spendcat);
   console.log(req.body.purpose);
    const Amount = req.body.amount;
    const spendtype = req.body.spendcat;
    const descp = req.body.purpose;

    try{
        if(!Amount||!spendtype||!descp){
            console.log("please fill all the fields")
        } else {
            const data = await prdctModel.create({
                amount : Amount,
                description : descp,
                category : spendtype
            })

            res.json(data);
        }
    }
    catch(e){
        console.log(e)
    }



});



router.get('/get-expense',async(req,res,next)=> {
    try{

        const allExp = await prdctModel.findAll().then(result => res.json(result))

    }catch(e){
        console.log(e)
    }
})


router.delete('/del-expense/:id',async(req,res,next)=> {

    const expID = req.params.id;
    
    try{
        await prdctModel.destroy({where :{id :expID}})
    }catch(e){

    }

})


module.exports = router; 