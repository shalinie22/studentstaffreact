import React, { useEffect } from "react";
const Webpage = () => {
  const [staff, setstaff] = React.useState([]);
  const [student, setstudent] = React.useState([]);
  const [data, setdata] = React.useState("");
  const [name, setname] = React.useState("");
  const [id, setid] = React.useState("");
  const [staffid, setstaffid] = React.useState("");
  const [email, setemail] = React.useState("");
  const fetchdata = () => {
    //function componentDidMount() {
    fetch("http://localhost:5000/student")
      .then((response) => response.json())
      .then((data) => setstudent(data));
    //console.log("student", student);
    //.then((data) => console.log("student", data));
    fetch("http://localhost:5000/staff")
      .then((response) => response.json())
      .then((data) => setstaff(data));
    //console.log("staff", staff);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  function add() {
    fetch("http://localhost:5000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id, staffid, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setname("");
        setstaffid("");
        setid("");
        setemail("");
        fetchdata();
      });
  }

  console.log("student", student);
  console.log("data outside", data);
  console.log("array", data);
  console.log(data[0]);
  function update(index) {
    // setdata(student.filter((d, i) => index == i)[0]);
    setname(student.filter((d, i) => index == i)[0].name);
    setstaffid(student.filter((d, i) => index == i)[0].staffid);
    setemail(student.filter((d, i) => index == i)[0].email);
    setid(student.filter((d, i) => index == i)[0].id);
  }
  function updatedata() {
    fetch("http://localhost:5000/studentupdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id, staffid, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchdata();
        setname("");
        setstaffid("");
        setid("");
        setemail("");
        fetchdata();
      });
  }
  function deletedata(index) {
    // setdata(student.filter((d, i) => index == i));
    // console.log("data", data);
    // console.log("array", data[0]);
    console.log("new", student.filter((d, i) => index == i)[0]);
    fetch("http://localhost:5000/studentdelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student.filter((d, i) => index == i)[0]),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchdata();
      });
  }
  return (
    <div>
      <h1>Staff Students Details</h1>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      ></input>
      <br />
      <label>Id</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setid(e.target.value)}
      ></input>
      <br />
      <label>Staff-Id</label>
      <input
        type="text"
        value={staffid}
        onChange={(e) => setstaffid(e.target.value)}
      ></input>
      <br />
      <label>E-mail</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      ></input>
      <br />
      <br />

      <button onClick={() => add()}>Addme</button>
      <button onClick={() => updatedata()}>Update</button>
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>StudentCount</th>
            <th>E-mail</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.id}</td>
              <td>{a.studentCount}</td>
              <td>{a.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Staff-Id</th>
            <th>E-mail</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {student.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.id}</td>
              <td>{a.staffid}</td>
              <td>{a.email}</td>
              <td>
                <button onClick={() => update(index)}>Edit</button>
                <button onClick={() => deletedata(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Webpage;

