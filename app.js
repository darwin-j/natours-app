const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

// app.get('/api/v1/tours', getAllTours);
//
// app.get('/api/v1/tours/:id', getTour);
//
// app.post('/api/v1/tours', createTour);
//
// app.patch('/api/v1/tours/:id', updateTour);
//
// app.delete('/api/v1/tours/:id', deleteTour);
//
// app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => console.log(`app listening on port 3000!`));
