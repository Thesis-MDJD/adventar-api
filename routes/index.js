import express from 'express';
import {
  getBusinessById,
  getNearby
} from '../controllers/yelp';

const router = express.Router();

router.route('/yelp/business/:id').get(getBusinessById);
router.route('/yelp/nearby').get(getNearby);

export default router;


