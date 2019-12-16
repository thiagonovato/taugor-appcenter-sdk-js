let unsubscribes = [];
let onSnapshots = [];
/**
 * Keeps stored the unsubscribe functions
 * returned by firestore.onSnapshot method
 * @param {function} unsubscribe
 */
const addUnsubscribe = (unsubscribe) => {
	unsubscribes.push(unsubscribe);
};

/**
 * Will merge the result of multiple queries
 * @param {array<array>} queries
 */
const mergeQueryResults = (queries) => {
	let objectMap = {};

	queries.forEach((query) => {
		query.forEach((item) => {
			objectMap[item.uid] = item;
		});
	});

	return Object.values(objectMap);
};

/**
 * Performs a query at firestore and creates a result object, with uid and data at the same level
 * @param {query} query firestore Query
 * @param {string} identifier unique identifier for all the queries from a single ->list call
 * @param {boolean} isSnapshot indicates if it should use onSnapshot or get
 * @param {function} resolve method that will be called after query resolves,
 * and everytime there is an update at the onSnapshot
 */
const makeQuery = (query, identifier, isSnapshot, resolve) => {
	let count = 0;
	try {
		if (isSnapshot) {
			const unsubscribe = query.onSnapshot(
				(snapshot) => {
					let list = [];
					snapshot.docs.forEach((doc) => {
						let c = doc.data();
						c.uid = doc.id;
						c.$$identifier = identifier;
						list.push(c);
					});
					count++;
					resolve({ list, count, identifier });
				},
				(err) => {
					console.log(err);
					signOut();
				}
			);
			addUnsubscribe(unsubscribe);
			return unsubscribe;
		} else {
			query.get().then(
				(snapshot) => {
					let list = [];
					snapshot.docs.forEach((doc) => {
						let c = doc.data();
						c.uid = doc.id;
						c.$$identifier = identifier;
						list.push(c);
						count++;
					});
					resolve({ list, count, identifier });
				},
				(err) => console.log(err)
			);
			return () => null;
		}
	} catch (e) {
		return Promise.reject();
	}
};

/**
 * Generates a 59 length unique id
 */
const uid = () => {
	let date = new Date();
	let rand = () => Math.floor(Math.random() * 3000) + 1;
	let randInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
	let a = date.getTime().toString(16);

	date.setDate(date.getDate() + rand());
	let b = date.getTime().toString(16);

	date.setDate(date.getDate() + rand());
	let c = date.getTime().toString(16);

	date.setDate(date.getDate() + rand());
	let d = date.getTime().toString(16);

	date.setDate(date.getDate() + rand());
	let e = date.getTime().toString(16);

	let f = a + '-' + b + '-' + c + '-' + d + '-' + e;
	let intervals = [];
	let length = f.length;
	for (let i = 0; i < length - 5; i++) {
		let index = randInterval(0, length);
		f = f.substr(0, index) + f.substr(index, 1).toUpperCase() + f.substr(index + 1);
	}
	return f;
};

/**
 * ReduxHelper
 * This function will create a reducer and three basic actions (get,list,patch)
 * @param {string} collection
 * @param {object} INITIAL_STATE
 */
const ReduxHelper = (
	reducerName,
	store,
	INITIAL_STATE = {
		current: {},
		list: []
	}
) => {
	let reduxprefix = `APP_${new Date().getTime()}`;

	const ACTION_GET_COMPLETED = `${reduxprefix}_${reducerName}_ACTION_GET_COMPLETED`;
	const ACTION_SAVE_COMPLETED = `${reduxprefix}_${reducerName}_ACTION_SAVE_COMPLETED`;
	const ACTION_PATCH_COMPLETED = `${reduxprefix}_${reducerName}_ACTION_PATCH_COMPLETED`;
	const ACTION_LIST_COMPLETED = `${reduxprefix}_${reducerName}_ACTION_LIST_COMPLETED`;
	const ACTION_DELETE_COMPLETED = `${reduxprefix}_${reducerName}_ACTION_DELETE_COMPLETED`;
	const ACTION_SET_CURRENT = `${reduxprefix}_${reducerName}_ACTION_SET_CURRENT`;

	/**
	 * Default reducer for all default actions of the collection
	 * @param {object} state
	 * @param {object} action
	 */
	const reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {
			case ACTION_SET_CURRENT:
				return {
					...state,
					current: action.current
				};
			case ACTION_GET_COMPLETED:
				return {
					...state,
					current: action.current
				};
			case ACTION_LIST_COMPLETED:
				return {
					...state,
					list: action.list
				};
			case ACTION_PATCH_COMPLETED:
				let current = {
					...state.current,
					...action.properties
				};

				return {
					...state,
					current: current
				};
			case ACTION_SAVE_COMPLETED:
				return {
					...state,
					current: action.current
				};
			case ACTION_DELETE_COMPLETED:
				return {
					...state
				};
			default:
				return state;
		}
	};

	store.injectReducer(reducerName, reducer);

	const get = (item) =>
		store.dispatch({
			type: ACTION_GET_COMPLETED,
			current: item
		});
	const patch = (properties) =>
		store.dispatch({
			type: ACTION_PATCH_COMPLETED,
			properties: properties
		});
	const list = (list) =>
		store.dispatch({
			type: ACTION_LIST_COMPLETED,
			list: list
		});

	return {
		reducer,
		actions: { get, patch, list },
		constants: {
			ACTION_GET_COMPLETED,
			ACTION_SAVE_COMPLETED,
			ACTION_PATCH_COMPLETED,
			ACTION_LIST_COMPLETED,
			ACTION_DELETE_COMPLETED,
			ACTION_SET_CURRENT
		}
	};
};

