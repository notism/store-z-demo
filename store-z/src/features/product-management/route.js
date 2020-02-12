// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ProductManagementPage,
} from './';

export default {
  path: 'product-management',
  name: 'Product management',
  childRoutes: [
    { path: 'product-management-page', name: 'Product management page', component: ProductManagementPage, isIndex: true },
  ],
};
