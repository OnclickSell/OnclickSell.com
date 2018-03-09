const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plansController');
import authMiddleware from '../middlewares/authMiddleware'


// router.post('/', (req, res, next) => {
//     return listingsController.test(req, res, next);
// });

router.get('/', plansController.get_plans);
// router.get('/:id/:title', listingsController.get_single_listing);
// router.post('/', authMiddleware, listingsController.create_single_listings);
// router.put('/:id', authMiddleware, listingsController.update_single_listings);
// router.delete('/:id', authMiddleware, listingsController.delete_single_listings);
// router.get('/technologies/fetch', listingsController.fetch_technologies);

module.exports = router;