/**
 * Creates a service class that can perform crud queries at firestore
 * This service will be able to control all redux state, if wanted
 * The filter method will allow to have what would be multiple queries to firestore
 * all merged into one result
 * @param {string} collection - Firestore Collection Name
 * @param {object} [defaultObject] - Object that will decide the properties that will be saved
 * @param {object} [store] - Redux Store object. Pass it if you want to have automatic redux state control
 * @param {string} [reducerName] - Redux reducer name
 */
const BasicService = ({ firebase, collection, defaultObject, store, reducerName }) => {
	if (!(typeof firebase === 'object')) throw 'Oops! "firebase" property MUST be an object.';
	if (typeof firebase.firestore !== 'function')
		throw 'Oops! The "firebase" object MUST contain a firestore() function.';
	if (typeof firebase.auth !== 'function')
		throw 'Oops! The "firebase" object MUST contain a auth() function.';

	let Collection = firebase.firestore().collection(collection);

	let oRedux;
	if (store && store.injectReducer) {
		oRedux = ReduxHelper(reducerName || collection, store);
	}

	const _defaults = {
		filters: [['deleted', '==', false]]
	};

	let _filters = Object.assign([], _defaults.filters);
	let _orders = [];
	let _limit = 1000;

	let unsubscribeCurrent;
	/**
	 *
	 */
	let Service = {
		/**
		 * Performs a set at firestore
		 * If there is an "uid" prop at #item, and the uid is present at the database,
		 * the register will be completely replaced by #item parameter
		 * If there is an "uid" prop at item but it's not present at the database,
		 * a new register with the uid will be created at database
		 * If there is no "uid" prop at item, an uid will generated automatically
		 * @param {object} item The item to be saved/replaced at firestore
		 */
		save: (item) => {
			let doc;
			if (!item.uid) {
				doc = Collection.doc();
				item.uid = doc.id;
			} else {
				doc = Collection.doc(item.uid);
			}
			console.log(item.uid);
			const finalItem = Service.createObject(item);
			console.log('finalItem', finalItem);
			return doc.set(finalItem).then((r) => {
				return finalItem;
			});
		},
		/**
		 * Performs an update on the properties passed as param, only.
		 * Doesn't change properties that are not present at the param
		 * @params {object} properties props to be updated
		 */
		patch: (uid, properties) => {
			return Collection.doc(uid)
				.update(properties)
				.then((result) => {
					if (oRedux) oRedux.actions.patch(properties);
					return result;
				});
		},
		/**
		 * Performs a query on a single uid at firestore database
		 * @param {string} uid identity of the object at firestore
		 */
		get: (uid) => {
			if (!uid) return Promise.resolve(false);
			return new Promise((resolve, reject) => {
				if (typeof unsubscribeCurrent === 'function') {
					unsubscribeCurrent();
				}

				unsubscribeCurrent = Collection.doc(uid).onSnapshot((result) => {
					let data = result.data();
					if (oRedux) oRedux.actions.get(data);
					resolve(data);
				});
				addUnsubscribe(unsubscribeCurrent);
			});
		},
		/**
		 * Use this method before list or get setting the filters by parameter
		 * AND OR queries
		 * code example:
		 * [
		 * 		['bla','==',var1],
		 * 		['ble','==',var2],
		 * 		[
		 * 			['blo','==',var4],
		 * 			['blu','==',var5],
		 * 		],
		 * ]
		 *
		 * Produces
		 *
		 * (bla==var1) OR (ble==var2) OR (blo==var4 AND blu==var5)
		 *
		 * Queries generated:
		 * 1 - where(bla,==,var1)
		 * 2 - where(ble,==,var2)
		 * 3 - where(blo,==,var4).where(blu,==,var5)
		 * @method filter
		 * @param {array<mixed>} Array containing the filters
		 * @param {}
		 */
		filter: (filters) => {
			_filters = filters;
			return Service;
		},
		/**
		 * @param {boolean} keepReduxList indicates if the redux state needs to be kept or not
		 * @param {boolean} isSnapshot tells if the query needs to be onSnapshot or get, in order to receive updates passively or not
		 */
		list: (keepReduxList, isSnapshot = true) => {
			if (!keepReduxList) {
				if (oRedux) oRedux.actions.list([]);
				onSnapshots.forEach((unsubscribe) => {
					unsubscribe();
				});
				onSnapshots = [];
			}

			return new Promise((resolveA, rejectA) => {
				let storedList = !keepReduxList ? [] : store.getState()[collection].list || [];
				let promises = [];
				_filters.forEach((filter, i) => {
					let query = Collection;

					if (filter[0] instanceof Array) {
						filter.forEach((subFilter) => {
							if (subFilter[2] === undefined) return;
							query = query.where(subFilter[0], subFilter[1], subFilter[2]);
						});
					} else {
						if (filter[2] === undefined) return;
						query = query.where(filter[0], filter[1], filter[2]);
					}

					_orders.forEach((order) => {
						if (typeof order === 'string') {
							query = query.orderBy(order);
						}
						if (order instanceof Array) {
							query = query.orderBy(order[0], order[1]);
						}
					});
					if (_limit > 0) {
						query = query.limit(_limit);
						limit = 1000;
					}
					let uuid = uid();
					promises.push(
						new Promise((resolve, reject) => {
							onSnapshots.push(
								makeQuery(
									query,
									uuid,
									isSnapshot,
									({ list, count, identifier }) => {
										storedList = storedList.filter((o) => {
											return o.$$identifier != identifier;
										});
										storedList = mergeQueryResults([storedList, list]);
										if (oRedux) oRedux.actions.list(storedList);

										resolve(storedList);
									}
								)
							);
						})
					);
				});
				_filters = _defaults.filters;
				return Promise.all(promises)
					.then(mergeQueryResults)
					.then((list) => {
						if (oRedux) oRedux.actions.list(list);
						resolveA(list);
						return list;
					});
			});
		},
		/**
		 * Use this method before list or get by setting the order fields by parameter
		 * Example
		 * ['name','age', ['height','desc']]
		 * @param {array} orders
		 */
		order: (orders) => {
			_orders = orders;
			return Service;
		},
		/**
		 * Limits the amount of rows returned by firestore query
		 * @param {integer} limit
		 */
		limit: (limit) => {
			_limit = limit;
			return Service;
		},
		/**
		 * Fills an object will the default properties, and replace the default values
		 * the the ones passed at input
		 * @param {object} input Item to transformed into default object pattern
		 */
		createObject: (input) => {
			input = input || {};
			let o = {
				deleted: input.deleted || false
			};

			Object.keys(defaultObject).map((i) => {
				if (typeof defaultObject[i] === 'function') return;
				o[i] = normalizeProps(input[i] || defaultObject[i]);
			});

			if (input.uid) {
				o.uid = input.uid;
			} else {
				delete o.uid;
			}

			o.createdAt = input.createdAt || new Date();
			o.createdBy = o.createdBy || firebase.auth().currentUser.uid;

			return o;
		}
	};
	return Service;
};
const normalizeProps = (item) => {
	if (typeof item !== 'object' || item instanceof Date || (item && item.toDate)) return item;
	if (item instanceof Array) {
		let r = [];
		item.map((v, i) => {
			r[i] = normalizeProps(v);
		});
		return r;
	} else {
		let r = {};

		Object.keys(item).map((i) => {
			if (i === '$$identifier') return;
			if (typeof item[i] === 'function') return;
			r[i] = normalizeProps(item[i]);
		});
		return r;
	}
};

module.exports = {
	uid,
	normalizeProps,
	BasicService
};
