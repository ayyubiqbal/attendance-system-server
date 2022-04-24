const router = require('express').Router();
const userController = require('../controller/users');

/**
 * get all users, including,
 * filter
 * sort
 * pagination
 * select properties
 * @route api sorting
 * @method GET
 * @visibility private
 */

/**
 * get user by id
 */
router.get('/:userId', userController.getUserById)

/**
 * update user by id
 * @method put
 */
router.put('/:userId', userController.putUserById)

/**
 * update user by id
 * @method patch
 */
router.patch('/:userId', userController.patchUserById)

/**
* delete user by id
@method delete
*/
router.delete('/:userId', userController.deleteUserById)

router.get('/', userController.getUsers)

// create new user
router.post('/', userController.postUser)

module.exports = router