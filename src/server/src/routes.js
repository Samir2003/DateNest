import express from 'express';
import User from './models/user.js';
import ExDate from './models/date.js';

const router = express.Router();

/** 
* Adds a user to db
* @req has a body that contains an object with all the required fields of a user
* @return user as an object
**/
router.post('https://agile-gorge-94685.herokuapp.com/user', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});



/** 
* Looks for user in database
* @id is the deviceId
* @return user if found
**/
router.get('https://agile-gorge-94685.herokuapp.com/:id/user', async (req, res) => {
  const deviceId = req.params.id;
  res.send('from the server')

  try {
    const user = await User.findOne({ deviceId });

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (e) {
    res.status(500).send('Internal error');
  }
});

/*
Gets all of a user's dates
:id is the device id
returns array of 
*/
router.get('https://agile-gorge-94685.herokuapp.com/:id/allmydates', async (req, res) => {
  const deviceId = req.params.id;

  try {
    const dates = User.findOne({ deviceId })
      .populate('dates')
      .exec((err, user) => {
        if(err){
          return res.status(500).send("Error")
        }
        return res.send(user.dates)
      });
  } catch (e) {
    res.status(500).send();
  }
});

/*
Adds a date to a user specified by deviceId
:id is the device id
date is ExDate
*/
router.post('https://agile-gorge-94685.herokuapp.com/:id/date', async (req, res) => {
  const deviceId = req.params.id;
  try {
    const user = await User.findOne({ deviceId });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const exDate = new ExDate(req.body);

    await exDate.save()
    console.log("date saved")

    await user.dates.push(exDate);
    await user.save()

    res.send(user);
  } catch (e) {
    res.status(500).send('Could not add date');
  }
});

/*
deletes a date
:id is device id
_id is the date ObjectId. Make sure to include in body of request
*/
router.delete('https://agile-gorge-94685.herokuapp.com/:id/date', async (req, res) => {
  const deviceId = req.params.id
  const _id = req.body._id

  try {
    const exDate = await ExDate.findOneAndDelete({_id})
    console.log(_id)

    if(!exDate) {
      return res.status(404).send('Date not found')
    }

    const user = await User.findOne({deviceId})
    user.dates.splice(user.dates.indexOf(_id), 1)
    user.save()

    res.send(exDate)
  } catch (e) {
    res.status(500).send()
  }
})

/*
update the info of a date
_id in body is the id of the date to be updated
updates in  body is an array of updates
  Ex. [{name: newUsername}, {age: newAge}]
*/
router.patch('https://agile-gorge-94685.herokuapp.com/date/update', async (req, res) => {
  const _id = req.body._id

  try {
    const exDate = await ExDate.findOne({_id})

    req.body.updates.forEach((update) => {
      exDate[Object.keys(update)[0]] = update[Object.keys(update)[0]]
    })

    exDate.save()

    res.send(exDate)
  } catch (e) {
    res.status(500).send()
  }
})


export default router;