import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

router.route('/').get(catchAsync(getProducts)).post(catchAsync(createProduct));

router
  .route('/:pID')
  .get(catchAsync(getProduct))
  .put(catchAsync(updateProduct))
  .delete(catchAsync(deleteProduct));

export default router;