import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    return <button onClick={onClick} style = {{ backgroundColor : color }} className="btn">{text}</button>
}

Button.defaultProps = {
    text: "Button Text",
    color: "blue",
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default Button
