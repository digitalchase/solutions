import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../style/index.css";

class CustomSelect extends Component {
    state = { isOpen: false };
    _close = () => this.setState({ isOpen: false });
    _open = () => this.setState({ isOpen: true });

    render() {
        const { isOpen } = this.state;
        return (
            <div
                onClick={isOpen ? this._close : this._open}
                className={`custom-select ${isOpen ? "open" : "closed"}`}
                style={{...this.props.style}}>
                <div className="field">
                    <div className="display">{this._renderDisplay()}</div>
                    <div className="button">
                        {isOpen ? "▴" : "▾"}
                    </div>
                </div>
                {isOpen ? <div className="options">{this._renderOptions()}</div> : null}
                {isOpen ? <div className="overlay" onClick={this._close} /> : null}
            </div>
        );
    }

    _handleClick = value => () => {
        this._setValue(value);
        this._close();
    };

    _renderDisplay = () => {
        const { options, value, placeholder } = this.props;
        const found = options.find(option => option.id === value);

        if (found) return found.display;
        return placeholder;
    };

    _renderOptions = () => {
        return this.props.options.map(option => (
            <div
                className={`option ${option.id === this.props.value ? "active" : ""}`}
                key={option.id}
                onClick={this._handleClick(option.id)}
            >
                {option.display}
            </div>
        ));
    };

    _setValue = value => {
        this.props.setFieldValue(this.props.name, value);
    };
}

CustomSelect.defaultProps = {
    placeholder: 'Значение не выбрано',
    style: {}
};

CustomSelect.propTypes = {
    placeholder: PropTypes.string,
    style: PropTypes.object
}

export default CustomSelect;
