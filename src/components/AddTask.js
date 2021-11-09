import { useState } from "react";

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        if(!text){
            alert('Enter the text please!');
            return;
        } 
        onAdd({text, day, reminder});

        //Clear the form
        setText(''); setReminder(false); setDay('');
    }
    return (
        <form className = 'add-form' onSubmit={ onSubmit }>
            <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" placeholder="Enter the reminder text" value={text} onChange={ (e) => {setText(e.target.value)}}/>
            </div>

            <div className="form-control">
            <label htmlFor="day">Day</label>
            <input type="text" placeholder="Enter the due day & time" value={day} onChange = { (e) => {setDay(e.target.value)} }/>
            </div>

            <div className="form-control form-control-check">
            <label htmlFor="text">Set reminder?</label>
            <input type="checkbox" checked={reminder} value = {reminder} onChange = { (e) => { setReminder(e.currentTarget.checked) } }/>
            </div>

            <input type="submit" value='Save Task' className='btn btn-block'/>          
        </form>
    )
}

export default AddTask
