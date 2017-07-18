var keyMirror = obj => Object.keys(obj).reduce( (acc, key) => ((acc[key]=key), acc), {} );

// Define actions
module.exports = keyMirror({
    TOGGLE_NETWORK: null,
    SET_URL: null,
    SET_TEXT: null,
    CHANGE_SIZE: null,
    TOGGLE_ICON: null
});
