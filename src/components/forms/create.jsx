import "./create.css"
import { useState } from 'react'
import { useAuth } from '../../AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router';
import AlertMsg from '../alert/alert-msg';

const Create = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const [inputs, setInputs] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  const [alert, setAlert] = useState([null, null, false]);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (e) => {
    setDisableBtn(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const listing = Object.fromEntries(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post("api/listings/create", listing, config).then((res) => {
      console.log(res.data);
      const { msg, type } = res.data;
      setAlert([msg, type, true]);
      setTimeout(() => {
        navigate("/");
      }, 3200);

    }).catch((err) => {
      console.log(err.response.data);
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
      setDisableBtn(false);
    })
  }
  if (!isAuthenticated) {
    return (
      <div className='create'>
        <div>
          Not Authorized!
        </div>
      </div>
    )
  }
  return (
    <div className='create'>
      {alert && <AlertMsg alert={alert} setAlert={setAlert} />}
      <div>
        <div className='create-form-container'>
          <form onSubmit={handleSubmit} className='auth-form'>
            <input
              type="text"
              name="title"
              value={inputs.title || ""}
              placeholder='Title'
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              placeholder='description'
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              value={inputs.price || ""}
              placeholder='price'
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              value={inputs.image || ""}
              placeholder='Title'
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              value={inputs.location || ""}
              placeholder='location'
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              value={inputs.country || ""}
              placeholder='country'
              onChange={handleChange}
              required
            />
            <button type="submit" className='btn' disabled={disableBtn}>Create!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create;