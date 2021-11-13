import axios from "axios";
import React from "react";

const AddingNew = ()=>{
    const [newUser ,setNewuser] = React.useState({
        name :'',
        id :'',
        cash :'',
        credit :'',
        passportId :'',
        email :''
    })
    const [masg ,setMasg] = React.useState(false)
    const [getUsersData , setGetUsersData] = React.useState([])

    React.useEffect(()=>{
     getData()
    },[])
    
    const getData = ()=>{
        axios.get('http://localhost:5000')
        .then(res=>{
          console.log(res.data);
          setGetUsersData(res.data)
        })
      }

const addUser =()=>{
   if(newUser.name && newUser.id && newUser.cash && newUser.credit && newUser.passportId && newUser.email){
       axios.post('http://localhost:5000/',newUser)
       .then(res=>{
           if(res.status === 202){
               console.log(res.data);
               setGetUsersData([...getUsersData , res.data]) 
               setMasg(true)
           }
       }).catch(err=>{
           console.log('Error');
       })
   } 
}

const textHandler =(e)=>{
 setNewuser({
     ...newUser , 
     [e.target.name] : e.target.value
 })
 console.log('newuser: ',newUser)
}

return (
    <>
   First Name: <input type='text' name={'name'} value={newUser.name} onChange={textHandler}/><br/>
   Id: <input type='text' name={'id'} value={newUser.id} onChange={textHandler}/><br/>
   Cash: <input type='text' name={'cash'} value={newUser.cash} onChange={textHandler}/><br/>
   Credit: <input type='text' name={'credit'} value={newUser.credit} onChange={textHandler}/><br/>
   PassportId: <input type='text' name={'passportId'} value={newUser.passportId} onChange={textHandler}/><br/>
   Email: <input type='email' name={'email'} value={newUser.email} onChange={textHandler}/><br/>
    <input type='button' value='Add' onClick={addUser}/>
    {
        masg? <div>Welcome to the Club</div>:''
    }
    </>
)
}

export default AddingNew