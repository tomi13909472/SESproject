import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import styles from '../styles/booktable.module.css'
import Navi from '../components/Custnav'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const booktable = ({ tableusers}) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    // const [popup, setpopup] = useState(false)

    useEffect(() => {
        document.getElementById("date").setAttribute("min", MinDate())
    })

    function MinDate() {
        var today_date = new Date()
        today_date.setDate(today_date.getDate())
        return today_date.toISOString().slice(0, 10) //2013-03-10T02:00:00Z
    }

    const notify =()=>{
        toast.success('Booking Successful!',{ position:toast.POSITION.TOP_CENTER })
    }

    async function onSubmit(event) {
        event.preventDefault()
        let cont=true;
        var date=document.getElementById("date");
        const MDate = event.target.date.value;
        const time = event.target.time.value;
        const table=event.target.table.value;
        const persons=event.target.person.value;

        for (const user of tableusers) {
            if (user.table == table && user.date == MDate) {
                console.log("abcd1")
                if(user.time == time)
                    setShow(true)
                    cont = false;
                    break
            }
        }
        if (cont) {
            const res = await fetch(
                `http://localhost:5000/bookings`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: sessionStorage.getItem("name"),
                        email: sessionStorage.getItem("email"),
                        date: MDate,
                        time: time,
                        table:table,
                        numberofpeople: persons,
                        personId : sessionStorage.getItem("id")
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status == 201) {
                var Name=sessionStorage.getItem("name");
                var Email=sessionStorage.getItem("email")
                sessionStorage.setItem("name",Name)
                sessionStorage.setItem("email",Email)
                router.push("/custhome")
            }
        }

    }


    return (
        <div className="container-form">
            <Navi></Navi>
            {show ? <p>table already occupied</p> : null}
            {/* {popup ? 
            <div className="popup">
                <p>Booking successful</p>
                <button onClick={close}>close</button>
            </div> : null } */}
            <form className={styles.bookform} onSubmit={onSubmit}>
            <h1>Reservation online</h1>
                <table className={styles.booktable}>
                    <tbody>
                        <tr>
                            <td><label htmlFor="Date">Date:</label></td>
                            <td><input required type="Date" name="date" id="date"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="time">Time:</label></td>
                            <td><input required type="time" id="time" name="time"></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="table">Table:</label></td>
                            <td><select required name="table" id="table">
                                <option value="table-select">select table</option>
                                <option value="table 1">table 1</option>
                                <option value="table 2">table 2</option>
                                <option value="table 3">table 3</option>
                                <option value="table 4">table 4</option>
                                <option value="table 5">table 5</option>
                                <option value="table 6">table 6</option>
                                </select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="person">How many people:</label></td>
                            <td><select required name="person" id="person">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">5+</option>
                                </select></td>
                        </tr>
                    </tbody>
                </table>
                <input onClick={notify} type="submit" value="Submit" />
            </form>
        </div>
    )
}
export async function getStaticProps() {
    const restb = await fetch(`http://localhost:5000/bookings`)
    const tableusers = await restb.json()
    return {
        props: { tableusers},
    }
}


export default booktable