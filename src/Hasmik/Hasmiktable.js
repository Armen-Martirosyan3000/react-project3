import React, { useState} from 'react';
import './Hasmiktable.css';
// import './Hasmik.css';
import njdeh from './image/njdeh.jpg';
import kapan from './image/kapan.jpg';
import  prof from './image/a.jpg';
import { Link } from "react-router-dom";

const initialValues = {
	userName: '',
	userSurname: '',
	userAge: '',
	userSalary: ''
}

function Hasmiktable(){
	// dark & light
	const [isClicked, setIsClicked] = useState(false); //click-ով բացի նկարներն

	const [userData, setUserData] = useState(initialValues);
	const [users, setUsers] = useState([]);
	const [editableUserData, setEditableUserData] = useState({
		isEdit: false,
		userIndex: null
	});

	// dark & light
	const handleToggle = () => {
		setIsClicked(!isClicked);
	  };
//  table function

   const handleRemoveClick = (index) =>{
       setUsers(users.filter((user, userIndex) => userIndex !== index));
   }
	
	const isFilledFields = userData.userName && userData.userSurname && userData.userAge &&  userData.userSalary

	const handleSubmitUser = (e) => {
       e.preventDefault();

	if(isFilledFields) {
		if (editableUserData.isEdit) {
			const editedData = users;
			editedData.splice(editableUserData.userIndex, 1, userData);
			
			setUsers(editedData);

			setEditableUserData({
				isEdit: false,
				userIndex: null
			})
		} else {
	        setUsers((prevState) => [...prevState, userData]);
		}
		
		setUserData(initialValues)
	}  
}
	
 const handleCleanClick = () => setUserData(initialValues);

  const handleEditClick = (data, index) => {
	setUserData(data);
	setEditableUserData({
		isEdit: true,
		userIndex: index
	})
  }
	console.log('userData ', userData);



	return (

<div className="body">
<div>
	   {
		  isClicked  ? <img className="nkar" src={njdeh} />  : <img className="nkar" src={kapan} />
		} 	
       
	   <button className="bg" onClick={handleToggle}>
		{
		  isClicked ? "Dark" : "Light" 
		}
		</button>
	 </div>
    
  <div className="wrapper">
  
	<div className="wrapper-content">
	
	   <div className="form-data">
	   	  		     
	 
	       <div className="cont-image">
             <img src={prof} alt="prof" className="prof"/>
			 </div>
			 

	
                <form className="forma" onSubmit={handleSubmitUser} onReset={handleCleanClick}>
					<input className="input_name" placeholder=" Write your name" 
					onChange={(e) => setUserData((prevState) =>({
						...prevState,
						userName: e.target.value
					}))}
					value={userData.userName} 
					/>

					<input className="input_name" placeholder="Write surname" 
					onChange={(e) => setUserData((prevState) =>({
						...prevState,
						userSurname: e.target.value
					}))} 
					value={userData.userSurname} 
					/>

					<input className="input_name" placeholder="Write your age" 
					onChange={(e) => setUserData((prevState) =>({
						...prevState,
						userAge: e.target.value
					}))} 
					value={userData.userAge} 
					/>

					<input className="input_name"  placeholder="Write salary"
					 onChange={(e) => setUserData((prevState) =>({
						...prevState,
						userSalary: e.target.value
					}))}
					value={userData.userSalary} 
					/>
				
					<div classNmae="buttons-wrapper">
						<button className="button_input" type="reset" >Clean</button>
						<button className="button_input" disabled={!isFilledFields}  type="submit" >{editableUserData.isEdit ? `Edit` : `Add` }</button>
					</div>
			  
			    </form>
				<Link to="/"><button className="home-btn">&#8592; Home</button></Link>
		     </div>

		<div className="table-data">
			<table className="table">
				{/* <th> <span></span>HOME</th> */}
				<th className="tha">#</th>
				<th className="thb"> User Name </th>
				<th className="thb"> User Surname </th>
				<th className="tha"> Age </th>
				<th className="thb"> User Salary </th>
				<th className="thb">Actions</th>

				<tbody>
                  {users.map((user, index) => (
					<tr>
					<td className="tdt">{index + 1}</td>
					<td className="td">{user.userName}</td>
					<td className="td">{user.userSurname}</td>
					<td className="tda">{user.userAge}</td>
					<td className="td">{user.userSalary}</td>
					<td className="td">
						<div className='td-btn' >
							<button className="edit-action button" onClick ={() => handleEditClick(user, index)}>Edit</button>
							<button  className="remove-action button" onClick={() => handleRemoveClick(index)}>Delete</button>
						</div>
					</td>
				</tr>
				  ))}
					
					
				</tbody>

			</table>
			{/*  */}
		</div>
		    
	</div>

  </div>
</div>  
  )
}
export default Hasmiktable;

