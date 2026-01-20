import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './ToDoList.Module.css'
import { Button, Input, Divider, Modal, message, Tag, Tooltip, Select, Empty} from 'antd'
import {getErrorMessage} from '../../util/GetError'
import {gettUserDetails} from '../../util/GetUser'
import ToDoServices from '../../services/toDoServices'
import { useNavigate } from 'react-router'
import { CheckCircleFilled,CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

function ToDoList() {
  const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [isAdding,setIsAdding]= useState(false);
  const [loading,setLoading]= useState(false);
  const [allToDo,setAllToDo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState("");
  const [isEditing, setIsEditing] =useState(false);
  const [updatedTitle, setUpdatedTitle] =useState("");
  const [updatedDescription, setUpdatedDescription] =useState("");
  const [updatedStatus, setUpdatedStatus] =useState("");
  const [currentTaskType, setCurrentTaskType] =useState("Incomplete");
  const [completedTodo, setCompletedTodo] =useState([]);
  const [incompletedTodo, setIncompletedTodo] =useState([]);
  const [currentTodoTask, setCurrentTodoTask] =useState([]);
  const [filteredToDo, setFilteredToDo] =useState([]);
  const navigate =useNavigate();

    const user = gettUserDetails();

    const getAllToDo = async () => {
      try {
        let user = gettUserDetails()
        console.log(user?.userid);
        const response = await ToDoServices.getAllToDo(user.userid);
        console.log(response.data);
        setAllToDo(response.data);
      } catch (err) {
        console.log(err);
        message.error(getErrorMessage(err));
      }
    };

  useEffect(() => {
    const user = gettUserDetails();

    const getAllToDo = async () => {
      try {
        console.log(user?.userid);
        const response = await ToDoServices.getAllToDo(user.userid);
        console.log(response.data);
        setAllToDo(response.data);
      } catch (err) {
        console.log(err);
        message.error(getErrorMessage(err));
      }
    };

    if (user && user.userid) {
      getAllToDo();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(()=>{
    const incomplete =allToDo.filter((item)=>item.isCompleted===false);
    const complete =allToDo.filter((item)=>item.isCompleted===true);
    setIncompletedTodo(incomplete);
    setCompletedTodo(complete);
    if(currentTaskType==='Incomplete'){
      setCurrentTodoTask(incomplete);
    } else{
      setCurrentTodoTask(complete);
    }
  },[allToDo,currentTaskType])


  const handleSubmitTask = async ()=>{
    setLoading(true);
    try{
      const userId = gettUserDetails()?.userid;
      const data ={
        title,
        description,
        isCompleted:false,
        createdBy:userId
      }
      const response = await ToDoServices.createToDo(data);
      console.log(response.data);
      setLoading(false);
      message.success("To Do Task Added Successfully!");
      getAllToDo();
      setIsAdding(false);
      getAllToDo();
    }catch(err){
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err))
    }
  }

  const getFormattedDate = (value)=>{
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  }
  const handleEdit = (item)=>{
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title)
    setUpdatedDescription(item?.description)
    setUpdatedStatus(item?.isCompleted)
    setIsEditing(true);
  }
  const handleDelete =async (item)=>{
    try{
      const response = await ToDoServices.deleteToDo(item._id);
      console.log(response.data);
      message.success(`${item.title} is deleted succesfully`);
      getAllToDo();

    } catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
    }
    
  }
  const handleUpdateStatus = async (id, status)=>{
    console.log(id);
    try{
      const response = await  ToDoServices.updateToDo(id,{isCompleted:status});
      message.success("task status updated successfully");
      getAllToDo();
    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
    }
  }
  const handleUpdateTask = async ()=>{
    try{
      setLoading(true);
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted:updatedStatus,
      };
      console.log(data);
      const response = await ToDoServices.updateToDo(currentEditItem?._id,data);
      console.log(response.data);
      message.success(`${currentEditItem?.title} updated Successfully`);
      setLoading(false);
      setIsEditing(false);
      getAllToDo();



    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
      setCurrentTaskType

    }
  }
  const handleTypeChange =(value)=>{
    console.log(value);
    setCurrentTaskType(value);
    if(value==='incomplete'){
      setCurrentTodoTask(incompletedTodo);
    }else{
      setCurrentTodoTask(completedTodo);
    }
      getAllToDo();

  }
  const handleSearch =(e)=>{
    let query =(e.target.value);
    let filteredList = allToDo.filter((item)=>item.title.toLowerCase().match(query.toLowerCase()));
    console.log(filteredList);
    if(filteredList.length > 0 && query){
      setFilteredToDo(filteredList);
    } else{
      setFilteredToDo([]);
    }
  }

  return (
    <>
      <Navbar active={"myTask"}/>
      <div className='page'>
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Your Tasks</h2>
          <Input onChange={handleSearch} style={{width:'50%'}} type="text" placeholder='search your task Here....' />
          <div>
            <Button onClick={()=>setIsAdding(true)} type='primary' size='large'>Add Task</Button>
            <Select
             value={currentTaskType}
             style={{width:180,marginLeft:'10px'}}
             size ="large"
             onChange={handleTypeChange}
             options={[
              {value: "Incomplete", label:'Incomplete'},
              {value:"Complete", label:'Complete'}
            ]}/>
          </div>
        </div>
        <Divider></Divider>
        <div className={styles.toDoListCardWrapper}>
          {filteredToDo.length > 0 ? filteredToDo.map((item)=>{
            return(
            <div key={item?._id} className={styles.toDoCard}>
          <div>
            <div className={styles.toDoCardHeader}>
              <h3>{item?.title}</h3>
              {item?.isCompleted ? <Tag color="cyan">Completed</Tag>:<Tag color="red">Incomplete</Tag>}
            </div>
            <p>{item?.description}</p>
          </div>

          <div className={styles.toDoCardFooter}>
            <Tag color='blue'>{getFormattedDate(item?.createdAt)}</Tag>
            <div className={styles.toDoFooterAction}>
              <Tooltip title='Edit Taask?'><EditOutlined onClick={()=>handleEdit(item)} className={styles.actionIcon} /></Tooltip>
              <Tooltip title='Delete Task?'><DeleteOutlined onClick={()=>handleDelete(item)} style={{color:'red'}} className={styles.actionIcon} /></Tooltip>
              {item?.isCompleted ? (
                <Tooltip title="Mark as Incomplete">
                  <CheckCircleFilled
                    onClick={() => handleUpdateStatus(item._id,false)}
                    className={styles.actionIcon}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Mark as Complete">
                  <CheckCircleOutlined
                    onClick={() => handleUpdateStatus(item._id,true)}
                    className={styles.actionIcon}
                  />
                </Tooltip>
              )}

            </div>
          </div>

        </div>
            )
          }) : currentTodoTask.length > 0  ? currentTodoTask.map((item)=>{
            return(
            <div key={item?._id} className={styles.toDoCard}>
          <div>
            <div className={styles.toDoCardHeader}>
              <h3>{item?.title}</h3>
              {item?.isCompleted ? <Tag color="cyan">Completed</Tag>:<Tag color="red">Incomplete</Tag>}
            </div>
            <p>{item?.description}</p>
          </div>

          <div className={styles.toDoCardFooter}>
            <Tag color='blue'>{getFormattedDate(item?.createdAt)}</Tag>
            <div className={styles.toDoFooterAction}>
              <Tooltip title='Edit Taask?'><EditOutlined onClick={()=>handleEdit(item)} className={styles.actionIcon} /></Tooltip>
              <Tooltip title='Delete Task?'><DeleteOutlined onClick={()=>handleDelete(item)} style={{color:'red'}} className={styles.actionIcon} /></Tooltip>
              {item?.isCompleted ? (
                <Tooltip title="Mark as Incomplete">
                  <CheckCircleFilled
                    onClick={() => handleUpdateStatus(item._id,false)}
                    className={styles.actionIcon}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Mark as Complete">
                  <CheckCircleOutlined
                    onClick={() => handleUpdateStatus(item._id,true)}
                    className={styles.actionIcon}
                  />
                </Tooltip>
              )}

            </div>
          </div>

        </div>
            )
          }) : 
          <div className={styles.noTaskWrapper}>
            <Empty />
          </div>
          
          }
        </div>

        <Modal confirmLoading={loading} title="Add New To Do TAsk" open={isAdding} onOk={handleSubmitTask} onCancel={()=>setIsAdding(false)}>
          <Input type="text" style={{marginBottom:'1rem'}} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
          <Input.TextArea placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>


        </Modal>
        
        <Modal confirmLoading={loading} title={`Update ${currentEditItem.title}`} open={isEditing} onOk={handleUpdateTask} onCancel={()=>setIsEditing(false)}>
          <Input type="text" style={{marginBottom:'1rem'}} placeholder='Updated Title' value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)} />
          <Input.TextArea style = {{marginBottom: '1rem'}} placeholder='Updated Description' value={updatedDescription} onChange={(e)=>setUpdatedDescription(e.target.value)}/>
          <Select 
          onChange={(value)=>setUpdatedStatus(value)}
          value = {updatedStatus}
          options={[
            {
              value:false,
              label:'Not Completed',
            },
            {
              value:true,
              label:'completed',
            },  
          ]}>

          

          </Select>


        </Modal>
        
      </section>
      </div>
    </>
    )
}

export default ToDoList