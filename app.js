const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');

//middleware
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hi from middleware ');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  let tour;
  if ((tour = tours.find((e) => e.id === id))) {
    res.status(200).json({
      status: 'success',
      tour: tour,
    });
  } else {
    res.status(404).send('not found');
  }
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: success,
        tour: newTour,
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);
  let tour;
  if ((tour = tours.find((e) => e.id === id))) {
    res.status(200).json({
      status: 'success',
      tour: 'updated tours will here',
    });
  } else {
    res.status(404).send('not found');
  }
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  let tour;
  if ((tour = tours.find((e) => e.id === id))) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(404).send('not found');
  }
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'this route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'this route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'this route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'this route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'this route is not yet defined',
  });
};

// app.get('/api/v1/tours', getAllTours);
//
// app.get('/api/v1/tours/:id', getTour);
//
// app.post('/api/v1/tours', createTour);
//
// app.patch('/api/v1/tours/:id', updateTour);
//
// app.delete('/api/v1/tours/:id', deleteTour);

//routes
const tourRoute = express.Router();
const userRoute = express.Router();

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

tourRoute.route('/').get(getAllTours).post(createTour);

tourRoute.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRoute.route('/').get(getAllUsers).post(createUser);
userRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
//starting server
app.listen(port, () => console.log(`app listening on port 3000!`));
