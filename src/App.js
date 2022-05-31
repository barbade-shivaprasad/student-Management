import logo from "./logo.svg";
import { socket } from "./socket";
import {
  Button,
  Checkbox,
  Form,
  Card,
  Icon,
  Image,
  Grid,
} from "semantic-ui-react";
import "./App.css";
import { actionCreators } from "./state";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { useEffect } from "react";

function App() {
  let dispatch = useDispatch();
  const name = useSelector((state) => state.nameReducer);
  const email = useSelector((state) => state.emailReducer);
  const phone = useSelector((state) => state.phoneReducer);
  const classname = useSelector((state) => state.classReducer);
  const id = useSelector((state) => state.idReducer);
  const data = useSelector((state) => state.dataReducer);
  const { setName, setEmail, setClass, setId, setPhone, setData } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getStudentsData();
  }, []);

  const addStudent = async (e) => {
    try {
      e.preventDefault();
      let file = document.getElementById("dp");
      const uploadData = new FormData();
      uploadData.append("name", name);
      uploadData.append("id", id);
      uploadData.append("email", email);
      uploadData.append("phone", phone);
      uploadData.append("class", classname);

      // if (file.files.length == 0) throw new Error("please select a file");
      uploadData.append("file", file.files[0]);

      let res = await axios.post(
        "https://student-management-system123.herokuapp.com/addstudent",
        uploadData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      if (res.status != 200) throw new Error(res.data);
      else {

        socket.emit('update');
        alert("success");
      }
    } catch (error) {
      console.log(error);
      alert("failure");
    }
  };

  const getStudentsData = async () => {
    try {
      let res = await axios.get("https://student-management-system123.herokuapp.com/getdata");

      if (res.status === 200) setData(res.data);
      else throw new Error(res.data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };


  const editStudent=(ele)=>{
      document.getElementById('name').focus();
      document.getElementById('name').value = ele.name;
      document.getElementById('class').value = ele.class;
      document.getElementById('id').value = ele.id;
      document.getElementById('phn').value = ele.phone;
      document.getElementById('email').value = ele.email;

      setClass(ele.class)
      setName(ele.name);
      setEmail(ele.email);
      setPhone(ele.phone);
      setId(ele.id)
  }



  const deleteStudent=async(ele)=>{
      try {
        console.log("Entered")
        console.log(ele)
        let res =  await axios.post('https://student-management-system123.herokuapp.com/remove',{id:ele.id})
        console.log(res.data)
        if (res.status === 200){

          socket.emit('update');
          alert("success")
        } 
          else throw new Error(res.data);
          
      } catch (error) {
        alert("Error")
      }
  }

  socket.off('updateResponse').on('updateResponse',getStudentsData)

  return (
    <div className="App">
        <nav class="navbar navbar-light bg-light">
          <div style={{marginLeft:"20px",fontSize:"20px"}}>
          Student Management
            
          </div>
        </nav>
      <div className="container">

        <div style={{ height: "65px" }}></div>

        <div className="addStudent">
          <h2>Register/Edit student</h2>
          <Form onSubmit={(e) => addStudent(e)}>
            <div style={{ display: "flex" }}>
              <Form.Field className="m-2">
                <label>Name</label>
                <input
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                />
              </Form.Field>
              <Form.Field className="m-2">
                <label>Id</label>
                <input
                  placeholder="Id"
                  onChange={(e) => setId(e.target.value)}
                  id="id"
                />
              </Form.Field>
            </div>
            <div style={{ display: "flex" }}>
              <Form.Field className="m-2">
                <label>Class</label>
                <input
                  placeholder="Class"
                  onChange={(e) => setClass(e.target.value)}
                  id="class"
                />
              </Form.Field>
              <Form.Field className="m-2">
                <label>Phone</label>
                <input
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  id="phn"
                />
              </Form.Field>
            </div>
            <div style={{ display: "flex" }}>
              <Form.Field className="m-2">
                <label>Email</label>
                <input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
              </Form.Field>
              <Form.Field className="m-2">
                <label>Profile pic</label>
                <input placeholder="Profile pic" type="file" id="dp" />
              </Form.Field>
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        </div>

        <div className="cards">
          <h2 style={{marginBottom:"60px"}}>Registered Students</h2>
          <Grid columns={window.innerWidth < 700 ?1:3}>
            {data
              ? data.map((ele) => {
                  return (
                    <Grid.Column key={ele.id}>
                      <Card>
                        <Image
                          src={`https://student-management-system123.herokuapp.com/getimg/${ele.id}`}
                          wrapped
                          ui={false}
                          
                        />
                        <Card.Content>
                          <Card.Header>{ele.name}</Card.Header>
                          <Card.Meta>
                            <span className="id">{ele.class}</span>
                          </Card.Meta>
                          <Card.Description>{ele.id}</Card.Description>
                          <Card.Description>{ele.phone}</Card.Description>
                          <Card.Description>{ele.email}</Card.Description>
                        </Card.Content>
                          <Card.Content extra>
                            <a className="m-2" onClick={e=>editStudent(ele)}>
                              <Icon name="edit" onClick={e=>editStudent(ele)}/>
                              Edit
                            </a>
                            <a className="m-2" onClick={e=>deleteStudent(ele)}>
                              <Icon name="delete" onClick={e=>deleteStudent(ele)}/>
                              Delete
                            </a>
                          </Card.Content>
                      </Card>
                    </Grid.Column>
                  );
                })
              : ""}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
