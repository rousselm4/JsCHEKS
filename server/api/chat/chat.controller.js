/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/chats              ->  index
 */

'use strict';

// Gets a list of Chats
export function index(req, res) {
  res.json([]);
}
