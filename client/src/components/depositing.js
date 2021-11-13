import axios from "axios";
import React from "react";

const Depositing = ({data}) => {
    const [updateUser, setUpdateUser] = React.useState({
        cash: '',
        credit: '',
        passportId: ''
    })
    const [updated, setUpdated] = React.useState(false)

    const textHandler = (e) => {
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value
        })
    }

    const updateCash = () => {
        axios.put(`http://localhost:5000/${updateUser.passportId}`, updateUser)
            .then(res => {
                if (res.status === 200) {
                    setUpdated(true)
                } else {
                    alert('something went')
                }
            })

    }
    const back =()=>{
        setUpdated(false)
    }
    const updateCredit =()=>{
        axios.put(`http://localhost:5000/credit/${updateUser.passportId}`, updateUser)
        .then(res => {
            if (res.status === 200) {
                setUpdated(true)
            } else {
                alert('something went')
            }
        })
    }

    return (
        <>
            {
                updated ? <div>
                    <input type='button' value='Make More Depositing' onClick={back} />
                </div> :
                    <div>
                        <h2>Depositing cash to a user </h2>
                        PassportId: <input type='text' name={'passportId'} value={updateUser.passportId} onChange={textHandler} /><br />
                        Cash: <input type='text' name={'cash'} value={updateUser.cash} onChange={textHandler} /><br />
                        <input type='button' value='on your way to become Jeff Bezos' onClick={updateCash} /><br/>
                        Credit: <input type='text' name={'credit'} value={updateUser.credit} onChange={textHandler} /><br />
                        <input type='button' value='on your way to become Jerome Kerviel' onClick={updateCredit} />
                    </div>
            }
        </>
    )
}
export default Depositing