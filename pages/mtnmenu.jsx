import router from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navi from '../components/Staffnav'
import Image from 'next/image'
import axios from 'axios'


const mtnmenu = ({ dishes }) => {

    const [addShow, setAddShow] = useState(false)
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')

    const list = new Array()
    for (const dish of dishes) {
        list.push(dish)
    }

    function manage(id) {
        sessionStorage.setItem("dishID", id)
        router.push('/mtndish')
    }

    function add() {
        setAddShow(true)
    }

    function cancel(event) {
        event.preventDefault()
        setAddShow(false)
    }

    const onChange = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const uploadFile = async () => {
        const formData = new FormData()
            formData.append('photo', file)
            const resp = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    }

    async function addConf(event) {

        const name = event.target.name.value
        const cat = event.target.cat.value
        const desc = event.target.desc.value
        const price = event.target.price.value

        event.preventDefault()
        uploadFile()
        const res = await fetch(
            `http://localhost:5000/dishes`,
            {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    category: cat,
                    desc: desc,
                    price: price,
                    photoName: filename
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status == 201) {
            setAddShow(false)
            router.push('/mtnmenu')
        }

    }

    function getImage(dish) {
        return `/uploads/${dish.photoName}`
    }

    return (
        <div>
            <Navi></Navi>
            <h1>Maintain menu</h1>
            <button onClick={add}>Add Dish</button>
            {addShow ?  //Warning for deleting user
                <div>
                    <div style={{
                        zIndex: "1", border: "2px solid white",
                        width: "600px", height: "300px",
                        position: "absolute", backgroundColor: "black",
                        left: "50%", top: "50%",
                        marginTop: "-150px", marginLeft: "-300px"
                    }}>
                        <h2 style={{ textAlign: "center" }}>Add Dish</h2>
                        <form onSubmit={addConf}>
                            <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <tbody>
                                    <tr>
                                        <td><label htmlFor="name">Name:</label></td>
                                        <td><input type="text" name="name" id="name" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="cat">Category:</label></td>
                                        <td><input type="text" list="cats" id="cat" name="cat" />
                                        <datalist id="cats">
                                            <option value="Entree"></option>
                                            <option value="Main"></option>
                                            <option value="Desert"></option>
                                            <option value="Side"></option>
                                        </datalist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="desc">Description:</label></td>
                                        <td><textarea name="desc" cols="22" rows="5" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="price">Price:</label></td>
                                        <td><input type="number" id="price" name="price" min="0" /></td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="photo">Picture:</label></td>
                                        <td><input type="file" name="photo" id="photo" onChange={onChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{ textAlign: "center" }}>
                                <input type="submit" value="Add Dish" />
                                <button onClick={cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                : null}
            <table style={{ border: "1px solid black" }}>
                <thead>
                    <tr><td>Photo</td><td>Name</td><td>Category</td><td width="200">Description</td><td>Price</td></tr>
                </thead>
                <tbody>
                    {list.map((dish) => (
                        <tr key={dish.id}><td><Image src={getImage(dish)} width="150" height="auto" /></td>
                            <td>{dish.name}</td>
                            <td>{dish.category}</td><td>{dish.desc}</td>
                            <td>{dish.price}</td>
                            <td><button onClick={() => manage(dish.id)}>Manage</button></td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/dishes`)
    const dishes = await res.json()
    return {
        props: { dishes },
    }
}

export default mtnmenu
