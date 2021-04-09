import { React } from 'react'
import 'date-fns'
import { Grid } from '@material-ui/core/Grid'
import { DateFnsUtils } from '@date-io/date-fns'
import { 
    MuiPickerUtilsProvider,
    KeyboardTimePicker,
    KeyboarddatePicker
} from '@material-ui/pickers'

function reservation() {

    const [selectedDate, setSelectedDate] = React.useState(
        new Dare("2020-09-11T12:00:00")
    )
    
    const handleDateChange = (date) => {
        setSelectedDate(date)
    }
    
    
    return (
        <div className="reservation">
            <MuiPickerUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
            <KeyboarddatePicker
                    disableToolbar
                    variant='dialog'
                    format='MM/dd/yyy'
                    margin='normal'
                    id='date-picker'
                    label='Date Picker'
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}
                    ></KeyboarddatePicker>
    
            <KeyboardTimePicker
                    margin='normal'
                    id='time-picker'
                    label='Time Picker'
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}
                    ></KeyboardTimePicker>
            </Grid>
            </MuiPickerUtilsProvider>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/users`)
    const users = await res.json()
    return {
        props: { users },
    }
}


export default reservation