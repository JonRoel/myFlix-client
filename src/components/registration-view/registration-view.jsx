import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import logo from 'url:../../../public/myflix-logo.png';
import './registration-view.scss';


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    axios.post('https://myflix-jonathon.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error registering the user')
    });
  }


  return (
    <div className="register-wrapper">
      <img className="myFlix-logo" width={400} src={logo} alt="logo" />
      <Form className="register-form">
        <Form.Group>
          <Form.Label>
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Create Password:
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Birthday:
          </Form.Label>
          <Form.Control
              type="date"
              value={birthday}
              placeholder="YYYY-MM-DD"
              onChange={(e) => setBirthday(e.target.value)}
            />
        </Form.Group>
        <Row>
          <Col className="reg-btns mt-1">
            <Button variant="link" href="/" >Back to login</Button>
          </Col>
          <Col className="reg-btns mt-1">
            <Button size="md" variant="primary" type="submit" ml="4" onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}


//   return (
//     <div className="register-wrapper">
//       <img className="myFlix-logo" width={400} src={logo} alt="logo" />
//       <Form className="register-form">
//         <Form.Group>
//           <Form.Label>
//             Username:
//           </Form.Label>
//           <Form.Control
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>
//             Create Password:
//           </Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>
//             Email:
//           </Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>
//             Birthday:
//           </Form.Label>
//           <Form.Control
//               type="date"
//               value={birthday}
//               placeholder="YYYY-MM-DD"
//               onChange={(e) => setBirthday(e.target.value)}
//             />
//         </Form.Group>
//         <Row>
//           <Col className="reg-btns mt-1">
//             <Button variant="link" href="/" >Back to login</Button>
//           </Col>
//           <Col className="reg-btns mt-1">
//             <Button size="md" variant="primary" type="submit" ml="4" onClick={handleSubmit}>Submit</Button>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// }