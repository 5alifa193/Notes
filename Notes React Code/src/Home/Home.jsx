import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {

  const [sendNotes, setSendNotes] = useState({
    title: "",
    desc: "",
    userID: "",
    token: "",
  });

  const [loading , setLoading] = useState(true);
  const [notes, setNotes] = useState([]);


  let baseURL = "https://route-egypt-api.herokuapp.com/";
  let userToken = localStorage.getItem("user");
  let userID = localStorage.getItem("id");

  async function getNotes() {
    let { data } = await axios.get(baseURL + "getUserNotes", {
      headers: {
        Token: userToken,
        userID: userID,
      },
    });
    if(data.Notes!==undefined){
        setNotes(data.Notes);
    }
    if(data.message==='success'){
      setLoading(false);
    }else if(data.message==='no notes found'){
      setLoading(false);
      setNotes([]);
    }
  }

async function updateNotes(eve){
  // let responce = await axios.put('https://route-egypt-api.herokuapp.com/updateNote',{
  //   title:'ahmed',
  //   desc:'khalifa',
  //   token:userToken,
  //   NoteID:eve.target.id
  // })
// getNotes();
}

 async function deleteNote(eve){
  let responce = await axios.delete(baseURL+'deleteNote',{
    data:{
    NoteID:eve.target.id,
    token:userToken
  }
})
  getNotes();
}
  function exitNote() {
    let note = document.getElementById("note");
    note.classList.add("d-none");
  }

  async function addNotes() {
    let addUserNotes = await axios.post(baseURL + "addNote", sendNotes);
    exitNote();
    getNotes();
  }

  function addNote(eve) {
    let newNotes = { ...sendNotes };
    newNotes[eve.target.id] = eve.target.value;
    newNotes.userID = localStorage.getItem("id");
    newNotes.token = localStorage.getItem("user");
    setSendNotes(newNotes);
    getNotes();
  }

  useEffect(() => {
    getNotes();
  },[]);

  function openNote() {
    let note = document.getElementById("note");
    note.classList.remove("d-none");
  }

  return (
    <>
      <div className="">

        <div className="d-flex justify-content-end">
          <button
            onClick={() => {
              openNote();
            }}
            className="btn btn-info text-white mt-5 me-5"
          >
            Add Note
          </button>
        </div>
        {loading? <div className="d-flex justify-content-center"><i className="fa-solid fa-spinner fs-1 text-info fa-spin"></i><h3 className="text-info ms-2">Loading...</h3></div>:''}
        <div className="container row gy-3 mt-3">
           {notes.map((note,i) => {
                 return (
              <div key={i} className="col-md-3 position-relative">
                <div className="row flex-column position-absolute icon-position">
                {/* <i className="fa-solid fa-pen-to-square text-success cursor" title={note.title} desc={note.desc} id={note._id} onClick={(eve)=>{updateNotes(eve)}}></i> */}
                <i className="fa-solid fa-trash-can mt-3 text-danger cursor" id={note._id} onClick={(eve)=>{deleteNote(eve)}}></i>
                </div>
                <div className="note-bg p-3 text-center">
                  <h3>{note.title}</h3>
                  <div>
                    <p>{note.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="m-auto w-50 mt-5 p-5">
          {notes.length===0?<div className='no-notes p-1 text-center'>
            <p className='pt-3'>no notes found</p>
        </div>:''}
          <div id="note" className="d-none">
            <div className="add-note position-absolute top-0 start-0 vh-100 vw-100">
              <div className="text-white bg-white position-absolute rounded-3 note-position col-md-4">
                <div className="p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="text-dark">Add Note</h5>
                    <button
                      onClick={() => {
                        exitNote();
                      }}
                      className="border-0 bg-white"
                    >
                      <i className="fa-solid fa-xmark text-dark"></i>
                    </button>
                  </div>
                  <hr className="text-dark" />
                  <div className="row gy-3">
                    <input
                      onChange={(eve) => {
                        addNote(eve);
                      }}
                      id="title"
                      className="form-control"
                      type="text"
                      placeholder="Title"
                    />
                    <textarea
                      onChange={(eve) => {
                        addNote(eve);
                      }}
                      id="desc"
                      className="form-control"
                      name=""
                      cols="30"
                      rows="10"
                      placeholder="Type Your Note"
                    ></textarea>
                  </div>
                  <hr className="text-dark" />
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        addNotes();
                      }}
                      className="btn btn-success text-white border-0 p-2 rounded-2 me-2"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        exitNote();
                      }}
                      className="btn btn-danger text-white border-0 p-2 rounded-2"
                    >
                      Cansel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}