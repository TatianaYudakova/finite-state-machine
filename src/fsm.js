class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }
        this._config = config;
        this._state = config.initial;
        this._previousState = null;
        this._nextState = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!(state in this._config.states)) {
            throw new Error();
        }
        this._previousState = this._state;
        this._state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!(event in this._config.states[this._state].transitions)) {
            throw new Error();
        }
        this._previousState = this._state;
        this._state = this._config.states[this._state].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this._config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this._config.states);
        }
        //return not all states
        return Object.entries(this._config.states)
            .filter(val => Object.keys(val[1].transitions).includes(event))
            .map(val => val[0]);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this._previousState) {
            return false;
        }

        this._nextState = this._state;
        this._state = this._previousState;
        this._previousState = null;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (!this._nextState) {
            return false;
        }

        this._previousState = this._state;
        this._state = this._nextState;
        this._nextState = null;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._previousState = null;
        this._nextState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
