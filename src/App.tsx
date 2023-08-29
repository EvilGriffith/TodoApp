import "./app.css"
import {MouseEventHandler, useState} from "react"


function TodoApp() {
  const [task, settask] = useState<taskobject[]>([])
  const [inputValue,setInputValue] = useState<any>("")
  const [butbool,setbutbool] = useState<boolean>(false) 
  const [editbutpress,seteditbutpress] = useState<boolean>(true)
  const [editinputvalue,seteditinputvalue] = useState<any>("")
  const [appname,setappname] = useState<String>("To Do App")
  type taskobject = {
    isComplited: boolean,
    title: any,
    dateAdd: string,
    isDelete:boolean
  }
  function addtask(){
   if(task.length !== 7){
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    let copyhours = String(hours)
    let copyminutes = String(minutes)
     if(copyminutes.length == 1){
       copyminutes = "0" + minutes
     }
    if(copyhours.length == 1){
      copyhours = "0" + hours
    }
    if(inputValue != ""){
    let obj = Object.assign([], task)
    obj.push({
      isComplited: false,
      title: inputValue,
      dateAdd: copyhours + ":" + copyminutes,
      isDelete: false
      })
    settask(obj)
    setInputValue("")
    }
    }
  else{
    setappname("Cant be more tasks")
    setTimeout(() => {setappname("To Do App")}, 3000)
  }
  }
  const changevalue = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }
  const labelclick = (el:taskobject) => {
    el.isComplited = true
    setbutbool(!butbool)
  }
  const cleartask:MouseEventHandler = () => {
    const flitredtask = task.filter((value) => {return !value.isComplited})
    let obj = Object.assign([])
    obj.push(...flitredtask)
    settask(obj)
    
  }
  const changeeditvalue = (event:React.FormEvent<HTMLInputElement>) =>{
    seteditinputvalue(event.currentTarget.value)
  }
  const succeseditvalue = (value:taskobject) => {
    value.title = editinputvalue
    seteditbutpress(!editbutpress)
    seteditinputvalue("")
  }
  const seteditbutbool =() =>{
    seteditbutpress(!editbutpress)
  }
  const deletetask:any = (value:taskobject) => {
    value.isDelete = true
    setbutbool(!butbool)
    const filtredtask = task.filter((value) => {return !value.isDelete})
    if(filtredtask.length == 0){
      settask([])
    }
    else{
      let obj = Object.assign([])
      obj.push(...filtredtask)
      settask(obj)
    }
  }
  return (
    <div className="doc">
    <div className="container">
      <h1 className="nameapp">{appname}</h1>
      <label className="labelinput">
        <input className="inputapp"  
               placeholder="Add Task" 
               value={inputValue}
               onChange={changevalue} onKeyDown={(event) => {if(event.key == "Enter") addtask()}}></input>
      <div className="buttonaddtask" onClick={addtask}></div>
      </label>
      <button className="cleartask" onClick={cleartask}>Clear all complited tasks</button>
      <div className="listapp">
        {
          task.map((value: taskobject,index:number) => {
          return(
            <div className="task" key={index} style={{width:"90%",height:"50px",transition:"0.3s ease-in"}}>
              <label className="radio-button" onClick={() => {labelclick(value)}}>
              <div className="radio-circle" style={value.isComplited ? {backgroundColor:"black",transition:"0.3s ease-in-out"} : {backgroundColor:"#434343"}}/>
                <input type="radio" className="radioinput" />
              </label><div className="index">{index + 1}
                </div>{editbutpress ? <div className="title" style={value.isComplited ? {textDecoration: "line-through", color:"#aaa", userSelect: "none"} : {textDecoration: "none"}}>{value.title}</div> : <input className="editinput" autoFocus key={index} placeholder="Write here to change" onChange={changeeditvalue}  onKeyDown={(event) => {if(event.key == "Enter") succeseditvalue(value)}}/>}
              <div className="editbut" onClick={seteditbutbool}/>
              <div className="recyclebin" onClick={()=>{deletetask(value)}}/>
              <div className="time">{value.dateAdd}</div>
            </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default TodoApp

