import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, toggleForm, showAdd}) => {
    const onClickAdd = () => {
        toggleForm();
    };
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAdd ? "red" : "green"} text = {showAdd ? "- Close" : "+ Add"} onClick = {onClickAdd}/>
        </header>
    )
}

Header.defaultProps = {
	title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}
export default Header
